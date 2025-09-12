import { User } from "../../entities/User";
import { AuthRepository } from "../../repositories/AuthRepository";

export class RegisterUseCase {
  constructor(private repo: AuthRepository) {}

  async execute(email: string, password: string, name: string, role: 'Manager' | 'Karyawan', space_id?: string): Promise<User> {
    try {
      return await this.repo.signUp(email, password, name, role, space_id);
    } catch (err: any) {
      if (err.message.includes("User already registered") || err.message.includes("already exists")) {
        throw new Error("Email sudah terdaftar");
      }
      if (err.message.includes("Password")) {
        throw new Error("Password tidak valid");
      }
      throw err;
    }
  }
}
