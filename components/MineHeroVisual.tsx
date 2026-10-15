import RealisticHaulTruck from "@/components/RealisticHaulTruck";
export default function MineHeroVisual(){return <div className="mine-visual" aria-hidden="true">
  <div className="mine-hud hud-top"><span>ACTIVE PIT</span><b>CR_PIT_01</b></div>
  <svg viewBox="0 0 720 620" className="pit-svg" role="img">
    <defs><linearGradient id="pitGlow" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#68a47a" stopOpacity=".55"/><stop offset="1" stopColor="#c98645" stopOpacity=".24"/></linearGradient></defs>
    <path d="M54 116C144 58 262 49 354 87c111 45 198 27 305 99" fill="none" stroke="#315447" strokeWidth="2"/>
    <path d="M39 170c105-78 211-82 318-39 125 50 205 32 319 109" fill="none" stroke="#3c6555" strokeWidth="2"/>
    <path d="M52 229c101-78 201-81 292-40 117 54 194 46 311 111" fill="none" stroke="#4e7b67" strokeWidth="2"/>
    <path d="M81 286c82-65 171-73 250-37 96 44 177 51 282 99" fill="none" stroke="#c98645" strokeOpacity=".7" strokeWidth="3"/>
    <path d="M115 340c65-52 134-57 198-29 86 37 151 52 246 86" fill="none" stroke="#547c69" strokeWidth="3"/>
    <path d="M151 391c47-37 100-42 145-22 64 29 123 46 204 69" fill="none" stroke="#426756" strokeWidth="3"/>
    <path d="M198 440c30-24 63-25 94-12 45 19 84 35 139 48" fill="none" stroke="#c98645" strokeWidth="3"/>
    <path d="M237 477c17-12 37-13 55-6 28 12 52 23 83 30" fill="none" stroke="url(#pitGlow)" strokeWidth="8"/>
    <path d="M581 170c-35 53-86 78-145 92-48 11-76 41-110 78-33 36-81 56-127 69" fill="none" stroke="#d4b483" strokeDasharray="8 12" strokeWidth="3" className="haul-route"/>
    <circle cx="581" cy="170" r="7" fill="#c98645"/><circle cx="199" cy="409" r="7" fill="#68a47a"/>

  </svg>
  <RealisticHaulTruck className="hero-truck-real"/>
  <div className="mine-hud hud-bottom"><span>ELEVATION</span><b>RL +125</b></div>
  <div className="coordinate-readout">00°33' S<br/>117°09' E</div>
</div>}
