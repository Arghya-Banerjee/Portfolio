// src/app/(marketing)/gallery/page.tsx
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 60;

import GalleryGrid from "@/components/gallery-grid";
import { listDriveImages } from "@/lib/gdrive";

export default async function GalleryPage() {
  const folderId = process.env.DRIVE_FOLDER_ID;
  if (!folderId) {
    return (
      <section className="py-6 px-4 sm:px-6">
        <h1 className="text-2xl font-semibold">Gallery</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Missing <code className="rounded bg-muted px-1">DRIVE_FOLDER_ID</code> in <code>.env.local</code>.
        </p>
      </section>
    );
  }

  const images = await listDriveImages(folderId);

  return (
    <section className="py-6">
      <header className="mb-4 px-4 sm:px-6">
        <h1 className="text-2xl font-semibold">Gallery</h1>
        <p className="mt-1 text-sm text-muted-foreground">Photos load from your Google Drive folder.</p>
      </header>

      {images.length === 0 ? (
        <p className="px-4 sm:px-6 text-muted-foreground">No images found in the Drive folder.</p>
      ) : (
        <GalleryGrid images={images} />
      )}
    </section>
  );
}
