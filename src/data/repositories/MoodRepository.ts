// data/repositories/MoodRepository.ts

import { BASE_URL_MOOD } from "../../core/constants/const";
import { Mood } from "../../domain/entities/Mood";
import { MoodDto } from "../models/MoodDto";

export function mapDtoToEntity(dto: MoodDto): Mood {
  return {
    text: dto.text,
    predictedMood: dto.predicted_mood,
    confidence: dto.confidence,
  };
}


export async function fetchMood(text: string): Promise<Mood> {
  const response = await fetch(BASE_URL_MOOD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch mood');
  }

  const data: MoodDto = await response.json();
  return mapDtoToEntity(data);
}
