"use client";
import { useEffect, useState } from "react";
import RealisticHaulTruck from "@/components/RealisticHaulTruck";
export default function MineLoader(){
  const [visible,setVisible]=useState(true);
  useEffect(()=>{const t=setTimeout(()=>setVisible(false),2200);return()=>clearTimeout(t)},[]);
  if(!visible)return null;
  return <div className="mine-loader" aria-label="Loading Chandra Riady website">
    <div className="loader-sky"><span className="loader-sun"/></div>
    <div className="loader-copy"><span>CHANDRA RIADY</span><strong>SHIFT STARTING</strong></div>
    <div className="haul-road"><div className="road-line"/></div>
    <div className="loader-vehicle-layer" aria-hidden="true">
      <div className="dust dust-a"/><div className="dust dust-b"/>
      <div className="loader-truck-real"><RealisticHaulTruck/></div>
    </div>
    <div className="loader-status"><span>Mobilising to the next bench</span><b>CR-01</b></div>
  </div>
}
