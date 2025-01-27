import { createClient } from "@supabase/supabase-js";

const superbaseUrl = import.meta.env.VITE_SUPERBASE_URL;
const superbaseKey = import.meta.env.VITE_SUPERBASE_KEY;

const supabase = createClient(superbaseUrl, superbaseKey);


export default supabase;