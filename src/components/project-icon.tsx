"use client";

import { type CSSProperties } from "react";
import { FallbackImage } from "@/components/fallback-image";
import type { Project } from "@/lib/content";

export function ProjectIcon({ project }: { project: Project }) {
  return (
    <div
      className="project-icon"
      aria-hidden="true"
      style={{ "--project-color": project.accent } as CSSProperties}
    >
      <FallbackImage
        sources={project.thumbnailSources}
        alt=""
        fallback={
          <>
            <span>{project.initials}</span>
            <i />
          </>
        }
      />
    </div>
  );
}
