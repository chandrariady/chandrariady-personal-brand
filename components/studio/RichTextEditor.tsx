"use client";
import {useEffect,useRef,useState} from "react";
import {EditorContent,useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CharacterCount from "@tiptap/extension-character-count";
import type {JSONContent} from "@/lib/cms/rich-text-types";
import {countWords,extractToc,readingTime} from "@/lib/cms/rich-text-utils";
import {FormulaBlock,HeadingWithId,MineCallout} from "@/lib/cms/rich-text-extensions";
import EditorToolbar from "@/components/studio/EditorToolbar";
import SlashCommandMenu from "@/components/studio/SlashCommandMenu";

export type RichTextChange={json:JSONContent;html:string;words:number;minutes:number;toc:ReturnType<typeof extractToc>};
export default function RichTextEditor({value,onChange,onUpload,status}:{value:JSONContent;onChange:(v:RichTextChange)=>void;onUpload:(file:File)=>Promise<string|null>;status:string}){const [slash,setSlash]=useState(false);const fileRef=useRef<HTMLInputElement>(null);const editor=useEditor({immediatelyRender:false,extensions:[StarterKit.configure({heading:false}),HeadingWithId.configure({levels:[2,3]}),Underline,Image.configure({inline:false,allowBase64:false}),Link.configure({openOnClick:false,autolink:true,defaultProtocol:"https"}),Placeholder.configure({placeholder:"Write a field note. Type / to insert a block..."}),TextAlign.configure({types:["heading","paragraph"]}),TaskList,TaskItem.configure({nested:true}),CharacterCount,MineCallout,FormulaBlock],content:value,onUpdate:({editor})=>{const json=editor.getJSON() as JSONContent;const words=countWords(json);onChange({json,html:editor.getHTML(),words,minutes:readingTime(words),toc:extractToc(json)});setSlash(editor.state.doc.textBetween(Math.max(0,editor.state.selection.from-1),editor.state.selection.from," ")==="/")}});useEffect(()=>{if(editor&&!editor.isFocused&&JSON.stringify(editor.getJSON())!==JSON.stringify(value))editor.commands.setContent(value)},[editor,value]);async function selectFile(file?:File){if(!file||!editor)return;const url=await onUpload(file);if(url)editor.chain().focus().setImage({src:url,alt:file.name,title:file.name}).run()}if(!editor)return <div className="rte-loading">Loading editor...</div>;return <div className="rte-shell"><EditorToolbar editor={editor} onImage={()=>fileRef.current?.click()}/><div className="rte-canvas"><EditorContent editor={editor}/><SlashCommandMenu editor={editor} open={slash} onClose={()=>setSlash(false)} onImage={()=>fileRef.current?.click()}/></div><input ref={fileRef} hidden type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={e=>void selectFile(e.target.files?.[0])}/><footer className="rte-footer"><span>{editor.storage.characterCount.words()} words · ~{readingTime(editor.storage.characterCount.words())} min read</span><b>{status}</b></footer></div>}
