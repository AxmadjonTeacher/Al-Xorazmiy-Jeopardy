import { createClient } from '@supabase/supabase-js';

// Project URL
const supabaseUrl = 'https://ixnvwqblsknqoykjmtyx.supabase.co';

// Publishable Key (Anon Key) - Updated to the correct JWT format
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4bnZ3cWJsc2tucW95a2ptdHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5Mzk2OTksImV4cCI6MjA4MDUxNTY5OX0.3bavGwRdNgtw79bbX5GU4E_0nmwC48HbU6lCckqQeYg';

export const supabase = createClient(supabaseUrl, supabaseKey);