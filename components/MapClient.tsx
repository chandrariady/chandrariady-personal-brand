"use client";
import dynamic from "next/dynamic";
const MiningMap=dynamic(()=>import("@/components/MiningMap"),{ssr:false,loading:()=> <div className="h-[620px] animate-pulse rounded-2xl bg-panel"/>});
export default function MapClient(){return <MiningMap/>}
