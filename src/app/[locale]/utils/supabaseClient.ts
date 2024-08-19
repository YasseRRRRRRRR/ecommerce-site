import { createClient } from "@supabase/supabase-js";

if (
  process.env.NEXT_PUBLIC_SUPABASE_URL === undefined ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === undefined
) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined"
  );
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
