import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { AuthDataSource } from "../datasources/AuthDataSource";


export class AuthRepositoryImpl implements AuthRepository {
  constructor(private dataSource: AuthDataSource) {}

  async signUp(email: string, password: string, name: string, role: 'Manager' | 'Karyawan', space_id?: string): Promise<User> {
    const result = await this.dataSource.signUp(email, password, name, role, space_id);
    return { id: result.user?.id ?? "", email: result.user?.email ?? "" };
  }

  async signIn(email: string, password: string): Promise<User> {
    const result = await this.dataSource.signIn(email, password);
    return { id: result.authUser?.id ?? "", email: result.authUser?.email ?? "" };
  }

  async signOut(): Promise<void> {
    await this.dataSource.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    const user = await this.dataSource.getCurrentUser();
    if (!user) return null;
    return { id: user.id, email: user.email ?? "" };
  }
}
