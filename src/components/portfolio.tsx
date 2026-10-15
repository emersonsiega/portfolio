"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { ProjectIcon } from "@/components/project-icon";
import type { ProjectsContent } from "@/lib/content";
import { sortProjects } from "@/lib/dates";

type ViewMode = "list" | "timeline";

export function Portfolio({ projects }: { projects: ProjectsContent }) {
  const [view, setView] = useState<ViewMode>("timeline");
  const ordered = useMemo(
    () => sortProjects(projects.items, "newest"),
    [projects.items],
  );

  if (projects.items.length === 0) {
    return null;
  }

  return (
    <section className="work-section" id="work">
      <div className="work-header">
        <div>
          {projects.label ? (
            <div className="section-label">
              <span>02</span>
              <p>{projects.label}</p>
            </div>
          ) : null}
          {projects.title ? <h2>{projects.title}</h2> : null}
        </div>
        <div className="view-switcher" aria-label="Project display options">
          <button
            type="button"
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
          >
            <Icon name="grid" size={17} /> List
          </button>
          <button
            type="button"
            className={view === "timeline" ? "active" : ""}
            onClick={() => setView("timeline")}
            aria-pressed={view === "timeline"}
          >
            <Icon name="timeline" size={17} /> Timeline
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div className="project-list">
          {ordered.map((project) => (
            <ProjectCard key={project.id} project={project} timeline={false} />
          ))}
        </div>
      ) : (
        <div className="project-timeline">
          {ordered.map((project) => (
            <div className="timeline-entry" key={project.id}>
              <div className="timeline-icon">
                <ProjectIcon project={project} />
              </div>
              <ProjectCard project={project} timeline />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
