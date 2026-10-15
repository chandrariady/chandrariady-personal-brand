import type {TocItem} from "@/lib/cms/rich-text-types";
export default function TableOfContents({items}:{items:TocItem[]}){if(!items.length)return null;return <nav className="article-toc"><span>ON THIS NOTE</span>{items.map((x,i)=><a key={`${x.id}-${i}`} className={x.level===3?"toc-sub":""} href={`#${x.id}`}><b>{String(i+1).padStart(2,"0")}</b>{x.text}</a>)}</nav>}
