// lib/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a single Supabase client instance
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
