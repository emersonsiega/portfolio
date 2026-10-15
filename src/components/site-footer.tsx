import { Icon } from "@/components/icons";
import type { ProfileContent } from "@/lib/content";

export function SiteFooter({
  profile,
  emailHref,
}: {
  profile: ProfileContent;
  emailHref?: string;
}) {
  return (
    <footer>
      <div>
        {profile.footerTitle ? <p>{profile.footerTitle}</p> : null}
        {emailHref && profile.footerLinkLabel ? (
          <a href={emailHref}>
            {profile.footerLinkLabel} <Icon name="arrow" size={18} />
          </a>
        ) : null}
      </div>
      <p>{`© ${new Date().getFullYear()} ${profile.name}. Made with care.`}</p>
    </footer>
  );
}
