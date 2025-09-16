import { CBIRepository, CBITest } from "../../repositories/CBIRepository";

// usecases/CreateCBITestForSpaceUseCase.ts
interface CreateCBITestForSpaceRequest {
  spaceId: string;
}

export class CreateCBITestForSpaceUseCase {
  constructor(private cbiRepository: CBIRepository) {}

  async execute(request: CreateCBITestForSpaceRequest): Promise<CBITest[]> {
    if (!request.spaceId) {
      throw new Error('Space ID is required');
    }

    return await this.cbiRepository.createCBITestForSpace(request.spaceId);
  }
}