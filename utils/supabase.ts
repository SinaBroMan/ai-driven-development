import { createClient } from '@supabase/supabase-js'

// Supabase 클라이언트 생성 함수 (개발 모드용)
export const createSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key',
        {
            global: {
                headers: {
                    Authorization: `Bearer dev-token`
                }
            }
        }
    )
}
