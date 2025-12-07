import { createClient } from '@supabase/supabase-js';

// Project URL
const supabaseUrl = 'https://ixnvwqblsknqoykjmtyx.supabase.co';

// Publishable Key (Anon Key)
const supabaseKey = 'sb_publishable_EiV2P3PEtDZIcharVJn-Yw_8zVbkqFq';

export const supabase = createClient(supabaseUrl, supabaseKey);