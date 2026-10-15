import StudioShell from "@/components/studio/StudioShell";import {createClient} from "@/lib/supabase/server";
export default async function StudioLayout({children}:{children:React.ReactNode}){const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)return children;return <StudioShell email={user.email}>{children}</StudioShell>}
