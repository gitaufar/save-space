import { User } from "../../entities/User";
import { AuthRepository } from "../../repositories/AuthRepository";


export class LoginUseCase {
  constructor(private repo: AuthRepository) {}

  async execute(email: string, password: string): Promise<User> {
    return await this.repo.signIn(email, password);
  }
}
