import { supabase } from "../../core/utils/SupabaseClient";

export class AuthDataSource {
  async signUp(email: string, password: string) {
    // v1: signUp mengembalikan { user, session, error }
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return { user, session };
  }

  async signIn(email: string, password: string) {
    // v1: signIn mengembalikan { user, session, error }
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) throw error;
    return { user, session };
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser() {
    const user = supabase.auth.user(); // v1: langsung ambil user saat ini
    return user;
  }
}
