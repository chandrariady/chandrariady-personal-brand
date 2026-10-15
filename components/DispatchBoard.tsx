import Link from "next/link";
import { ArrowUpRight, Bot, Boxes, GraduationCap, MapPinned, Radio, Truck } from "lucide-react";

const projects=[
  {unit:"CR-101",name:"MinePlan City",type:"Digital Twin",status:"BUILDING",progress:68,icon:Boxes,route:"Open-pit simulation",accent:"copper",href:"/projects/mineplan-city"},
  {unit:"CR-204",name:"Indonesia Mining Map",type:"Spatial Intelligence",status:"PROTOTYPE",progress:42,icon:MapPinned,route:"Public mining context",accent:"sage",href:"/map"},
  {unit:"CR-307",name:"Mining AI Lab",type:"Knowledge Systems",status:"RESEARCH",progress:31,icon:Bot,route:"Planning copilot",accent:"sand",href:"/#contact"},
  {unit:"CR-412",name:"Mining Learning Hub",type:"Education",status:"PLANNED",progress:18,icon:GraduationCap,route:"Practical field notes",accent:"mist",href:"/writing"},
];

export default function DispatchBoard(){return <section id="dispatch" className="dispatch-section px-6 py-28"><div className="mx-auto max-w-7xl">
  <div className="dispatch-top"><div><p className="font-mono text-xs tracking-[.25em] text-sage">03 / PROJECT DISPATCH</p><h2 className="mt-4 font-display text-4xl md:text-6xl">Ideas currently in the fleet.</h2><p className="mt-5 max-w-2xl leading-7 text-mist">A live board for the systems, tools and learning products I am building around mining.</p></div><div className="dispatch-live"><Radio size={15}/><span>CONTROL ROOM</span><b>ONLINE</b></div></div>
  <div className="dispatch-console">
    <div className="dispatch-console-head"><span>UNIT / PROJECT</span><span>ASSIGNMENT</span><span>PROGRESS</span><span>STATUS</span></div>
    <div className="dispatch-grid">{projects.map((p)=>{const Icon=p.icon;return <article className={`dispatch-card accent-${p.accent}`} key={p.unit}>
      <div className="dispatch-unit"><div className="unit-icon"><Icon size={22}/></div><div><span>{p.unit}</span><h3>{p.name}</h3></div><Truck className="ghost-truck" size={42}/></div>
      <div className="dispatch-type"><span>ASSIGNMENT</span><b>{p.type}</b><small>{p.route}</small></div>
      <div className="dispatch-progress"><div><span>ADVANCE</span><b>{p.progress}%</b></div><div className="progress-track"><i style={{width:`${p.progress}%`}}/></div></div>
      <div className="dispatch-status"><span className={`status status-${p.status.toLowerCase()}`}>{p.status}</span><Link href={p.href} aria-label={`Open ${p.name}`}><ArrowUpRight size={18}/></Link></div>
    </article>})}</div>
    <div className="dispatch-footer"><span>SHIFT: PERSONAL R&D</span><span>FLEET: 04 ACTIVE IDEAS</span><span>LAST SYNC: LOCAL BUILD</span></div>
  </div>
</div></section>}
