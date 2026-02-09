
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key');
  process.exit(1);
}

// Try with service role if available (to bypass RLS), otherwise anon
const supabase = createClient(supabaseUrl, serviceKey || supabaseKey);

async function listBuckets() {
  console.log('Listing buckets...');
  const { data, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error('Error listing buckets:', error);
  } else {
    console.log('Buckets:', data);
  }
}

listBuckets();
