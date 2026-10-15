export default function RealisticHaulTruck({className=""}:{className?:string}){return <svg className={className} viewBox="0 0 520 260" role="img" aria-label="Detailed mining haul truck illustration">
  <defs>
    <linearGradient id="bodyPaint" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f2b24f"/><stop offset=".55" stopColor="#d8892f"/><stop offset="1" stopColor="#9d5720"/></linearGradient>
    <linearGradient id="trayPaint" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e5a244"/><stop offset="1" stopColor="#8f4b1c"/></linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9fc2bd" stopOpacity=".9"/><stop offset="1" stopColor="#16302d" stopOpacity=".95"/></linearGradient>
    <radialGradient id="tire" cx="40%" cy="35%"><stop offset="0" stopColor="#3a3d3b"/><stop offset=".7" stopColor="#151716"/><stop offset="1" stopColor="#050606"/></radialGradient>
    <filter id="truckShadow"><feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000" floodOpacity=".6"/></filter>
  </defs>
  <ellipse cx="274" cy="225" rx="205" ry="20" fill="#000" opacity=".34"/>
  <g filter="url(#truckShadow)">
    <path d="M42 55h271l-28 108H91L55 96Z" fill="url(#trayPaint)" stroke="#5c3217" strokeWidth="4"/>
    <path d="M58 73h225l-11 21H68Z" fill="#f4bd61" opacity=".48"/>
    <path d="M67 99h214M78 127h198" stroke="#7c441f" strokeWidth="5" opacity=".7"/>
    <path d="M89 161h244l31-66h77l42 64v42H94Z" fill="url(#bodyPaint)" stroke="#6d3b18" strokeWidth="4"/>
    <path d="M349 97h79l33 52H334Z" fill="#c87325" stroke="#6d3b18" strokeWidth="4"/>
    <path d="M367 105h51l22 34h-83Z" fill="url(#glass)" stroke="#274a43" strokeWidth="3"/>
    <path d="M449 143h25v17h-18Z" fill="#f3d079"/>
    <rect x="123" y="157" width="212" height="42" rx="7" fill="#b96824" stroke="#6d3b18" strokeWidth="4"/>
    <path d="M172 159v40M227 159v40M282 159v40" stroke="#7d431d" strokeWidth="4"/>
    <path d="M317 99V62h8v37M325 68h28" stroke="#b9c0b9" strokeWidth="5"/>
    <rect x="350" y="158" width="109" height="24" rx="5" fill="#18302b" opacity=".68"/>
    <path d="M463 168h22v18h-22M106 165H72v17h34" fill="#26312d" stroke="#69736e" strokeWidth="3"/>
    <g><circle cx="151" cy="200" r="55" fill="url(#tire)" stroke="#555c58" strokeWidth="4"/><circle cx="151" cy="200" r="25" fill="#ce7b2c" stroke="#74421f" strokeWidth="5"/><circle cx="151" cy="200" r="8" fill="#222"/><path d="M107 183h88M112 220h78M133 149l36 99M172 151l-42 96" stroke="#686d69" strokeWidth="3" opacity=".55"/></g>
    <g><circle cx="401" cy="200" r="55" fill="url(#tire)" stroke="#555c58" strokeWidth="4"/><circle cx="401" cy="200" r="25" fill="#ce7b2c" stroke="#74421f" strokeWidth="5"/><circle cx="401" cy="200" r="8" fill="#222"/><path d="M357 183h88M362 220h78M383 149l36 99M422 151l-42 96" stroke="#686d69" strokeWidth="3" opacity=".55"/></g>
    <path d="M333 114h-35l-15 71" fill="none" stroke="#d9ad63" strokeWidth="8"/>
    <rect x="91" y="148" width="47" height="12" rx="3" fill="#efc264"/><circle cx="99" cy="154" r="4" fill="#fff6b1"/>
  </g>
</svg>}
