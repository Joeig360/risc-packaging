import { HomepageV3 } from "@/components/home/v3/HomepageV3";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  description: "Explore SOOYAN skincare and beauty products, private label, custom packaging, product development and project coordination.",
});

export default function Home() {
  return <HomepageV3 />;
}
