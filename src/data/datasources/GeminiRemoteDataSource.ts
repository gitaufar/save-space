// data/datasources/GeminiRemoteDatasource.ts
import { genAI } from "../../core/utils/GeminiClient";

export interface GeminiRemoteDatasource {
  generate(prompt: string): Promise<string>;
}

export class GeminiRemoteDatasourceImpl implements GeminiRemoteDatasource {
  async generate(prompt: string): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const response = await model.generateContent(
        prompt,
      );
      return response.response.text();
    } catch (err) {
      console.error("Gemini API error:", err);
      throw err;
    }
  }
}
