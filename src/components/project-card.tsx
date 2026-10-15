import { useId, useState } from "react";
import { Icon } from "@/components/icons";
import type { Project } from "@/lib/content";
import { formatDateRange } from "@/lib/dates";

export function ProjectCard({ project }: { project: Project }) {
  const dateRange = formatDateRange(project);
  const hasMeta = Boolean(project.featured || dateRange || project.area);
  const classes = [
    "project-card",
    "timeline-card",
    project.featured ? "featured-card" : "",
    project.link ? "" : "no-link",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes} id={project.id}>
      <div className="project-copy">
        {hasMeta ? (
          <div className="project-meta">
            {project.featured ? (
              <span className="featured-kicker">
                <Icon name="star" size={11} />
                Featured Project
              </span>
            ) : null}
            {dateRange ? <time>{dateRange}</time> : null}
            {project.area ? <span>{project.area}</span> : null}
          </div>
        ) : null}
        <h3>{project.name}</h3>
        {project.description ? (
          <p className="whitespace-pre-line">{project.description}</p>
        ) : null}
        {project.keyContributions.length > 0 ? (
          <CollapsibleContributions
            items={project.keyContributions}
            projectName={project.name}
            defaultOpen={Boolean(project.featured)}
          />
        ) : null}
        {project.tech.length > 0 ? (
          <div className="tags">
            {project.tech.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}
      </div>
      {project.link ? (
        <a
          className="project-link"
          href={project.link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.link.label}: ${project.name}`}
        >
          <span>{project.link.label}</span>
          <Icon name="arrow" size={18} />
        </a>
      ) : null}
    </article>
  );
}

function ContributionsList({ items }: { items: string[] }) {
  return (
    <div className="project-contributions">
      <h4>Key contributions</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function CollapsibleContributions({
  items,
  projectName,
  defaultOpen,
}: {
  items: string[];
  projectName: string;
  defaultOpen: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="contributions-disclosure">
      <div
        className={`contributions-collapse${expanded ? " is-open" : ""}`}
        id={panelId}
        role="region"
        aria-label={`${projectName} key contributions`}
        aria-hidden={!expanded}
        inert={!expanded}
      >
        <div className="contributions-collapse-inner">
          <ContributionsList items={items} />
        </div>
      </div>
      <button
        type="button"
        className="contributions-toggle"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((open) => !open)}
      >
        <span>{expanded ? "Show less" : "See contributions"}</span>
        <Icon name="chevron" size={16} />
        <span className="sr-only"> for {projectName}</span>
      </button>
    </div>
  );
}
