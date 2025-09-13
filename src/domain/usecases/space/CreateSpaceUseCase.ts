import { Space } from "../../entities/Space";
import { SpaceRepository } from "../../repositories/SpaceRepository";

// usecases/CreateSpaceUseCase.ts
interface CreateSpaceRequest {
  name: string;
  division?: string;
  job_desc?: string;
  work_hours?: string;
  work_culture?: string;
}

export class CreateSpaceUseCase {
  constructor(private spaceRepository: SpaceRepository) {}

  async execute(data: CreateSpaceRequest): Promise<Space> {
    return await this.spaceRepository.createSpace(data);
  }
}
