"use client";

import { experiences } from "@/utils/data/experience";
import { motion } from "framer-motion";
import SectionHeading from "../../helper/section-heading";

const ease = [0.22, 1, 0.36, 1];

function Experience() {
  return (
    <section id="experience" className="section border-t border-line">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading index="02" eyebrow="Experience" title="Where I've worked." />
          <p className="max-w-sm text-sm text-muted lg:text-right">
            Product teams, public sector and startups. Mobile, web and backend, end to end.
          </p>
        </div>

        <div className="relative mt-16">
          {/* vertical rail */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-1/2 md:-translate-x-1/2" />

          <ol className="space-y-12 md:space-y-20">
            {experiences.map((exp, i) => {
              const right = i % 2 === 1;
              return (
                <li key={exp.id} className="relative md:grid md:grid-cols-2 md:gap-16">
                  {/* dot */}
                  <span className="absolute left-0 top-2 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-line bg-bg md:left-1/2 md:-translate-x-1/2">
                    <span className="h-[7px] w-[7px] rounded-full bg-fg" />
                  </span>

                  {/* period (desktop opposite side) */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.6, ease }}
                    className={`hidden md:block ${right ? "md:order-2 md:text-left" : "md:text-right"}`}
                  >
                    <p className="font-display text-2xl font-semibold tracking-tight text-fg">{exp.duration}</p>
                    <p className="mt-1 text-sm text-muted">
                      {exp.type} · {exp.location}
                    </p>
                  </motion.div>

                  {/* card */}
                  <motion.article
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.7, delay: 0.08, ease }}
                    className={`card-surface ml-8 p-6 sm:p-8 md:ml-0 ${right ? "md:order-1" : ""}`}
                  >
                    <p className="eyebrow md:hidden">{exp.duration}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold tracking-tight sm:text-2xl md:mt-0">
                      {exp.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-fg/80">{exp.company}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{exp.description}</p>

                    {exp.highlights?.length > 0 && (
                      <ul className="mt-5 space-y-2.5">
                        {exp.highlights.map((h, k) => (
                          <li key={k} className="flex gap-3 text-sm text-fg/85">
                            <span className="mt-[9px] h-px w-4 shrink-0 bg-fg/50" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.tags?.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {exp.tags.map((t) => (
                          <span key={t} className="chip">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Experience;
