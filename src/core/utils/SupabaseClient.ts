import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SUPABASE_URL, SUPABASE_KEY } from '@env';

// Debug env values in development to avoid silent misconfig
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Supabase env missing:', {
    hasUrl: !!SUPABASE_URL,
    hasKey: !!SUPABASE_KEY,
  });
}
if (__DEV__) {
  console.log('[Supabase] URL:', SUPABASE_URL);
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

