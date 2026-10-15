import { Icon } from "@/components/icons";
import type { CvContent } from "@/lib/content";

export function CvBanner({ cv }: { cv: CvContent }) {
  if (!cv.view && !cv.download) {
    return null;
  }

  return (
    <section className="cv-banner" aria-labelledby={cv.title ? "cv-heading" : undefined}>
      <div className="cv-mark" aria-hidden="true">
        <Icon name="file" size={29} />
      </div>
      <div>
        {cv.eyebrow ? <p className="eyebrow">{cv.eyebrow}</p> : null}
        {cv.title ? <h2 id="cv-heading">{cv.title}</h2> : null}
      </div>
      <div className="cv-actions">
        {cv.view ? (
          <a href={cv.view.href} target="_blank" rel="noopener noreferrer">
            {cv.view.label} <Icon name="arrow" size={19} />
          </a>
        ) : null}
        {cv.download ? (
          <a href={cv.download.href} download={cv.download.filename}>
            {cv.download.label} <Icon name="download" size={19} />
          </a>
        ) : null}
      </div>
    </section>
  );
}
