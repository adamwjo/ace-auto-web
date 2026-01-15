import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "ACE Mobile Repairs - Richmond Mobile Mechanic";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faf9f7",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* ACE Letters */}
        <div
          style={{
            display: "flex",
            fontSize: 180,
            fontWeight: 900,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#c94a2a" }}>A</span>
          <span style={{ color: "#d4a634" }}>C</span>
          <span style={{ color: "#4a8c3a" }}>E</span>
        </div>

        {/* Mobile Repairs */}
        <div
          style={{
            fontSize: 64,
            fontStyle: "italic",
            color: "#8b6914",
            marginTop: -20,
          }}
        >
          Mobile Repairs
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#666",
            marginTop: 40,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Richmond Mobile Mechanic
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
