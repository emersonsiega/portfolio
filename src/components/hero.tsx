import { FallbackImage } from "@/components/fallback-image";
import { Icon } from "@/components/icons";
import type { ProfileContent } from "@/lib/content";

export function Hero({
  profile,
  showWork,
}: {
  profile: ProfileContent;
  showWork: boolean;
}) {
  const hasHeadline = profile.headlineParts.length > 0;

  return (
    <section className="hero" aria-labelledby={hasHeadline ? "intro-heading" : undefined}>
      <div className="hero-art">
        <div className="portrait-ring">
          <FallbackImage
            sources={profile.photoSources}
            alt={profile.name}
            fallback={
              <div className="portrait-fallback" aria-label={profile.name}>
                {profile.initials}
              </div>
            }
          />
        </div>
      </div>
      <div className="hero-copy">
        {profile.title ? <p className="eyebrow">{profile.title}</p> : null}
        {hasHeadline ? (
          <h1 id="intro-heading">
            {profile.headlineParts.map((part, index) =>
              part.emphasis ? <em key={index}>{part.text}</em> : part.text,
            )}
          </h1>
        ) : null}
        {profile.headlineText ? (
          <p className="hero-description">{profile.headlineText}</p>
        ) : null}
        {profile.ctaLabel && showWork ? (
          <a className="primary-cta" href="#work">
            {profile.ctaLabel} <Icon name="arrow" />
          </a>
        ) : null}
      </div>
    </section>
  );
}
