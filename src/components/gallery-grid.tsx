"use client";

import { useState, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = { images: { src: string; alt: string }[] };

export default function GalleryGrid({ images }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  const close = () => { setOpen(false); setIndex(null); };
  const openAt = useCallback((i: number) => { setIndex(i); setOpen(true); }, []);
  const prev = useCallback(() => { if (index !== null) setIndex(i => (i! - 1 + images.length) % images.length); }, [index, images.length]);
  const next = useCallback(() => { if (index !== null) setIndex(i => (i! + 1) % images.length); }, [index, images.length]);

  return (
    <>
      {/* FULL-WIDTH masonry grid */}
      <div className="w-full px-2 sm:px-3 lg:px-4">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-2 [column-fill:_balance]">
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => openAt(i)}
              className="mb-2 block w-full cursor-zoom-in focus:outline-none"
              aria-label={`Open ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full border border-muted bg-muted/30 transition hover:opacity-90"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : close())}>
        <DialogContent className="max-w-[90vw] p-2 sm:p-4">
          {index !== null && (
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <div className="truncate pr-2 text-sm text-muted-foreground">
                  {images[index].alt}
                </div>
                <div className="space-x-2">
                  <Button size="sm" variant="outline" onClick={prev} aria-label="Previous">Prev</Button>
                  <Button size="sm" onClick={next} aria-label="Next">Next</Button>
                </div>
              </div>
              <div className="relative flex justify-center">
                <img
                  src={images[index].src}
                  alt={images[index].alt}
                  className="max-h-[85vh] w-auto border border-muted object-contain"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
