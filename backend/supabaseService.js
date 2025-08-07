import { createClient } from '@supabase/supabase-js'
import "dotenv/config";

const serviceKey = process.env.SUPABASE_SERVICE
const url = process.env.SUPABASE_URL

const supabaseRemover = createClient(url, serviceKey);

export default supabaseRemover