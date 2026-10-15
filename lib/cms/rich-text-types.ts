export type JSONContent={type?:string;attrs?:Record<string,any>;content?:JSONContent[];marks?:{type:string;attrs?:Record<string,any>}[];text?:string};
export type TocItem={id:string;text:string;level:2|3};
export type AIMetadata={summary?:string;keywords?:string[];entities?:string[];sourceNotes?:string[];chunkStrategy?:"headings"|"paragraphs";embeddingStatus?:"not_ready"|"queued"|"ready"};
export const EMPTY_TIPTAP_DOC:JSONContent={type:"doc",content:[{type:"heading",attrs:{level:2,id:"new-field-note"},content:[{type:"text",text:"New field note"}]},{type:"paragraph",content:[{type:"text",text:"Start writing here..."}]}]};
