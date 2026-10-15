import { ThemeToggle } from "@/components/theme-toggle";
import type { ProfileContent } from "@/lib/content";

export function SiteHeader({
  profile,
  showAbout,
  showWork,
  showContact,
}: {
  profile: ProfileContent;
  showAbout: boolean;
  showWork: boolean;
  showContact: boolean;
}) {
  return (
    <header className="topbar">
      <a className="wordmark" href="#top" aria-label={`${profile.name}, home`}>
        <span>{profile.initials}</span>
        {profile.name}
      </a>
      <nav aria-label="Primary navigation">
        {showAbout ? <a href="#about">About</a> : null}
        {showWork ? <a href="#work">Work</a> : null}
        {showContact ? <a href="#contact">Contact</a> : null}
      </nav>
      <ThemeToggle />
    </header>
  );
}
