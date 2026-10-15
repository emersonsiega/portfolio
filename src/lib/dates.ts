import type { Project } from "@/lib/content";

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatMonth(value: string): string {
  const [year, month] = value.split("-").map(Number);
  return monthFormatter.format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatDateRange(project: Project): string | undefined {
  if (!project.startDate) return undefined;
  const start = formatMonth(project.startDate);
  if (!project.endDate) {
    return `${start} – Current`;
  }
  return `${start} – ${formatMonth(project.endDate)}`;
}

export type SortDirection = "newest" | "oldest";

export function sortProjects(
  items: Project[],
  direction: SortDirection,
): Project[] {
  const indexed = items.map((project, index) => ({ project, index }));

  indexed.sort((a, b) => {
    const aStart = a.project.startDate ?? "";
    const bStart = b.project.startDate ?? "";
    const start = aStart.localeCompare(bStart);
    if (start !== 0) {
      return direction === "newest" ? -start : start;
    }

    const aEnd = a.project.endDate ?? "9999-12";
    const bEnd = b.project.endDate ?? "9999-12";
    const end = aEnd.localeCompare(bEnd);
    if (end !== 0) {
      return direction === "newest" ? -end : end;
    }

    return direction === "newest" ? a.index - b.index : b.index - a.index;
  });

  return indexed.map((entry) => entry.project);
}
