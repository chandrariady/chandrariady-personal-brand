import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Chandra Riady | Mining, Technology & AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px", background: "#07110f", color: "#edf2ef", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#68a47a", fontSize: 20, letterSpacing: 4 }}>
        <span>CHANDRA RIADY</span><span>MINING / TECHNOLOGY / AI</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 86, lineHeight: .95, fontWeight: 700 }}>Mining knowledge.</span>
        <span style={{ fontSize: 86, lineHeight: .95, fontWeight: 700, color: "#c98c50" }}>Built in the open.</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 25, borderTop: "1px solid #315044", color: "#91a59b", fontSize: 22 }}>
        <span>Mine planning · Technology · AI</span><span>chandrariady.web.id</span>
      </div>
    </div>,
    size
  );
}
