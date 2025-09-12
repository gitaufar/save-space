import { supabase } from '../../core/utils/SupabaseClient';

export class AuthDataSource {
  async signUp(
    email: string,
    password: string,
    name: string,
    role: 'Manager' | 'Karyawan',
    space_id?: string,
  ) {
    console.log('🚀 Starting signup process...');
    console.log('📧 Email:', email);
    console.log('👤 Name:', name);
    console.log('👔 Role:', role);
    console.log('🏢 Space ID:', space_id);

    try {
      // 1. Daftar ke Supabase Auth
      console.log('🔐 Creating auth user...');
      const { user, session, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log('🔐 Auth response:', {
        user: user?.id,
        session: !!session,
        error,
      });

      if (error) {
        console.error('❌ Auth error:', error);
        throw error;
      }
      if (!user) {
        console.error('❌ No user returned from auth');
        throw new Error('User creation failed');
      }

      console.log('✅ Auth user created:', user.id);

      // 2. Simpan data tambahan ke tabel users
      console.log('💾 Inserting to users table...');
      const userData = {
        id: user.id,
        email: user.email,
        name: name,
        role: role,
        space_id: space_id,
      };
      console.log('💾 User data to insert:', userData);

      const { data: appUser, error: dbError } = await supabase
        .from('app_users')
        .insert(userData)
        .select()
        .single();

      console.log('💾 Database response:', { appUser, dbError });

      if (dbError) {
        console.error('❌ Database error:', dbError);
        throw new Error(`Database insert failed: ${dbError.message}`);
      }

      console.log('✅ User data saved to database');
      console.log('🎉 Signup completed successfully');

      return { authUser: user, appUser, session };
    } catch (error) {
      console.error('💥 Signup failed:', error);
      throw error;
    }
  }
  async signIn(email: string, password: string) {
    // v1 syntax: signIn
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) throw error;

    // Query ke tabel users untuk ambil profil lengkap
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
    // v1 syntax: user() returns synchronously
    const user = supabase.auth.user();
    return user;
  }
}
