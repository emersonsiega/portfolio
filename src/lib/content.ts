import connectJson from "../../content/connect.json";
import cvJson from "../../content/cv.json";
import profileJson from "../../content/profile.json";
import projectsJson from "../../content/projects.json";
import { hasPublicFile } from "@/lib/assets";

export type HeadlinePart = {
  text: string;
  emphasis?: boolean;
};

export type ProfileContent = {
  name: string;
  initials: string;
  title?: string;
  headlineParts: HeadlinePart[];
  headlineText?: string;
  aboutTitle?: string;
  aboutParagraphs: string[];
  photoSources: string[];
  ctaLabel?: string;
  footerTitle?: string;
  footerLinkLabel?: string;
  seoDescription: string;
};

export type ConnectItem = {
  type: string;
  label: string;
  value: string;
  href: string;
};

export type ConnectContent = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: ConnectItem[];
};

export type CvAction = {
  label: string;
  href: string;
  filename?: string;
};

export type CvContent = {
  eyebrow?: string;
  title?: string;
  description?: string;
  view?: CvAction;
  download?: CvAction;
};

export type ProjectLink = {
  href: string;
  label: string;
};

export type Project = {
  id: string;
  name: string;
  initials: string;
  featured?: boolean;
  startDate?: string;
  endDate?: string | null;
  area?: string;
  tech: string[];
  description?: string;
  keyContributions: string[];
  link?: ProjectLink;
  thumbnailSources: string[];
  accent: string;
};

export type ProjectsMore = {
  title: string;
  description?: string;
  linkLabel?: string;
};

export type ProjectsContent = {
  label?: string;
  title?: string;
  more?: ProjectsMore;
  items: Project[];
};

const DEFAULT_ACCENT = "#6d4aff";

function text(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function lines(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => text(item)).filter((item): item is string => item !== undefined);
  }

  return text(value)?.split("\n").map((line) => line.trim()).filter(Boolean) ?? [];
}

function publicSrc(file: string): string {
  if (file.startsWith("http://") || file.startsWith("https://") || file.startsWith("/")) {
    return file;
  }
  return `/${file}`;
}

function isRemote(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}

function localFileExists(file: string): boolean {
  return hasPublicFile(file.replace(/^\//, ""));
}

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return `${parts[0].slice(0, 1)}${parts[parts.length - 1].slice(0, 1)}`.toUpperCase();
}

export function parseHeadline(value?: string): HeadlinePart[] {
  if (!value) return [];
  const parts: HeadlinePart[] = [];
  const pattern = /\*([^*]+)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(value))) {
    if (match.index > lastIndex) {
      parts.push({ text: value.slice(lastIndex, match.index) });
    }
    parts.push({ text: match[1], emphasis: true });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < value.length) {
    parts.push({ text: value.slice(lastIndex) });
  }

  return parts;
}

export function paragraphsFrom(value?: string): string[] {
  if (!value) return [];
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function projectLinkLabel(href: string, label?: string): string {
  if (text(label)) return label!.trim();
  if (href.includes("apps.apple.com")) return "View in App Store";
  if (href.includes("play.google.com")) return "View on Play Store";
  return "Visit website";
}

function slugFromName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function appleIdFrom(href: string): string | undefined {
  return href.match(/\/id(\d+)/)?.[1];
}

async function appleArtwork(href: string): Promise<string | undefined> {
  const id = appleIdFrom(href);
  if (!id) return undefined;

  try {
    const response = await fetch(`https://itunes.apple.com/lookup?id=${id}`);
    if (!response.ok) return undefined;
    const data = (await response.json()) as {
      results?: { artworkUrl512?: string }[];
    };
    return text(data.results?.[0]?.artworkUrl512);
  } catch {
    return undefined;
  }
}

function photoSources(photo: { url?: string; fallback?: string } | undefined): string[] {
  const sources: string[] = [];
  const url = text(photo?.url);
  const fallback = text(photo?.fallback);

  if (url) sources.push(url);
  if (fallback) {
    const src = publicSrc(fallback);
    if (!sources.includes(src) && (isRemote(src) || localFileExists(fallback))) {
      sources.push(src);
    }
  }

  return sources;
}

export function getProfile(): ProfileContent {
  const raw = profileJson as {
    name?: string;
    photo?: { url?: string; fallback?: string };
    title?: string;
    headlineTitle?: string;
    headlineText?: string;
    aboutTitle?: string;
    aboutDescription?: string;
    ctaLabel?: string;
    footerTitle?: string;
    footerLinkLabel?: string;
  };

  const name = text(raw.name) ?? "Portfolio";
  const headlineText = text(raw.headlineText);
  const aboutParagraphs = paragraphsFrom(raw.aboutDescription);

  return {
    name,
    initials: initialsFromName(name),
    title: text(raw.title),
    headlineParts: parseHeadline(raw.headlineTitle),
    headlineText,
    aboutTitle: text(raw.aboutTitle),
    aboutParagraphs,
    photoSources: photoSources(raw.photo),
    ctaLabel: text(raw.ctaLabel),
    footerTitle: text(raw.footerTitle),
    footerLinkLabel: text(raw.footerLinkLabel),
    seoDescription: headlineText ?? aboutParagraphs[0] ?? name,
  };
}

export function getConnect(): ConnectContent {
  const raw = connectJson as {
    eyebrow?: string;
    title?: string;
    description?: string;
    items?: { type?: string; label?: string; value?: string; href?: string }[];
  };

  const items = (raw.items ?? [])
    .map((item) => {
      const href = text(item.href);
      const value = text(item.value);
      const label = text(item.label);
      if (!href || !value || !label) return undefined;
      return {
        type: text(item.type) ?? "link",
        label,
        value,
        href,
      };
    })
    .filter((item): item is ConnectItem => item !== undefined);

  return {
    eyebrow: text(raw.eyebrow),
    title: text(raw.title),
    description: text(raw.description),
    items,
  };
}

function cvAction(raw?: { label?: string; href?: string; filename?: string }): CvAction | undefined {
  const href = text(raw?.href);
  if (!href) return undefined;
  return {
    label: text(raw?.label) ?? "Open",
    href,
    filename: text(raw?.filename),
  };
}

export function getCv(): CvContent {
  const raw = cvJson as {
    eyebrow?: string;
    title?: string;
    description?: string;
    view?: { label?: string; href?: string };
    download?: { label?: string; href?: string; filename?: string };
  };

  return {
    eyebrow: text(raw.eyebrow),
    title: text(raw.title),
    description: text(raw.description),
    view: cvAction(raw.view),
    download: cvAction(raw.download),
  };
}

async function thumbnailSources(item: {
  thumbnail?: { url?: string; file?: string };
  link?: { href?: string };
}): Promise<string[]> {
  const sources: string[] = [];
  const url = text(item.thumbnail?.url);
  const file = text(item.thumbnail?.file);
  const href = text(item.link?.href);

  if (url) sources.push(url);
  if (file) {
    const src = publicSrc(file);
    if (!sources.includes(src) && (isRemote(src) || localFileExists(file))) {
      sources.push(src);
    }
  }

  if (href && appleIdFrom(href)) {
    const artwork = await appleArtwork(href);
    if (artwork && !sources.includes(artwork)) sources.push(artwork);
  }

  return sources;
}

export async function getProjects(): Promise<ProjectsContent> {
  const raw = projectsJson as {
    label?: string;
    title?: string;
    more?: { title?: string; description?: string; linkLabel?: string };
    items?: {
      id?: string;
      name?: string;
      featured?: boolean;
      start?: string;
      end?: string | null;
      area?: string;
      tech?: string[] | string;
      description?: string;
      keyContributions?: string[] | string;
      link?: { href?: string; label?: string };
      thumbnail?: { url?: string; file?: string };
      accent?: string;
    }[];
  };

  const items = await Promise.all(
    (raw.items ?? []).map(async (item) => {
      const name = text(item.name);
      if (!name) return undefined;

      const href = text(item.link?.href);
      const tech = Array.isArray(item.tech)
        ? item.tech.map((tag) => tag.trim()).filter(Boolean)
        : text(item.tech)?.split("·").map((tag) => tag.trim()).filter(Boolean) ?? [];

      const project: Project = {
        id: text(item.id) ?? slugFromName(name),
        name,
        initials: initialsFromName(name).slice(0, 1),
        featured: item.featured === true,
        startDate: text(item.start),
        endDate: item.end === undefined ? undefined : text(item.end as string) ?? null,
        area: text(item.area),
        tech,
        description: text(item.description),
        keyContributions: lines(item.keyContributions),
        link: href
          ? { href, label: projectLinkLabel(href, item.link?.label) }
          : undefined,
        thumbnailSources: await thumbnailSources(item),
        accent: text(item.accent) ?? DEFAULT_ACCENT,
      };

      return project;
    }),
  );

  const moreTitle = text(raw.more?.title);

  return {
    label: text(raw.label),
    title: text(raw.title),
    more: moreTitle
      ? {
          title: moreTitle,
          description: text(raw.more?.description),
          linkLabel: text(raw.more?.linkLabel),
        }
      : undefined,
    items: items.filter((item): item is Project => item !== undefined),
  };
}

export function hasAbout(profile: ProfileContent): boolean {
  return Boolean(profile.aboutTitle || profile.aboutParagraphs.length);
}

export function hasConnect(connect: ConnectContent): boolean {
  return connect.items.length > 0;
}

export function hasCv(cv: CvContent): boolean {
  return Boolean(cv.view || cv.download);
}

export function emailHref(connect: ConnectContent): string | undefined {
  return connect.items.find((item) => item.type === "email")?.href;
}
