// usecases/JoinSpaceByCodeUseCase.ts
import { User } from '../../entities/User';
import { SpaceRepository } from '../../repositories/SpaceRepository';

export class JoinSpaceByCodeUseCase {
  constructor(private spaceRepository: SpaceRepository) {}

  async execute(userId: string, invitationCode: string): Promise<User> {
    return await this.spaceRepository.joinSpaceByInvitationCode(
      userId,
      invitationCode,
    );
  }
}
