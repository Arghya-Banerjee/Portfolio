import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

function getAuth() {
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  let key = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !key) throw new Error("Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY");
  key = key.replace(/\\n/g, "\n");
  return new google.auth.JWT({ email, key, scopes: SCOPES });
}

export type DriveImage = {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export async function listDriveImages(folderId: string): Promise<DriveImage[]> {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
    fields: "files(id,name,imageMediaMetadata(width,height))",
    orderBy: "name",
    pageSize: 1000,
  });

  const files = res.data.files ?? [];
  return files.map((f) => ({
    id: f.id!,
    // ✅ use our proxy route so files can remain private in Drive
    src: `/api/gdrive/image?id=${f.id}`,
    alt: (f.name || "").replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
    width: f.imageMediaMetadata?.width ?? undefined,
    height: f.imageMediaMetadata?.height ?? undefined,
  }));
}
