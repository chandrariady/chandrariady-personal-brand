"use client";
import { useEffect, useMemo, useState } from "react";

const levels = [
  { id: "surface", label: "SURFACE", elevation: 165 },
  { id: "about", label: "PROFILE", elevation: 125 },
  { id: "career", label: "CAREER PIT", elevation: 105 },
  { id: "work", label: "CAPABILITY", elevation: 85 },
  { id: "dispatch", label: "PROJECTS", elevation: 45 },
  { id: "writing", label: "FIELD NOTES", elevation: 5 },
  { id: "contact", label: "PIT FLOOR", elevation: -35 },
];

export default function ScrollDepth(){
  const [active,setActive]=useState("surface");
  const [progress,setProgress]=useState(0);
  useEffect(()=>{
    const onScroll=()=>{
      const max=document.documentElement.scrollHeight-window.innerHeight;
      setProgress(max>0?Math.min(1,window.scrollY/max):0);
      let current=levels[0].id;
      for(const level of levels){
        const el=document.getElementById(level.id);
        if(el && el.getBoundingClientRect().top<=window.innerHeight*.46) current=level.id;
      }
      setActive(current);
    };
    onScroll(); window.addEventListener("scroll",onScroll,{passive:true}); window.addEventListener("resize",onScroll);
    return()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onScroll)};
  },[]);
  const elevation=Math.round(165-progress*200);
  const activeIndex=useMemo(()=>levels.findIndex(x=>x.id===active),[active]);
  return <aside className="depth-rail" aria-label="Page depth navigation">
    <div className="depth-readout"><span>CURRENT RL</span><strong>{elevation>=0?"+":""}{elevation} m</strong></div>
    <div className="depth-shaft">
      <div className="depth-progress" style={{height:`${progress*100}%`}}/>
      <div className="depth-truck" style={{top:`calc(${progress*100}% - 9px)`}}><i/><b/></div>
      {levels.map((level,index)=><button key={level.id} onClick={()=>document.getElementById(level.id)?.scrollIntoView({behavior:"smooth"})} className={`depth-level ${index===activeIndex?"is-active":""}`} style={{top:`${index/(levels.length-1)*100}%`}} title={`${level.label} RL ${level.elevation>=0?"+":""}${level.elevation}`}><span>{level.elevation>=0?"+":""}{level.elevation}</span><em>{level.label}</em></button>)}
    </div>
    <span className="depth-caption">SCROLL TO DEPTH</span>
  </aside>
}
