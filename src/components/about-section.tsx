import type { ProfileContent } from "@/lib/content";

export function AboutSection({ profile }: { profile: ProfileContent }) {
  if (!profile.aboutTitle && profile.aboutParagraphs.length === 0) {
    return null;
  }

  return (
    <section className="about-section" id="about">
      <div className="section-label">
        <span>01</span>
        <p>About me</p>
      </div>
      <div className="about-content">
        {profile.aboutTitle ? <h2>{profile.aboutTitle}</h2> : null}
        {profile.aboutParagraphs.length > 0 ? (
          <div className="about-copy">
            {profile.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
