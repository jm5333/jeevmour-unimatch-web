import { ImageResponse } from "next/og";

export const alt = "UniMatch: Your campus. Your people. Your kind of connection.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#24132f",
          color: "#faf7f2",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 40 40">
            <circle cx="15" cy="20" r="10.5" fill="none" stroke="#f47c76" strokeWidth="4" />
            <circle cx="25" cy="20" r="10.5" fill="none" stroke="#a78bdb" strokeWidth="4" />
          </svg>
          <span style={{ fontSize: 44, fontWeight: 700 }}>UniMatch</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 82, lineHeight: 1.02, fontWeight: 700 }}>
          <span>Your campus.</span>
          <span>Your people.</span>
          <span style={{ color: "#a78bdb", fontStyle: "italic", fontWeight: 400 }}>Your kind of connection.</span>
        </div>
        <span style={{ fontSize: 28, color: "#d3c7e8", fontFamily: "sans-serif" }}>
          Early access for university students · unimatch.app
        </span>
      </div>
    ),
    size,
  );
}
