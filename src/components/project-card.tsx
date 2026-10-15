import { Icon } from "@/components/icons";
import { ProjectIcon } from "@/components/project-icon";
import type { Project } from "@/lib/content";
import { formatDateRange } from "@/lib/dates";

export function ProjectCard({
  project,
  timeline,
}: {
  project: Project;
  timeline: boolean;
}) {
  const dateRange = formatDateRange(project);
  const hasMeta = Boolean(dateRange || project.area);

  return (
    <article
      className={`project-card ${timeline ? "timeline-card" : ""}${project.link ? "" : " no-link"}`}
    >
      {!timeline && <ProjectIcon project={project} />}
      <div className="project-copy">
        {hasMeta ? (
          <div className="project-meta">
            {dateRange ? <time>{dateRange}</time> : null}
            {project.area ? <span>{project.area}</span> : null}
          </div>
        ) : null}
        <h3>{project.name}</h3>
        {project.description ? <p>{project.description}</p> : null}
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
