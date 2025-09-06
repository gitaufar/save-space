import { GeminiResponse } from "../entities/GeminiResponse";

export interface GeminiRepository {
    generate(prompt: string): Promise<GeminiResponse>;
}