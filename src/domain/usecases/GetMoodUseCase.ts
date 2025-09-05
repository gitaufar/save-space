import { fetchMood } from "../../data/repositories/MoodRepository";
import { Mood } from "../entities/Mood";


export async function getMood(text: string): Promise<Mood> {
  const mood = await fetchMood(text);
  
  return mood;
}
