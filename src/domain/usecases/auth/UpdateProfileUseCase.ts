import { User } from "../../entities/User";
import { AuthRepository } from "../../repositories/AuthRepository";

export class UpdateProfileUseCase {
  constructor(private repo: AuthRepository) {}

  async execute(params: { name?: string; email?: string }): Promise<User> {
    const name = params.name?.trim();
    const email = params.email?.trim();
    if (!name && !email) throw new Error("Tidak ada perubahan");
    return await this.repo.updateProfile({ name, email });
  }
}

