import { ImageResponse } from "next/server";

export const alt = "Maroc Operateur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Maroc Operateur
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported twitter-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
