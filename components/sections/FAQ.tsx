"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { faqs } from "@/lib/data";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQ() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="px-6 py-28">
      <div className="mx-auto max-w-2xl">
        <h2 data-reveal className="text-center font-display text-3xl md:text-5xl">
          FAQ
        </h2>

        <div data-reveal className="mt-12">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
