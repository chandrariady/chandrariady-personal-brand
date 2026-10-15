import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Boxes, Check, CircleDashed, Code2, Cpu, Database, Gauge, GitBranch, Map, Route, Truck } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MinePlanCityScene from "@/components/MinePlanCityScene";

export const metadata:Metadata={title:"MinePlan City",description:"A concept project exploring an interactive mine-planning environment through simulation, production logic and visual decision-making."};

const systems=[
 {name:"Open-pit scene",status:"ACTIVE",icon:Map,description:"Bench, ramp, crusher and stockpile environment."},
 {name:"Production engine",status:"BUILDING",icon:Gauge,description:"Material movement and production logic."},
 {name:"Haulage system",status:"BUILDING",icon:Truck,description:"Truck routes, cycle states and destinations."},
 {name:"Scheduling",status:"PLANNED",icon:GitBranch,description:"Activities, dependencies and time progression."},
 {name:"Economics",status:"PLANNED",icon:Database,description:"Scenario value and operating trade-offs."},
 {name:"Planning agents",status:"RESEARCH",icon:Cpu,description:"Future decision-support experiments."},
];

export default function MinePlanCityPage(){return <><Nav/><main className="mpc-page">
 <section className="mpc-hero px-6 pt-36 pb-24"><div className="mx-auto max-w-7xl">
  <Link href="/#dispatch" className="mpc-back"><ArrowLeft size={15}/> Return to project dispatch</Link>
  <div className="mpc-command"><div className="mpc-command-copy"><div className="mpc-project-code"><span>CR-101</span><b>ACTIVE DEVELOPMENT</b></div><p className="mpc-eyebrow">DIGITAL TWIN · MINE PLANNING SIMULATION</p><h1>MinePlan<br/><span>City.</span></h1><p className="mpc-lead">An interactive environment for exploring how mine design, haulage, production and planning decisions connect over time.</p><div className="mpc-actions"><a href="#mission">Explore mission <ArrowUpRight size={17}/></a><a href="#systems">View systems</a></div></div><MinePlanCityScene/></div>
  <div className="mpc-telemetry"><div><span>PROJECT TYPE</span><b>Interactive Simulator</b></div><div><span>DOMAIN</span><b>Open-pit Planning</b></div><div><span>BUILD</span><b>Web Application</b></div><div><span>STATUS</span><b className="online">Building</b></div></div>
 </div></section>

 <section id="mission" className="mpc-mission px-6 py-24"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><p className="mpc-section-label">01 / MISSION</p><h2>Make mine-planning systems easier to see, test and understand.</h2></div><div className="mpc-mission-copy"><p className="large">MinePlan City is a personal R&amp;D concept that treats a mine as a connected system, not a collection of isolated calculations.</p><p>The project explores a visual learning environment where users can observe material movement, equipment behaviour, production constraints and planning trade-offs in one interface.</p><div className="mpc-question"><span>DESIGN QUESTION</span><strong>Can an interactive simulation help mining professionals understand the consequences of planning decisions before those decisions become operational instructions?</strong></div></div></div></section>

 <section id="systems" className="mpc-systems px-6 py-24"><div className="mx-auto max-w-7xl"><div className="mpc-section-head"><div><p className="mpc-section-label">02 / SYSTEM ARCHITECTURE</p><h2>Modules in the planning stack.</h2></div><div className="mpc-system-summary"><Boxes/><span>06 SYSTEMS</span><b>02 BUILDING</b></div></div><div className="mpc-system-grid">{systems.map((s,i)=>{const Icon=s.icon;return <article key={s.name} className={`mpc-system-card status-${s.status.toLowerCase()}`}><div className="mpc-system-number">{String(i+1).padStart(2,"0")}</div><Icon/><span>{s.status}</span><h3>{s.name}</h3><p>{s.description}</p><div className="mpc-status-line"><i/></div></article>})}</div></div></section>

 <section className="mpc-workflow px-6 py-24"><div className="mx-auto max-w-7xl"><p className="mpc-section-label">03 / SIMULATION LOOP</p><h2>From plan to observable outcome.</h2><div className="mpc-loop"><div><span>01</span><Route/><h3>Plan</h3><p>Define destinations, routes and operating intent.</p></div><i/><div><span>02</span><Truck/><h3>Simulate</h3><p>Move equipment and material through the system.</p></div><i/><div><span>03</span><Gauge/><h3>Measure</h3><p>Observe production, delays and constraints.</p></div><i/><div><span>04</span><GitBranch/><h3>Decide</h3><p>Compare scenarios and adjust the plan.</p></div></div></div></section>

 <section className="mpc-stack px-6 py-24"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2"><div><p className="mpc-section-label">04 / BUILD STACK</p><h2>Designed as a modular web simulation.</h2><p className="mpc-stack-intro">The current prototype direction uses a typed React application with a 3D scene layer and separate domain logic for production and simulation state.</p></div><div className="mpc-stack-panel"><div><Code2/><span>INTERFACE</span><b>React · TypeScript</b></div><div><Boxes/><span>3D SCENE</span><b>Three.js · React Three Fiber</b></div><div><Cpu/><span>SIMULATION</span><b>Modular domain engines</b></div><div><Database/><span>DATA</span><b>Scenario-first prototype data</b></div></div></div></section>

 <section className="mpc-roadmap px-6 py-24"><div className="mx-auto max-w-7xl"><p className="mpc-section-label">05 / DEVELOPMENT ROADMAP</p><h2>Building from visible mine to decision system.</h2><div className="mpc-roadmap-list">{[["FOUNDATION","Scene, pit geometry and visual identity",true],["PRODUCTION","Material movement and production state",true],["HAULAGE","Cycle logic, assignment and destinations",false],["SCHEDULING","Activities, dependencies and time",false],["ECONOMICS","Scenario value and trade-offs",false],["INTELLIGENCE","Planning agents and explainable recommendations",false]].map(([phase,text,done],i)=><div key={String(phase)}><span>{done?<Check/>:<CircleDashed/>}</span><small>PHASE {String(i+1).padStart(2,"0")}</small><h3>{phase}</h3><p>{text}</p></div>)}</div></div></section>

 <section className="mpc-cta px-6 py-24"><div className="mx-auto max-w-7xl"><div><p className="mpc-section-label">FIELD LOG</p><h2>MinePlan City is still an active experiment.</h2><p>The project page will evolve alongside the simulator, with design notes, development logs and playable modules added as the system matures.</p></div><Link href="/#contact">Discuss the project <ArrowUpRight/></Link></div></section>
 </main><Footer/></>}
