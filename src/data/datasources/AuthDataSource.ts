import { supabase } from '../../core/utils/SupabaseClient';

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
    console.log('[Auth] SignUp start');
    console.log('[Auth] Raw email:', JSON.stringify(String(email ?? '')));
    console.log('[Auth] Clean email:', JSON.stringify(cleanEmail));

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
      console.error('💥 Signup failed:', error);
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
}
