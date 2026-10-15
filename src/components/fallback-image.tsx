"use client";

import { useEffect, useState, type ReactNode } from "react";

export function FallbackImage({
  sources,
  alt,
  className,
  fallback,
}: {
  sources: string[];
  alt: string;
  className?: string;
  fallback: ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const src = sources[index];

  useEffect(() => {
    setIndex(0);
  }, [sources]);

  if (!src) {
    return fallback;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setIndex((current) => current + 1)}
      onLoad={(event) => {
        const image = event.currentTarget;
        if (image.naturalWidth === 0) {
          setIndex((current) => current + 1);
        }
      }}
    />
  );
}
