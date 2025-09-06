import { GeminiResponse } from "../../entities/GeminiResponse";
import { GeminiRepository } from "../../repositories/GeminiRepository";

export class GetResponseGeminiUseCase {
  constructor(private repo: GeminiRepository) {}

  async execute(prompt: string): Promise<GeminiResponse> {
    if (!prompt || prompt.trim() === '') {
      throw new Error('Prompt tidak boleh kosong');
    }
    return await this.repo.generate(prompt);
  }
}
