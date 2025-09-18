import { supabase } from '../../core/utils/SupabaseClient';
import { SUPABASE_URL, SUPABASE_KEY } from '@env';

export class AuthDataSource {
  private sanitizeEmail(email: string) {
    let e = String(email ?? '');
    try {
      e = e.normalize('NFKC');
    } catch {}
    // remove zero-width, control chars, and any whitespace
    e = e
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/[\x00-\x1F\x7F]/g, '')
      .replace(/["']/g, '')
      .replace(/\s+/g, '')
      .trim()
      .toLowerCase();
    return e;
  }

  private isValidEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async signUp(
    email: string,
    password: string,
    name: string,
    role: 'Manager' | 'Karyawan',
    space_id?: string,
  ) {
    const cleanEmail = this.sanitizeEmail(email);

    try {
      if (!this.isValidEmail(cleanEmail)) {
        throw { message: `Invalid email format: ${cleanEmail}`, status: 400 } as any;
      }

      // 1. Create Supabase Auth user (v1)
      const { user, session, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
      });

      if (error) throw error;
      if (!user) throw new Error('User creation failed');

      // 2. Save profile in app_users (v1 insert)
      const userData = {
        id: user.id,
        email: user.email,
        name,
        role,
        space_id,
      };

      const { data: insertedRows, error: dbError } = await supabase
        .from('app_users')
        .insert([userData], { returning: 'representation' });

      if (dbError) throw new Error(`Database insert failed: ${dbError.message}`);

      const appUser = insertedRows?.[0] ?? null;
      return { authUser: user, appUser, session };  
    } catch (error) {
      console.error('[Auth] SignUp Failed:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    const cleanEmail = this.sanitizeEmail(email);
    const { user, session, error } = await supabase.auth.signIn({
      email: cleanEmail,
      password,
    });
    if (error) throw error;

    const { data: appUser, error: userError } = await supabase
      .from('app_users')
      .select('*')
      .eq('id', user?.id)
      .single();
    if (userError) throw userError;
    return { authUser: user, session, appUser };
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser() {
    const user = supabase.auth.user();
    if (!user) return null;
    const { data: appUser } = await supabase
      .from('app_users')
      .select('*')
      .eq('id', user.id)
      .single();
    return { authUser: user, appUser };
  }

  async updateAvatar(fileUri: string): Promise<string> {
    const authUser = supabase.auth.user();
    const session = supabase.auth.session();
    if (!authUser || !session) throw new Error('Not authenticated');
    if (!fileUri) throw new Error('No file provided');

    // Derive content type and extension
    let ext = 'jpg';
    let contentType = 'image/jpeg';
    if (fileUri.startsWith('data:')) {
      const semi = fileUri.indexOf(';');
      const mime = fileUri.substring(5, semi > 5 ? semi : fileUri.length);
      if (mime) contentType = mime;
      const slash = mime.indexOf('/');
      if (slash > -1) ext = mime.substring(slash + 1).toLowerCase();
    } else {
      const extMatch = /\.([a-zA-Z0-9]+)(?:\?.*)?$/.exec(fileUri || '');
      ext = (extMatch?.[1] || 'jpg').toLowerCase();
      contentType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
    }

    const filePath = `${authUser.id}/${Date.now()}.${ext}`;

    // Use direct REST upload with FormData (RN-friendly)
    const form: any = new FormData();
    if (fileUri.startsWith('data:')) {
      // RN FormData does not support data URIs; convert to a temporary blob-like object via fetch
      // Fallback: POST binary buffer using fetch with appropriate headers is not reliable on RN
      // Instead, prefer using original asset uri from image picker
      throw new Error('Data URI not supported for upload; please provide a file uri');
    } else {
      form.append('file', {
        uri: fileUri,
        name: `avatar.${ext}`,
        type: contentType,
      } as any);
    }

    const resp = await fetch(`${SUPABASE_URL}/storage/v1/object/profile_picture/${filePath}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          apikey: SUPABASE_KEY,
          'x-upsert': 'true',
        } as any,
        body: form,
      }
    );

    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      throw new Error(`Upload failed: ${resp.status} ${text}`);
    }

    const { publicURL } = supabase.storage.from('profile_picture').getPublicUrl(filePath);
    const avatarUrl = publicURL || '';

    const { error: updateError } = await supabase
      .from('app_users')
      .update({ avatar_url: avatarUrl })
      .eq('id', authUser.id);
    if (updateError) throw updateError;

    return avatarUrl;
  }

  async updateProfile(params: { name?: string; email?: string }) {
    const authUser = supabase.auth.user();
    if (!authUser) throw new Error('Not authenticated');

    // Update Supabase Auth email if changed
    if (params.email && params.email !== authUser.email) {
      const cleanEmail = this.sanitizeEmail(params.email);
      if (!this.isValidEmail(cleanEmail)) {
        throw new Error(`Invalid email format: ${cleanEmail}`);
      }
      const { error: authErr } = await (supabase.auth as any).update({ email: cleanEmail });
      if (authErr) throw authErr;
      // Note: when email confirmation is enabled, user must confirm before email is active
    }

    // Update app_users profile fields
    const patch: any = {};
    if (typeof params.name === 'string') patch.name = params.name;
    if (typeof params.email === 'string') patch.email = this.sanitizeEmail(params.email);

    if (Object.keys(patch).length > 0) {
      const { error: appErr } = await supabase
        .from('app_users')
        .update(patch)
        .eq('id', authUser.id);
      if (appErr) throw appErr;
    }

    // Return updated combined profile
    const { data: appUser, error: fetchErr } = await supabase
      .from('app_users')
      .select('*')
      .eq('id', authUser.id)
      .single();
    if (fetchErr) throw fetchErr;
    return { authUser: supabase.auth.user(), appUser };
  }

  async changePassword(newPassword: string) {
    const authUser = supabase.auth.user();
    if (!authUser) throw new Error('Not authenticated');
    const { error } = await (supabase.auth as any).update({ password: newPassword });
    if (error) throw error;
  }
}
