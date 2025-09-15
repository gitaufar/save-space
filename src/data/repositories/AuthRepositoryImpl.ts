import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { AuthDataSource } from "../datasources/AuthDataSource";


export class AuthRepositoryImpl implements AuthRepository {
  constructor(private dataSource: AuthDataSource) {}

  private normalizeRole(role: any): 'Manager' | 'Karyawan' | undefined {
    const r = String(role ?? '').trim().toLowerCase();
    if (r === 'manager' || r === 'manajer' || r === 'hrd' || r === 'admin') return 'Manager';
    if (r === 'karyawan' || r === 'employee' || r === 'staff' || r === 'pegawai') return 'Karyawan';
    return undefined;
  }

  async signUp(email: string, password: string, name: string, role: 'Manager' | 'Karyawan', space_id?: string): Promise<User> {
    const result = await this.dataSource.signUp(email, password, name, role, space_id);
    return {
      id: result.authUser?.id ?? "",
      email: result.authUser?.email ?? "",
      name: result.appUser?.name ?? undefined,
      role: this.normalizeRole(result.appUser?.role),
      space_id: result.appUser?.space_id ?? null,
      avatar_url: result.appUser?.avatar_url ?? null,
    };
  }

  async signIn(email: string, password: string): Promise<User> {
    const result = await this.dataSource.signIn(email, password);
    return {
      id: result.authUser?.id ?? "",
      email: result.authUser?.email ?? "",
      name: result.appUser?.name ?? undefined,
      role: this.normalizeRole(result.appUser?.role),
      space_id: result.appUser?.space_id ?? null,
      avatar_url: result.appUser?.avatar_url ?? null,
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
      role: this.normalizeRole(res.appUser?.role),
      space_id: res.appUser?.space_id ?? null,
      avatar_url: res.appUser?.avatar_url ?? null,
    };
  }

  async updateAvatar(fileUri: string): Promise<string> {
    return await this.dataSource.updateAvatar(fileUri);
  }

  async updateProfile(params: { name?: string; email?: string }): Promise<User> {
    const res = await (this.dataSource as any).updateProfile(params);
    const authUser = res?.authUser;
    const appUser = res?.appUser;
    return {
      id: authUser?.id ?? appUser?.id ?? '',
      email: authUser?.email ?? appUser?.email ?? '',
      name: appUser?.name ?? undefined,
      role: this.normalizeRole(appUser?.role),
      space_id: appUser?.space_id ?? null,
      avatar_url: appUser?.avatar_url ?? null,
    };
  }

  async changePassword(newPassword: string): Promise<void> {
    await (this.dataSource as any).changePassword(newPassword);
  }
}
