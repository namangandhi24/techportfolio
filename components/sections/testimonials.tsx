"use client";

import { Section } from "@/components/layout/section";
import { SectionReveal } from "@/components/motion/section-reveal";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      label="Testimonials"
      title="What collaborators say"
      description="Recommendations from collaborators at GLA University and E-Cell."
      className="!pb-16"
    >
      <SectionReveal>
        <TestimonialsCarousel />
      </SectionReveal>
    </Section>
  );
}
