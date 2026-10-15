import {chunkForAI} from "@/lib/cms/rich-text-utils";import type {JSONContent} from "@/lib/cms/rich-text-types";
export default function AIChunkPreview({content}:{content:JSONContent}){const chunks=chunkForAI(content);return <div className="ai-chunk-preview"><span>AI KNOWLEDGE CHUNKS</span>{chunks.map((x,i)=><div key={i}><b>{x.heading}</b><p>{x.text}</p></div>)}</div>}
