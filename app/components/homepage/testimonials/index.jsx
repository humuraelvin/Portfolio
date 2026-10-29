"use client";

import { testimonialsData } from "@/utils/data/testimonials-data";
import SectionHeading from "../../helper/section-heading";
import TestimonialCard from "./testimonial-card";

const Testimonials = () => {
  return (
    <section id="testimonials" className="section border-t border-line">
      <div className="container-x">
        <SectionHeading index="05" eyebrow="Testimonials" title="Kind words." lead="What teammates and clients say about working together." />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {testimonialsData.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
