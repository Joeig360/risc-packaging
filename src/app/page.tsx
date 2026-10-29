import { HeroSection } from "@/components/home/HeroSection";
import { CompleteSystemsSection } from "@/components/home/CompleteSystemsSection";
import { StartWithWhatYouHaveSection } from "@/components/home/StartWithWhatYouHaveSection";
import { FeaturedSkincareInnovationsSection } from "@/components/home/SkincareDiscoverySections";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  description: "Explore SOOYAN skincare and beauty products, private label, custom packaging, product development and project coordination.",
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedSkincareInnovationsSection />
      <CompleteSystemsSection />
      <StartWithWhatYouHaveSection />
    </>
  );
}
