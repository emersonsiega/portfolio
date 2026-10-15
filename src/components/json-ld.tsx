import type { ConnectContent, ProfileContent, Project } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export function JsonLd({
  profile,
  connect,
  projects,
}: {
  profile: ProfileContent;
  connect: ConnectContent;
  projects: Project[];
}) {
  const email = connect.items.find((item) => item.type === "email");
  const phone = connect.items.find(
    (item) => item.type === "whatsapp" || item.type === "phone",
  );
  const linkedin = connect.items.find((item) => item.type === "linkedin");

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    jobTitle: profile.title,
    description: profile.seoDescription,
    email: email?.href,
    telephone: phone?.value,
    sameAs: linkedin ? [linkedin.href] : undefined,
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${profile.name} app portfolio`,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.name,
      url: project.link?.href,
      description: [project.area, ...project.tech].filter(Boolean).join(" · "),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      {projects.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
        />
      ) : null}
    </>
  );
}
