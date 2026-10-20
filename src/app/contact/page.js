import { PageHeader, Section } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { GithubIcon, LinkedinIcon, CodeIcon, MailIcon, DownloadIcon } from "@/components/Icons";
import { SITE } from "@/data/site";

export const metadata = { title: "Contact", description: "Contact Vignesh T about full-stack developer internships, jobs or projects." };

export default function Contact() {
  const links = [
    { label: "Email", href: `mailto:${SITE.email}`, Icon: MailIcon, text: SITE.email },
    { label: "GitHub", href: SITE.socials.github.href, Icon: GithubIcon, text: SITE.socials.github.user },
    { label: "LinkedIn", href: SITE.socials.linkedin.href, Icon: LinkedinIcon, text: "vignesh-t-web-dev" },
    { label: "LeetCode", href: SITE.socials.leetcode.href, Icon: CodeIcon, text: SITE.socials.leetcode.user },
  ];
  const row = "flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition hover:border-accent";
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's work together" crumbs={[["/", "Home"], [null, "Contact"]]}>I&apos;m looking for a full-stack developer role. Send a message or reach me on any profile below.</PageHeader>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <ul className="space-y-3">
              {links.map(({ label, href, Icon, text }) => (
                <li key={label}><a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={row}><span className="grid h-10 w-10 place-items-center rounded-full bg-surface-2 text-accent"><Icon /></span><span><span className="block text-xs text-muted">{label}</span><span className="break-all text-sm font-medium">{text}</span></span></a></li>
              ))}
              <li><a href={SITE.resume} download="Vignesh-T-Resume.pdf" className={row}><span className="grid h-10 w-10 place-items-center rounded-full bg-surface-2 text-accent"><DownloadIcon /></span><span><span className="block text-xs text-muted">Resume</span><span className="text-sm font-medium">Download PDF</span></span></a></li>
            </ul>
          </Reveal>
          <Reveal delay={0.08}><ContactForm /></Reveal>
        </div>
      </Section>
    </>
  );
}
