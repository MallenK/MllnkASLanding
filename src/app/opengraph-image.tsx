import { ImageResponse } from "next/og";
import { OgImageContent } from "@/lib/og";
import { SITE_TAGLINE } from "@/lib/constants";

export const alt = `URPA Academia Software — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(<OgImageContent />, { ...size });
}
