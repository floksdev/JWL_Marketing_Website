import 'server-only';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL is not set. Add it to your environment configuration.');
}

if (!serviceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set. Add it to your environment configuration.');
}

let singleton;

/**
 * Returns a singleton Supabase client configured with the service role key.
 * This must only be used from server environments (API routes, Server Components).
 */
export function getSupabaseAdmin() {
  if (!singleton) {
    singleton = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
      },
    });
  }

  return singleton;
}
