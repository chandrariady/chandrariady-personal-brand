"use client";
import { useEffect, useState } from "react";
import { Factory, Mountain, Radio, Truck } from "lucide-react";

export default function MinePlanCityScene(){
 const [tick,setTick]=useState(0);
 useEffect(()=>{const t=setInterval(()=>setTick(x=>(x+1)%100),900);return()=>clearInterval(t)},[]);
 return <div className="mpc-scene" aria-label="Conceptual MinePlan City open pit simulation viewport">
  <div className="mpc-scene-grid"/>
  <div className="mpc-scene-head"><div><Radio size={13}/><span>SIMULATION VIEWPORT</span></div><b>SCENARIO_01</b></div>
  <svg viewBox="0 0 900 560" preserveAspectRatio="none" className="mpc-pit" aria-hidden="true">
   <defs><linearGradient id="mpcGround" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#27362e"/><stop offset="1" stopColor="#171f1b"/></linearGradient></defs>
   <path d="M0 95H900V560H0Z" fill="url(#mpcGround)"/>
   <path d="M0 95h205l55 61h425l48 58h-94l-44 58H332l-45 57h227l-45 58h-92l-45 59h174l53 62H900V0H0Z" fill="#07110f"/>
   <path d="M0 95h205l55 61h425M260 156h425l48 58h-94M639 214l-44 58H332M332 272l-45 57h227M514 329l-45 58h-92M377 387l-45 59h174M506 446l53 62H900" fill="none" stroke="#a9783f" strokeWidth="4" vectorEffect="non-scaling-stroke"/>
   <path d="M107 116C260 194 650 139 657 218S299 288 311 347s239 21 184 89" fill="none" stroke="#d4b483" strokeWidth="2" strokeDasharray="8 13" opacity=".7" vectorEffect="non-scaling-stroke"/>
  </svg>
  <div className="mpc-truck unit-1" style={{transform:`translateX(${tick*.45}px)`}}><Truck size={25}/><span>TRK-01</span></div>
  <div className="mpc-truck unit-2" style={{transform:`translateX(${-tick*.3}px)`}}><Truck size={22}/><span>TRK-02</span></div>
  <div className="mpc-crusher"><Factory size={28}/><span>CRUSHER</span></div>
  <div className="mpc-stockpile"><Mountain size={32}/><span>ROM</span></div>
  <div className="mpc-coordinates">E 514,220<br/>N 9,942,108<br/>RL +045</div>
  <div className="mpc-scene-foot"><span>SIM TIME</span><b>DAY 014 · SHIFT 02</b><span>ACTIVE UNITS</span><b>02 / 02</b></div>
 </div>
}
