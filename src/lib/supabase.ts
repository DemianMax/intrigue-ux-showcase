
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Este aviso será visível no console do desenvolvedor.
  console.warn("As variáveis de ambiente do Supabase não foram encontradas. A aplicação funcionará sem a integração com o Supabase. Por favor, configure o Supabase no editor Lovable para carregar os projetos.");
}

export { supabase };
