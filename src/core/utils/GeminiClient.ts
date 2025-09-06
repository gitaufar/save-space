import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY } from "@env";

const apiKey = API_KEY

if (!apiKey) {
  throw new Error("API_KEY tidak ditemukan. Pastikan sudah ada di .env");
}

export const genAI = new GoogleGenerativeAI(apiKey);
