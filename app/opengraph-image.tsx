import { ImageResponse } from "next/og";

export const alt = "Cappiello Hair & Beauty — Salone Parrucchiere Caserta";
export const size = { width: 1200, height: 630 };
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
          background: "linear-gradient(135deg, #0A0A0B 0%, #1A1A1B 100%)",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              color: "#C9A96E",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Salone Parrucchiere · Caserta
          </span>

          <span
            style={{
              fontSize: "80px",
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontStyle: "italic",
            }}
          >
            Cappiello
          </span>

          <span
            style={{
              fontSize: "22px",
              color: "#C9A96E",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 400,
            }}
          >
            Hair & Beauty
          </span>

          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "12px",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "16px", color: "#6B6B6B" }}>
              Taglio · Colore · Trattamenti · Sposa
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "4px",
            background: "linear-gradient(90deg, #C9A96E, #D4BC8A, #C9A96E)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
