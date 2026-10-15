import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/cms/types";

export default function RelatedNotes({ notes }: { notes: Article[] }) {
  if (!notes.length) return null;

  return (
    <section className="reader-related">
      <div className="reader-section-heading">
        <span>RELATED FIELD NOTES</span>
        <b>{String(notes.length).padStart(2, "0")} MATCHES</b>
      </div>

      <div className="reader-related-grid">
        {notes.map((note, index) => (
          <Link href={`/writing/${note.slug}`} key={note.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <small>
              {note.category} · {note.type.replaceAll("_", " ")}
            </small>
            <h3>{note.title}</h3>
            <p>{note.excerpt}</p>
            <footer>
              {note.reading_time || 1} MIN READ <ArrowUpRight />
            </footer>
          </Link>
        ))}
      </div>
    </section>
  );
}
