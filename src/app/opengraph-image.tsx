import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/content";

const profile = getProfile();

export const alt = profile.title
  ? `${profile.name} — ${profile.title}`
  : profile.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#f8f4ed",
          color: "#211e29",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
            color: "#6d4aff",
            textTransform: "uppercase",
          }}
        >
          {profile.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            marginTop: 16,
            letterSpacing: -2,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            marginTop: 20,
            maxWidth: 900,
            color: "#6d6878",
            lineHeight: 1.4,
          }}
        >
          {profile.seoDescription}
        </div>
      </div>
    ),
    size,
  );
}
