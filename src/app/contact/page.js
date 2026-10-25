import { PageHeader, Section } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import CopyEmail from "@/components/CopyEmail";
import Reveal from "@/components/Reveal";
import { GithubIcon, LinkedinIcon, CodeIcon, DownloadIcon, ArrowUpRightIcon } from "@/components/Icons";
import { SITE } from "@/data/site";

export const metadata = { title: "Contact", description: "Contact Vignesh T about full-stack developer internships, jobs or projects." };

export default function Contact() {
  const links = [
    { label: "GitHub", href: SITE.socials.github.href, Icon: GithubIcon, text: SITE.socials.github.user },
    { label: "LinkedIn", href: SITE.socials.linkedin.href, Icon: LinkedinIcon, text: "vignesh-t-web-dev" },
    { label: "LeetCode", href: SITE.socials.leetcode.href, Icon: CodeIcon, text: SITE.socials.leetcode.user },
  ];
  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in *touch*" crumbs={[["/", "Home"], [null, "Contact"]]}>I&apos;m looking for a full-stack developer role. Send a message, or reach me directly.</PageHeader>
      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal from="left">
            <CopyEmail large />
            <ul className="mt-8 border-t border-line">
              {links.map(({ label, href, Icon, text }) => (
                <li key={label} className="border-b border-line">
                  <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-5 transition-all hover:pl-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-line-2 text-accent"><Icon /></span>
                    <span><span className="eyebrow block text-muted">{label}</span><span className="break-all font-medium">{text}</span></span>
                    <ArrowUpRightIcon className="ml-auto text-muted transition group-hover:text-accent" /><span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li className="border-b border-line">
                <a href={SITE.resume} download="Vignesh-T-Resume.pdf" className="group flex items-center gap-4 py-5 transition-all hover:pl-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-line-2 text-accent"><DownloadIcon /></span>
                  <span><span className="eyebrow block text-muted">Résumé</span><span className="font-medium">Download PDF</span></span>
                </a>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.1}><ContactForm /></Reveal>
        </div>
      </Section>
    </>
  );
}
