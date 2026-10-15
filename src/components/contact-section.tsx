import { Icon, type IconName } from "@/components/icons";
import type { ConnectContent } from "@/lib/content";

const icons: Record<string, IconName> = {
  email: "email",
  whatsapp: "phone",
  phone: "phone",
  linkedin: "linkedin",
};

export function ContactSection({ connect }: { connect: ConnectContent }) {
  if (connect.items.length === 0) {
    return null;
  }

  return (
    <section className="contact-section" id="contact">
      <div className="section-heading">
        <div>
          {connect.eyebrow ? <p className="eyebrow">{connect.eyebrow}</p> : null}
          {connect.title ? <h2>{connect.title}</h2> : null}
        </div>
        {connect.description ? <p>{connect.description}</p> : null}
      </div>
      <div className="contact-grid">
        {connect.items.map((item) => {
          const icon = icons[item.type] ?? "arrow";
          const external = item.href.startsWith("http");

          return (
            <a
              key={`${item.type}-${item.href}`}
              href={item.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              <span className="contact-icon">
                <Icon name={icon} />
              </span>
              <span>
                <small>{item.label}</small>
                {item.value}
              </span>
              <Icon name="arrow" size={19} />
            </a>
          );
        })}
      </div>
    </section>
  );
}
