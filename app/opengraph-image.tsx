import { ImageResponse } from "next/og";

export const alt = "Smash Up — Real American Smash Burger";
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
          background: "#0A0A0B",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
          }}
        >
          <span style={{ fontSize: "70px" }}>🍔</span>
          <span
            style={{
              fontSize: "20px",
              color: "#FFB800",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 800,
            }}
          >
            — REAL AMERICAN SMASH BURGER —
          </span>

          <span
            style={{
              fontSize: "90px",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            SMASH UP
          </span>

          <span
            style={{
              fontSize: "28px",
              color: "#A1A1AA",
              fontWeight: 500,
            }}
          >
            Crispy Crust · 100% Black Angus · Potato Bun
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "8px",
            background: "linear-gradient(90deg, #FFB800, #F5A623)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
