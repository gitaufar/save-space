import { supabase } from '../../core/utils/SupabaseClient';

export class AuthDataSource {
  async signUp(
    email: string,
    password: string,
    name: string,
    role: 'HRD' | 'Karyawan',
    space_id?: string,
  ) {
    // 1. Daftar ke Supabase Auth
    const {
      user,
      session,
      error: authError,
    } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authError) throw authError;

    if (!user) throw new Error('User tidak berhasil dibuat di Supabase Auth');

    // 2. Insert juga ke tabel `users` custom
    const { data: userRow, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          id: user.id, // pakai id dari Supabase Auth
          name,
          email,
          role,
          space_id: space_id ?? null,
        },
      ])
      .select()
      .single();

    if (insertError) throw insertError;

    return { user, session, appUser: userRow };
  }

  async signIn(email: string, password: string) {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) throw error;

    // Query ke tabel users untuk ambil profil lengkap
    const { data: appUser, error: userError } = await supabase
      .from('users')
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
    // v1: langsung ambil user
    const user = supabase.auth.user();
    return user;
  }
}
