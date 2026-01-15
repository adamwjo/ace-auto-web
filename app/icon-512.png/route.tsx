import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
          borderRadius: 64,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 172,
            fontWeight: 900,
            fontStyle: "italic",
          }}
        >
          <span style={{ color: "#c94a2a" }}>A</span>
          <span style={{ color: "#d4a634" }}>C</span>
          <span style={{ color: "#4a8c3a" }}>E</span>
        </div>
      </div>
    ),
    {
      width: 512,
      height: 512,
    }
  );
}
