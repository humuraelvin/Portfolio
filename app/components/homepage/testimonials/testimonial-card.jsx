"use client";

import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa6";

const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");

const TestimonialCard = ({ testimonial, index = 0 }) => {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="card-surface flex h-full flex-col p-6 sm:p-8"
    >
      <FaQuoteLeft className="text-fg/30" size={20} />
      <blockquote className="mt-5 flex-1 text-base leading-relaxed text-fg/90">
        &ldquo;{testimonial.testimonial}&rdquo;
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fg font-display text-sm font-semibold text-bg">
          {initials(testimonial.name)}
        </span>
        <div>
          <p className="font-display text-sm font-semibold">{testimonial.name}</p>
          <p className="text-xs text-muted">{testimonial.position}</p>
        </div>
      </figcaption>
    </motion.figure>
  );
};

export default TestimonialCard;
