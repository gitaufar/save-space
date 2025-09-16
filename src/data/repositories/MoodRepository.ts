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
  const cleaned = String(text ?? '').trim();
  if (!cleaned) throw new Error('Teks kosong');

  // Try common payload field names in case backend expects different keys
  const candidateBodies: Record<string, any>[] = [
    { text: cleaned },
    { prompt: cleaned },
    { message: cleaned },
    { content: cleaned },
    { input: cleaned },
    { input_text: cleaned },
  ];

  // Two attempts total to tolerate transient cold starts
  let lastError: any = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s per attempt
    try {
      for (const body of candidateBodies) {
        try {
          const resp = await fetch(BASE_URL_MOOD, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(body),
            signal: controller.signal as any,
          } as any);

          if (!resp.ok) {
            let detail = '';
            try { detail = await resp.text(); } catch {}
            try { const j = JSON.parse(detail || '{}'); detail = j?.message || j?.error || detail; } catch {}
            lastError = new Error(`AI service error (${resp.status}): ${detail || 'Failed'}`);
            if (resp.status >= 500) throw lastError; // server error -> break to retry
            continue; // possibly wrong key, try next body
          }

          const data: any = await resp.json();
          const predicted = data?.predicted_mood ?? data?.mood ?? data?.label ?? '';
          const confidence = String(data?.confidence ?? data?.score ?? data?.probability ?? '');
          const mood: Mood = {
            text: data?.text ?? cleaned,
            predictedMood: String(predicted || '').trim() || 'Netral',
            confidence,
          };
          clearTimeout(timeoutId);
          return mood;
        } catch (err: any) {
          lastError = err;
          if (err?.name === 'AbortError') {
            lastError = new Error('AI service timeout. Coba lagi.');
            break; // break body loop, go to next attempt
          }
          // else try next body key
        }
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }
  throw (lastError || new Error('Gagal memanggil AI service'));
}
