import { createClient } from '@supabase/supabase-js';
import "dotenv/config";

const publicKey = process.env.SUPABASE_PUBLIC
const url = process.env.SUPABASE_URL

const supabase = createClient(url, publicKey);

export default supabase