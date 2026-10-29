"use client";

import { personalData } from "@/utils/data/personal-data";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiArrowUpRight, FiMail, FiMapPin } from "react-icons/fi";
import SectionHeading from "../../helper/section-heading";
import ScrollReveal from "../../helper/scroll-reveal";
import ContactForm from "./contact-form";

const ContactSection = () => {
  const socials = [
    { name: "GitHub", icon: <FaGithub size={16} />, url: personalData.socialMedia.github },
    { name: "LinkedIn", icon: <FaLinkedinIn size={16} />, url: personalData.socialMedia.linkedin },
    { name: "X", icon: <FaXTwitter size={15} />, url: personalData.socialMedia.twitter },
    { name: "Instagram", icon: <FaInstagram size={16} />, url: personalData.socialMedia.instagram },
  ];

  return (
    <section id="contact" className="section border-t border-line">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading index="07" eyebrow="Contact" title="Let's build something." lead="Have a project, a role or an idea? My inbox is open." />

            <div className="mt-10 space-y-4">
              <ScrollReveal delay={0.05}>
                <a href={`mailto:${personalData.email}`} className="card-surface group flex items-center justify-between p-5">
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-bg transition-colors duration-300 group-hover:bg-fg group-hover:text-bg">
                      <FiMail size={16} />
                    </span>
                    <div>
                      <p className="eyebrow">Email</p>
                      <p className="mt-0.5 text-sm font-medium">{personalData.email}</p>
                    </div>
                  </div>
                  <FiArrowUpRight className="text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="card-surface flex items-center gap-4 p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-bg">
                    <FiMapPin size={16} />
                  </span>
                  <div>
                    <p className="eyebrow">Based in</p>
                    <p className="mt-0.5 text-sm font-medium">{personalData.location}</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="flex items-center gap-2 pt-2">
                  {socials.map((s) => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="icon-btn">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
