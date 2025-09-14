import { AuthRepository } from "../../repositories/AuthRepository";

export class ChangePasswordUseCase {
  constructor(private repo: AuthRepository) {}

  async execute(newPassword: string): Promise<void> {
    if (!newPassword || newPassword.length < 6) {
      throw new Error("Password minimal 6 karakter");
    }
    return await this.repo.changePassword(newPassword);
  }
}

