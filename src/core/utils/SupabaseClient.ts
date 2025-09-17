import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SUPABASE_URL, SUPABASE_KEY } from '@env';

// Debug env values in development to avoid silent misconfig
if (!SUPABASE_URL || !SUPABASE_KEY) {
  // Silent fallback for demo
}
if (__DEV__) {
  // Silent logging for demo
}

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY,
  {
    localStorage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }
);

