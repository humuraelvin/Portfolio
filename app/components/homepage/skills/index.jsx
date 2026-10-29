"use client";

import { skillGroups, skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import SectionHeading from "../../helper/section-heading";
import ScrollReveal from "../../helper/scroll-reveal";

const SkillChip = ({ skill }) => {
  const img = skillsImage(skill);
  return (
    <div className="skill-chip mx-2 flex items-center gap-3 rounded-full border border-line bg-card px-4 py-2.5 transition-colors duration-300 hover:border-fg/40">
      {img?.src && (
        <Image src={img.src} alt={skill} width={22} height={22} className="h-[22px] w-[22px] object-contain" />
      )}
      <span className="whitespace-nowrap text-sm font-medium text-fg/90">{skill}</span>
    </div>
  );
};

function Skills() {
  const half = Math.ceil(skillsData.length / 2);
  const rowA = skillsData.slice(0, half);
  const rowB = skillsData.slice(half);

  return (
    <section id="skills" className="section border-t border-line">
      <div className="container-x">
        <SectionHeading index="03" eyebrow="Skills" title="Tools I reach for." lead="A stack chosen for speed, reliability and clean code, from mobile UI to the database." />
      </div>

      <div className="mt-14 space-y-4">
        <div className="mask-fade-x marquee-mono">
          <Marquee gradient={false} speed={40} pauseOnHover autoFill>
            {rowA.map((s) => (
              <SkillChip key={s} skill={s} />
            ))}
          </Marquee>
        </div>
        <div className="mask-fade-x marquee-mono">
          <Marquee gradient={false} speed={36} direction="right" pauseOnHover autoFill>
            {rowB.map((s) => (
              <SkillChip key={s} skill={s} />
            ))}
          </Marquee>
        </div>
      </div>

      <div className="container-x mt-16">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {skillGroups.map((g, i) => (
            <ScrollReveal key={g.title} delay={i * 0.06} className="h-full">
              <div className="h-full bg-card p-6">
                <p className="eyebrow">
                  <span className="text-fg/60">0{i + 1}</span>
                  {g.title}
                </p>
                <ul className="mt-4 space-y-2">
                  {g.items.map((it) => (
                    <li key={it} className="text-sm text-fg/85">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
