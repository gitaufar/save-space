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
  console.log(
    '[Supabase] Key prefix:',
    typeof SUPABASE_KEY === 'string' ? SUPABASE_KEY.slice(0, 8) + '…' : 'N/A'
  );
}

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY,
  {
    localStorage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }
);
