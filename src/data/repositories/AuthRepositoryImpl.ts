import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { AuthDataSource } from "../datasources/AuthDataSource";


export class AuthRepositoryImpl implements AuthRepository {
  constructor(private dataSource: AuthDataSource) {}

  async signUp(email: string, password: string, name: string, role: 'Manager' | 'Karyawan', space_id?: string): Promise<User> {
    const result = await this.dataSource.signUp(email, password, name, role, space_id);
    return {
      id: result.authUser?.id ?? "",
      email: result.authUser?.email ?? "",
      name: result.appUser?.name ?? undefined,
      role: result.appUser?.role ?? undefined,
      space_id: result.appUser?.space_id ?? null,
    };
  }

  async signIn(email: string, password: string): Promise<User> {
    const result = await this.dataSource.signIn(email, password);
    return {
      id: result.authUser?.id ?? "",
      email: result.authUser?.email ?? "",
      name: result.appUser?.name ?? undefined,
      role: result.appUser?.role ?? undefined,
      space_id: result.appUser?.space_id ?? null,
    };
  }

  async signOut(): Promise<void> {
    await this.dataSource.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    const res = await this.dataSource.getCurrentUser();
    if (!res || !res.authUser) return null;
    return {
      id: res.authUser.id,
      email: res.authUser.email ?? "",
      name: res.appUser?.name ?? undefined,
      role: res.appUser?.role ?? undefined,
      space_id: res.appUser?.space_id ?? null,
    };
  }
}
