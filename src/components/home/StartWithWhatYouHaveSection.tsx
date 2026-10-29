import { Button } from "@/components/ui/button";
import { inquiryHref } from "@/lib/inquiry-links";

export function StartWithWhatYouHaveSection() {
  return (
    <section className="bg-graphite py-14 text-paper md:py-20">
      <div className="mx-auto max-w-[var(--container-content)] px-[var(--page-gutter)] text-center">
        <p className="text-xs tracking-[.14em] text-silver">LET’S START A CONVERSATION</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-[1.1] md:text-5xl">What’s next for your brand?</h2>
        <p className="mx-auto mt-5 max-w-lg leading-7 text-silver">Share a product idea, a packaging reference or your project requirements. Start with what you have.</p>
        <Button href={inquiryHref({ inquiryType: "start-project", sourceUrl: "/" })} className="mt-7 border border-silver hover:border-paper">START A PROJECT</Button>
      </div>
    </section>
  );
}
