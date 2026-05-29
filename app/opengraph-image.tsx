import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "edge";
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0b",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 20,
            color: "#60a5fa",
          }}
        >
          Full Stack Engineer
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: 900 }}>
            {site.headline}
          </div>
          <div style={{ fontSize: 28, color: "#a1a1aa", maxWidth: 800 }}>
            {site.name} · Angular · React · TypeScript · Node.js
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#71717a" }}>{site.url.replace(/^https?:\/\//, "")}</div>
      </div>
    ),
    { ...size },
  );
}
