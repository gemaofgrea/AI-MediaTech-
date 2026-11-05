import { ImageResponse } from "next/og";

export const alt = "AI MEDIATECH // AI-Directed Master Cinema";
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
          background: "#070709",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Soft Ambient Lime Aura */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "rgba(163, 230, 53, 0.08)",
            filter: "blur(120px)",
          }}
        />

        {/* Framing Corner Accents */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 24,
            height: 24,
            borderTop: "2px solid rgba(255,255,255,0.25)",
            borderLeft: "2px solid rgba(255,255,255,0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: 24,
            height: 24,
            borderTop: "2px solid rgba(255,255,255,0.25)",
            borderRight: "2px solid rgba(255,255,255,0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            width: 24,
            height: 24,
            borderBottom: "2px solid rgba(255,255,255,0.25)",
            borderLeft: "2px solid rgba(255,255,255,0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            width: 24,
            height: 24,
            borderBottom: "2px solid rgba(255,255,255,0.25)",
            borderRight: "2px solid rgba(255,255,255,0.25)",
          }}
        />

        {/* Center Emblem Card */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.12)",
            marginBottom: 28,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
            <path d="M6 6h20l-5.5 7 5.5 7H6V6z" fill="#ffffff" />
            <line
              x1="11"
              y1="6"
              x2="11"
              y2="20"
              stroke="#a3e635"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Brand Title */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            marginBottom: 14,
          }}
        >
          AI MEDIATECH
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.28em",
            color: "#a3e635",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          AI-Directed Master Cinema & Virtual Production
        </div>

        {/* Studio Telemetry Pills */}
        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            4K DCI // ACES 2065-1
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            DOLBY ATMOS 9.1.6
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            WORLDWIDE STUDIO
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

