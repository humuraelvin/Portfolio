"use client";

import { personalData } from "@/utils/data/personal-data";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiArrowDown, FiArrowUpRight, FiDownload } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

const ease = [0.22, 1, 0.36, 1];

const socials = [
  { name: "GitHub", icon: <FaGithub size={17} />, url: personalData.socialMedia.github },
  { name: "LinkedIn", icon: <FaLinkedinIn size={17} />, url: personalData.socialMedia.linkedin },
  { name: "X", icon: <FaXTwitter size={16} />, url: personalData.socialMedia.twitter },
  { name: "Instagram", icon: <FaInstagram size={17} />, url: personalData.socialMedia.instagram },
  { name: "LeetCode", icon: <SiLeetcode size={16} />, url: personalData.socialMedia.leetcode },
];

const RotatingRole = ({ roles }) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, [roles.length]);

  return (
    <span className="relative inline-block h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[i]}
          className="inline-block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

function HeroSection() {
  const [first, last] = [personalData.firstName, personalData.lastName];

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-y opacity-70" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--fg)/0.07),transparent)]" />
      </div>

      <div className="container-x">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="eyebrow"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fg opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-fg" />
              </span>
              {personalData.availability} · {personalData.location}
            </motion.div>

            <h1 className="mt-6 font-display text-[13vw] font-semibold leading-[0.92] tracking-tightest sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease }}
                >
                  {first}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-muted"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25, ease }}
                >
                  {last}.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease }}
              className="mt-6 font-display text-xl font-medium tracking-tight text-fg sm:text-2xl"
            >
              <RotatingRole roles={personalData.roles} />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease }}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {personalData.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href="#contact" className="btn btn-solid group">
                Let&apos;s talk
                <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a href={personalData.resume} download={personalData.resumeFileName} className="btn btn-outline group">
                <FiDownload className="transition-transform duration-300 group-hover:translate-y-0.5" />
                Download CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 flex items-center gap-2"
            >
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="icon-btn"
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:col-span-5 lg:ml-auto lg:mr-0"
          >
            <div className="group relative aspect-square overflow-hidden rounded-[2rem] border border-line bg-card shadow-lift">
              <Image
                src={personalData.profile}
                alt={personalData.name}
                fill
                priority
                sizes="360px"
                quality={90}
                className="mono-img object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />

              {/* Floating label */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="rounded-2xl border border-line bg-bg/90 px-4 py-3">
                  <p className="font-display text-sm font-semibold">{personalData.name}</p>
                  <p className="text-xs text-muted">{personalData.designation}</p>
                </div>
                <div className="hidden rounded-2xl border border-line bg-bg/90 px-3 py-2 text-right sm:block">
                  <p className="font-display text-lg font-semibold leading-none">20+</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-muted">projects</p>
                </div>
              </div>
            </div>

            {/* Orbit ring decoration */}
            <div className="pointer-events-none absolute -right-6 -top-6 hidden h-28 w-28 animate-spin-slow rounded-full border border-dashed border-line lg:block" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 hidden h-40 w-40 rounded-full bg-dots opacity-70 lg:block" />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted sm:mt-20"
        >
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <FiArrowDown />
          </motion.span>
          Scroll
        </motion.div>
      </div>

      {/* Marquee strip */}
      <div className="mt-10 border-y border-line bg-card/40 py-4">
        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-sm font-medium uppercase tracking-[0.25em] text-muted">
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex gap-10">
                {["Mobile Apps", "Full-Stack Web", "Backend APIs", "Cybersecurity", "Flutter", "Next.js", "Spring Boot", "Node.js", "Open Source"].map(
                  (t) => (
                    <span key={t} className="flex items-center gap-10">
                      {t}
                      <span className="h-1 w-1 rounded-full bg-fg/40" />
                    </span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

export default HeroSection;
