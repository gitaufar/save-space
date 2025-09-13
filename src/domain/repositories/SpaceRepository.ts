// repositories/SpaceRepository.ts
import { Space } from "../entities/Space";
import { User } from "../entities/User";

export interface SpaceRepository {
  createSpace(data: {
    name: string;
    division?: string;
    job_desc?: string;
    work_hours?: string;
    work_culture?: string;
  }): Promise<Space>;

  getSpaces(): Promise<Space[]>;

  getSpaceById(id: string): Promise<Space | null>;

  updateSpace(id: string, updates: Partial<Space>): Promise<Space>;

  deleteSpace(id: string): Promise<boolean>;

  joinSpaceByInvitationCode(userId: string, code: string): Promise<User>;
}
