import { Space } from "../../entities/Space";
import { SpaceRepository } from "../../repositories/SpaceRepository";

export class RefreshInvitationCodeUseCase {
  constructor(private spaceRepository: SpaceRepository) {}

  async execute(oldSpaceId: string): Promise<Space> {
    // Refresh invitation code berarti membuat space baru dengan ID baru
    // dan memindahkan semua data dari space lama
    return await this.spaceRepository.refreshInvitationCode(oldSpaceId);
  }
}