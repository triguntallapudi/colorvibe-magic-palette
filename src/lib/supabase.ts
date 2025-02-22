
import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables are missing. Some features may not work.');
}

export const supabase = createClient(
  'https://dlqvuzusjmctqcbeqtxc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRscXZ1enVzam1jdHFjYmVxdHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMTUxNDMsImV4cCI6MjA1NTc5MTE0M30.MFkjBuBO8hGTMpmkom0QZjW7MMQKfGIFpXZU9uSry3c'
);
