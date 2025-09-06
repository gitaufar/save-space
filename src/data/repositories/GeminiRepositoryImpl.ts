import { GeminiResponse } from '../../domain/entities/GeminiResponse';
import { GeminiRepository } from '../../domain/repositories/GeminiRepository';
import { GeminiRemoteDatasourceImpl } from '../datasources/GeminiRemoteDataSource';

export class GeminiRepositoryImpl implements GeminiRepository {
  constructor(private remoteDataSource: GeminiRemoteDatasourceImpl) {}
  async generate(prompt: string): Promise<GeminiResponse> {
    const result = await this.remoteDataSource.generate(prompt);

    return { text: result };
  }
}
