import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bjslekimsaywastgitxr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqc2xla2ltc2F5d2FzdGdpdHhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTEyNjEsImV4cCI6MjA2ODI2NzI2MX0.rhvevDwvh2vXqrWelxXOossYOWeNHQQxpXFnxyU1lQ0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
