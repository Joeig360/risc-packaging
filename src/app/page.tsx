import { ExplorePackagingSection } from "@/components/home/ExplorePackagingSection";
import { FeaturedPackagingSystemsSection } from "@/components/home/FeaturedPackagingSystemsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { CompleteSystemsSection } from "@/components/home/CompleteSystemsSection";
import { ImprovePackagingSection } from "@/components/home/ImprovePackagingSection";
import { PeptideFeatureSection } from "@/components/home/PeptideFeatureSection";
import { StartWithWhatYouHaveSection } from "@/components/home/StartWithWhatYouHaveSection";
import { createMetadata } from "@/lib/seo";
export const metadata = createMetadata({ description: "RISC is a packaging development and supply chain partner for complex packaging systems." });
export default function Home(){return <><HeroSection/><ExplorePackagingSection/><FeaturedPackagingSystemsSection/><PeptideFeatureSection/><CompleteSystemsSection/><CapabilitiesSection/><ImprovePackagingSection/><StartWithWhatYouHaveSection/></>}
