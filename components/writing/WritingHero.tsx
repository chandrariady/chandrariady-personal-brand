import { BookOpenText, Radio } from "lucide-react";

export default function WritingHero({
  noteCount,
  topicCount,
}: {
  noteCount: number;
  topicCount: number;
}) {
  return (
    <header className="writing-hero">
      <div className="writing-hero-copy">
        <div className="writing-kicker">
          <span>01 / KNOWLEDGE</span>
          <div>
            <Radio size={13} />
            KNOWLEDGE BASE ACTIVE
          </div>
        </div>
        <h1>
          Field
          <span>Notes.</span>
        </h1>
        <p>
          Ideas from the intersection of mining, mine planning,
          technology and AI. Notes shaped by engineering practice,
          ongoing experiments and questions worth exploring.
        </p>
      </div>

      <div className="writing-hero-stats">
        <div>
          <BookOpenText />
          <span>PUBLISHED NOTES</span>
          <strong>{String(noteCount).padStart(2, "0")}</strong>
        </div>
        <div>
          <span>ACTIVE TOPICS</span>
          <strong>{String(topicCount).padStart(2, "0")}</strong>
        </div>
      </div>
    </header>
  );
}
