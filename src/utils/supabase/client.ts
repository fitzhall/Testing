import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  },
  db: {
    schema: 'public'
  }
});

// Add error handling for database operations
supabase.handleError = (error: any) => {
  console.error('Supabase Error:', error);
  
  if (error?.code === 'PGRST301') {
    return new Error('Database connection failed');
  }
  
  if (error?.code === '23505') {
    return new Error('A request already exists for this email');
  }
  
  return new Error(error?.message || 'An unknown error occurred');
};