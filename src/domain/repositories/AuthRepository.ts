import { User } from "../entities/User";



export interface AuthRepository {
  signUp(email: string, password: string, name: string, role: 'Manager' | 'Karyawan', space_id?: string): Promise<User>;
  signIn(email: string, password: string): Promise<User>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  updateAvatar(fileUri: string): Promise<string>; // returns avatar_url
}
