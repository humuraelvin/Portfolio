"use client";

import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  const year = new Date().getFullYear();

  const links = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socials = [
    { name: "GitHub", icon: <FaGithub />, url: personalData.socialMedia.github },
    { name: "LinkedIn", icon: <FaLinkedinIn />, url: personalData.socialMedia.linkedin },
    { name: "X", icon: <FaXTwitter />, url: personalData.socialMedia.twitter },
    { name: "Instagram", icon: <FaInstagram />, url: personalData.socialMedia.instagram },
    { name: "LeetCode", icon: <SiLeetcode />, url: personalData.socialMedia.leetcode },
  ];

  return (
    <footer className="relative mt-10 border-t border-line">
      <div className="container-x pt-16 pb-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Link href="/" className="font-display text-2xl font-semibold tracking-tight">
              {personalData.firstName}
              <span className="text-muted">.</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{personalData.tagline}</p>
            <a
              href={`mailto:${personalData.email}`}
              className="link-underline mt-6 inline-flex items-center gap-1 font-medium text-fg"
            >
              {personalData.email}
              <FiArrowUpRight />
            </a>
          </div>

          <div className="md:col-span-3">
            <h4 className="eyebrow">Navigate</h4>
            <ul className="mt-4 space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-sm text-fg/80 hover:text-fg">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="eyebrow">Elsewhere</h4>
            <ul className="mt-4 space-y-2">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-2 text-sm text-fg/80 hover:text-fg"
                  >
                    <span className="text-muted">{s.icon}</span>
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="mt-16 select-none overflow-hidden">
          <p className="text-outline whitespace-nowrap font-display text-[16vw] font-bold leading-none tracking-tightest md:text-[11vw]">
            {personalData.name.toUpperCase()}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 pb-16 text-xs text-muted sm:flex-row sm:items-center sm:pb-0">
          <p>
            &copy; {year} {personalData.name}. All rights reserved.
          </p>
          <p>Designed &amp; built in {personalData.location}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
