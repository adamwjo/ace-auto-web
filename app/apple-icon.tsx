import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
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
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 60,
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
      ...size,
    }
  );
}
