import { createClient } from '@supabase/supabase-js';
import { normalizeSupabaseUrl } from './config';

export function createAdminClient() {
  const supabaseUrl = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key';

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Lazy admin client instance
export const supabaseAdmin = (() => {
  try {
    return createAdminClient();
  } catch {
    return null;
  }
})();
