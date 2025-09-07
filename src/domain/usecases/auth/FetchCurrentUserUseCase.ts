import { User } from "../../entities/User";
import { AuthRepository } from "../../repositories/AuthRepository";


export class FetchCurrentUserUseCase {
  constructor(private repo: AuthRepository) {}

  async execute(): Promise<User | null> {
    return await this.repo.getCurrentUser();
  }
}
