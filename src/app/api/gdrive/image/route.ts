import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

function getAuth() {
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  let key = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !key) {
    throw new Error("Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY");
  }
  key = key.replace(/\\n/g, "\n"); // turn "\n" into real newlines
  return new google.auth.JWT({ email, key, scopes: SCOPES });
}

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return new Response("Missing id", { status: 400 });

    const auth = getAuth();
    const drive = google.drive({ version: "v3", auth });

    // Get metadata to set correct Content-Type
    const meta = await drive.files.get({
      fileId: id,
      fields: "mimeType, name",
    });

    // Fetch the raw image bytes
    const media = await drive.files.get(
      { fileId: id, alt: "media" },
      { responseType: "arraybuffer" }
    );

    const bytes = Buffer.from(media.data as ArrayBuffer);
    const contentType = meta.data.mimeType || "image/jpeg";

    return new Response(bytes, {
      headers: {
        "Content-Type": contentType,
        // Browser + CDN caching (tune as you like)
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch (err: any) {
    const msg =
      err?.response?.data?.error?.message ||
      err?.message ||
      "Drive fetch error";
    return new Response(msg, { status: 500 });
  }
}
