import { AuthRepository } from "../../repositories/AuthRepository";

export class UpdateAvatarUseCase {
  constructor(private repo: AuthRepository) {}

  async execute(fileUri: string): Promise<string> {
    if (!fileUri) throw new Error("Avatar file is required");
    return await this.repo.updateAvatar(fileUri);
  }
}

