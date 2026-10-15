import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { CvBanner } from "@/components/cv-banner";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { Portfolio } from "@/components/portfolio";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  emailHref,
  getConnect,
  getCv,
  getProfile,
  getProjects,
  hasAbout,
  hasConnect,
  hasCv,
} from "@/lib/content";

export default async function Home() {
  const profile = getProfile();
  const connect = getConnect();
  const cv = getCv();
  const projects = await getProjects();

  return (
    <div className="site-shell">
      <JsonLd profile={profile} connect={connect} projects={projects.items} />
      <SiteHeader
        profile={profile}
        showAbout={hasAbout(profile)}
        showWork={projects.items.length > 0}
        showContact={hasConnect(connect)}
      />
      <main id="top">
        <Hero profile={profile} showWork={projects.items.length > 0} />
        <AboutSection profile={profile} />
        <ContactSection connect={connect} />
        {hasCv(cv) ? <CvBanner cv={cv} /> : null}
        <Portfolio projects={projects} />
      </main>
      <SiteFooter profile={profile} emailHref={emailHref(connect)} />
    </div>
  );
}
