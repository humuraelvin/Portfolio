"use client";

import { personalData } from "@/utils/data/personal-data";
import { motion } from "framer-motion";
import { FiCode, FiShield, FiSmartphone } from "react-icons/fi";
import SectionHeading from "../../helper/section-heading";
import ScrollReveal from "../../helper/scroll-reveal";

const icons = [<FiSmartphone key="m" />, <FiCode key="c" />, <FiShield key="s" />];

const AboutSection = () => {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHeading index="01" eyebrow="About" title="Engineer by craft, builder by instinct." />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Narrative */}
          <div className="lg:col-span-7">
            <div className="space-y-5 text-base leading-relaxed text-fg/85 sm:text-lg">
              {personalData.aboutMe.map((p, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <p>{p}</p>
                </ScrollReveal>
              ))}
            </div>

            {/* Services */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {personalData.services.map((s, i) => (
                <ScrollReveal key={s.title} delay={0.1 + i * 0.08}>
                  <div className="card-surface group h-full p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-bg text-fg transition-colors duration-300 group-hover:bg-fg group-hover:text-bg">
                      {icons[i]}
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-2">
                {personalData.interests.map((it) => (
                  <span key={it} className="chip">
                    {it}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Stats */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
              {personalData.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-card p-6 sm:p-8"
                >
                  <p className="font-display text-4xl font-semibold tracking-tightest sm:text-5xl">{stat.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <ScrollReveal delay={0.25}>
              <div className="card-surface mt-4 flex items-center justify-between p-5">
                <div>
                  <p className="eyebrow">Status</p>
                  <p className="mt-1 font-display text-sm font-semibold">Available for Android, iOS &amp; full-stack roles</p>
                </div>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fg opacity-50" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fg" />
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
