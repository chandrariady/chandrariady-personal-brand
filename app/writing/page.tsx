import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WritingExplorer from "@/components/writing/WritingExplorer";
import WritingStyles from "@/components/writing/WritingStyles";
import { createClient } from "@/lib/supabase/server";
import type { Article } from "@/lib/cms/types";

export const revalidate = 60;

export default async function WritingPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(
      "id,title,slug,excerpt,category,tags,type,cover_image,featured,published_at,reading_time,word_count"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <>
      <WritingStyles />
      <Nav />
      <main className="writing-v2">
        <WritingExplorer
          articles={(data || []) as Article[]}
          loadError={error?.message}
        />
      </main>
      <Footer />
    </>
  );
}
