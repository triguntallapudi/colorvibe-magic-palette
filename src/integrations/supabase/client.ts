// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dlqvuzusjmctqcbeqtxc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRscXZ1enVzam1jdHFjYmVxdHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMTUxNDMsImV4cCI6MjA1NTc5MTE0M30.MFkjBuBO8hGTMpmkom0QZjW7MMQKfGIFpXZU9uSry3c";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);