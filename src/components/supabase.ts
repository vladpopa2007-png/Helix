import { createClient } from '@supabase/supabase-js'

const NEXT_PUBLIC_SUPABASE_URL=' https://rsglfrtxetdokywxlyir.supabase.co'
const NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY= ' sb_publishable_g-8Uyned1oItf_X8vUg35A_8kUhqWwm '

export const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
