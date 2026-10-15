"use client";

import { useMemo, type MouseEvent } from "react";
import { Icon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { ProjectIcon } from "@/components/project-icon";
import type { CvContent, ProjectsContent } from "@/lib/content";
import { sortProjects } from "@/lib/dates";

function scrollToProject(event: MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  event.preventDefault();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
  history.replaceState(null, "", `#${id}`);
}

export function Portfolio({
  projects,
  cv,
}: {
  projects: ProjectsContent;
  cv: CvContent;
}) {
  const ordered = useMemo(
    () => sortProjects(projects.items, "newest"),
    [projects.items],
  );
  const featured = useMemo(
    () => ordered.find((project) => project.featured),
    [ordered],
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
          {featured ? (
            <a
              className="featured-jump"
              href={`#${featured.id}`}
              onClick={(event) => scrollToProject(event, featured.id)}
            >
              <Icon name="star" size={12} />
              Jump to featured project: {featured.name}
              <span aria-hidden="true">↘</span>
            </a>
          ) : null}
        </div>
      </div>

      <div className="project-timeline">
        {ordered.map((project) => (
          <div className="timeline-entry" key={project.id}>
            <div className="timeline-icon">
              <ProjectIcon project={project} />
            </div>
            <ProjectCard project={project} />
          </div>
        ))}
        {projects.more ? <TimelineMore more={projects.more} cv={cv} /> : null}
      </div>
    </section>
  );
}

function TimelineMore({
  more,
  cv,
}: {
  more: NonNullable<ProjectsContent["more"]>;
  cv: CvContent;
}) {
  const cvLink = cv.view ?? cv.download;

  return (
    <div className="timeline-entry timeline-more">
      <div className="timeline-more-node" aria-hidden="true">
        <span />
      </div>
      <div className="timeline-more-copy">
        <h3>{more.title}</h3>
        {more.description ? <p>{more.description}</p> : null}
        {cvLink ? (
          <a
            className="timeline-more-link"
            href={cvLink.href}
            target="_blank"
            rel="noopener noreferrer"
            type="application/pdf"
          >
            <span className="timeline-more-mark">
              <Icon name="file" size={15} />
            </span>
            {more.linkLabel ?? cvLink.label}
            <Icon name="arrow" size={16} />
          </a>
        ) : null}
      </div>
    </div>
  );
}
