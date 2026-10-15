"use client";
import { useState } from "react";
import { BriefcaseBusiness, ChevronLeft, ChevronRight, GraduationCap, Pickaxe } from "lucide-react";
import RealisticHaulTruck from "@/components/RealisticHaulTruck";

const careers=[
 {year:"2018",period:"AUG 2018 — DEC 2019",role:"Mine Supervisor",company:"PT Berau Coal",discipline:"OPERATIONS",summary:"Execution of pre-planned operations with a focus on safe and efficient delivery.",work:["Operational execution","Project improvement initiatives","Operational method improvement"],top:15,left:20},
 {year:"2019",period:"DEC 2019 — NOV 2020",role:"Mineplan Engineer",company:"PT Pada Idi",discipline:"MINE PLANNING",summary:"Planning and management across mining activities with long-term and short-term planning responsibilities.",work:["Geotechnical, hydrological and data evaluation","Good mining practice","Government permit preparation and submission"],top:34,left:35},
 {year:"2020",period:"NOV 2020 — JAN 2025",role:"Senior Mining Engineer",company:"PT Vale Indonesia, Tbk",discipline:"STRATEGIC + TACTICAL",summary:"Strategic and tactical mine planning for a greenfield project and FEL documentation.",work:["Pit optimisation","Comprehensive production schedules","Mine layouts and contractor mine services"],top:53,left:50},
 {year:"2025",period:"JAN 2025 — NOW",role:"Senior Mining Consultant",company:"Deswik",discipline:"CONSULTING",summary:"Technical consulting and advisory for open-pit mine planning and scheduling across coal and metal mining operations in Indonesia.",work:["Mine planning workflow optimisation","Software implementation and client training","Digital transformation using Deswik solutions"],top:72,left:65},
];

export default function CareerPitTimeline(){
 const [active,setActive]=useState(3); const c=careers[active];
 const set=(n:number)=>setActive(Math.max(0,Math.min(3,n)));
 return <section id="career" className="career-pit career-bench-v3 px-6 py-28"><div className="mx-auto max-w-7xl">
  <div className="career-heading"><div><p className="font-mono text-xs tracking-[.25em] text-sage">02 / CAREER DEVELOPMENT</p><h2 className="mt-4 max-w-3xl font-display text-4xl md:text-6xl">From surface operations to the current face.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-mist">My career is mapped as a sequence of open-pit benches. The earliest role starts at the upper bench, then each step descends toward my current role.</p></div></div>
  <div className="bench-layout">
   <div className="bench-scene">
    <div className="bench-header"><span>CAREER PIT · BENCH PROFILE</span><b>SURFACE → CURRENT FACE</b></div>
    <div className="bench-geology"/>
    <svg viewBox="0 0 900 650" preserveAspectRatio="none" className="bench-profile" aria-hidden="true">
      <path className="bench-rock" d="M0 80H235L275 140H385L425 200H535L575 260H685L725 320H900V650H0Z"/>
      <path className="bench-edge" d="M0 80H235L275 140H385L425 200H535L575 260H685L725 320H900"/>
      <path className="bench-haul-line" d="M115 104C245 110 250 170 345 169S420 230 505 229S575 290 665 289S720 350 805 350"/>
      <path className="bench-strata" d="M0 405c180-32 335-27 480 8s267 37 420 7M0 470c145-22 291-21 435 10s292 36 465 10M0 535c130-18 268-16 403 11s308 34 497 11"/>
    </svg>
    <span className="surface-label">PIT CREST / CAREER START</span><span className="face-label">CURRENT FACE</span>
    {careers.map((item,i)=><button key={item.company} onClick={()=>set(i)} className={`bench-career-card ${active===i?"active":""} ${i===3?"current":""}`} style={{top:`${item.top}%`,left:`${item.left}%`}}>
       <span className="bench-dot"><Pickaxe size={15}/></span><span className="bench-copy"><small>{item.year} · BENCH {String(i+1).padStart(2,"0")}</small><strong>{item.company.replace(", Tbk","")}</strong><em>{item.role}</em></span>
    </button>)}
    <div className="bench-career-truck" style={{top:`calc(${c.top}% - 42px)`,left:`calc(${c.left}% + 4px)`}}><RealisticHaulTruck/></div>
    <div className="education-card education-itb-v3"><GraduationCap size={18}/><div><small>EDUCATION · 2014–2018</small><strong>Bandung Institute of Technology</strong><span>Mining Engineering</span></div></div>
    <div className="education-card education-ubc-v3"><GraduationCap size={18}/><div><small>EDUCATION · 2022–2023</small><strong>University of British Columbia</strong><span>Economic Leadership for Mining</span></div></div>
   </div>
   <aside className="bench-detail">
    <div className="bench-detail-head"><div><small>SELECTED CAREER BENCH</small><strong>BENCH {String(active+1).padStart(2,"0")}</strong></div><span className={active===3?"now":""}>{active===3?"CURRENT":"COMPLETED"}</span></div>
    <div className="bench-role"><small>{c.period}</small><span>{c.discipline}</span><h3>{c.role}</h3><h4>{c.company}</h4></div>
    <p className="bench-summary">{c.summary}</p>
    <div className="bench-scope"><small>KEY SCOPE</small>{c.work.map(x=><p key={x}><ChevronRight size={15}/>{x}</p>)}</div>
    <div className="bench-nav"><button onClick={()=>set(active-1)} disabled={active===0}><ChevronLeft/> PREVIOUS BENCH</button><b>{active+1} / 4</b><button onClick={()=>set(active+1)} disabled={active===3}>NEXT BENCH <ChevronRight/></button></div>
   </aside>
  </div>
 </div></section>
}
