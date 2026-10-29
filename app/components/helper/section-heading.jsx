"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

/**
 * Shared section header: numbered eyebrow, display title, optional lead text.
 */
const SectionHeading = ({ index, eyebrow, title, lead, align = "left", className = "" }) => {
  const centered = align === "center";
  return (
    <div className={`${centered ? "text-center mx-auto" : ""} max-w-3xl ${className}`}>
      <motion.span
        className={`eyebrow ${centered ? "justify-center" : ""}`}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease }}
      >
        {index && <span className="text-fg/60">{index}</span>}
        {index && <span className="h-px w-6 bg-line" />}
        {eyebrow}
      </motion.span>
      <motion.h2
        className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tightest leading-[1.02] text-fg"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: 0.05, ease }}
      >
        {title}
      </motion.h2>
      {lead && (
        <motion.p
          className="mt-5 text-base sm:text-lg text-muted leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          {lead}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
