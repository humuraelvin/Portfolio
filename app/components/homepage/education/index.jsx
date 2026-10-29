"use client";

import { certifications, educationData } from "@/utils/data/education-data";
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import SectionHeading from "../../helper/section-heading";
import ScrollReveal from "../../helper/scroll-reveal";

const ease = [0.22, 1, 0.36, 1];

function Education() {
  return (
    <section id="education" className="section border-t border-line">
      <div className="container-x">
        <SectionHeading index="06" eyebrow="Education" title="Where I learned." />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <ol className="relative space-y-4 lg:col-span-8">
            {educationData.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="card-surface group grid grid-cols-1 gap-4 p-6 sm:grid-cols-[140px_1fr] sm:p-8"
              >
                <div>
                  <p className="font-display text-lg font-semibold tracking-tight">{item.period}</p>
                  {item.location && <p className="mt-1 text-xs text-muted">{item.location}</p>}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{item.institution}</h3>
                  <p className="mt-1 text-sm font-medium text-fg/80">{item.degree}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>

          <div className="lg:col-span-4">
            <ScrollReveal delay={0.15}>
              <div className="card-surface p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-fg text-bg">
                    <FiAward size={16} />
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight">Certifications</h3>
                </div>
                <ul className="mt-6 space-y-3">
                  {certifications.map((c) => (
                    <li key={c} className="flex gap-3 text-sm text-fg/85">
                      <span className="mt-[9px] h-px w-4 shrink-0 bg-fg/50" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
