import { HomepageV3 } from "@/components/home/v3/HomepageV3";
import { createMetadata } from "@/lib/seo";
import { getPilotHeroImage } from "@/lib/sanity-hero-pilot";

export const metadata = createMetadata({
  description: "Explore SOOYAN skincare and beauty products, private label, custom packaging, product development and project coordination.",
});

export default async function Home() {
  return <HomepageV3 heroImage={await getPilotHeroImage()} />;
}
