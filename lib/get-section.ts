import { supabase } from '@/lib/supabase';

export async function getSection(id: string): Promise<any> {
  const { data, error } = await supabase
    .from('site_sections')
    .select('data')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Section "${id}" error:`, error.message);
    return null;
  }
  return data?.data || null;
}