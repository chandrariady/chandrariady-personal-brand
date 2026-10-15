"use client";import {usePathname} from "next/navigation";import MineLoader from "@/components/MineLoader";import ScrollDepth from "@/components/ScrollDepth";
export default function SiteChrome(){const path=usePathname();if(path.startsWith("/studio"))return null;return <><MineLoader/><ScrollDepth/></>}
