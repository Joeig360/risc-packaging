import { HomepageV3 } from "@/components/home/v3/HomepageV3";
import { createMetadata } from "@/lib/seo";
import { getHomeHero } from "@/lib/sanity-home-hero";
import { connection } from "next/server";

export const metadata = createMetadata({
  description: "Explore SOOYAN skincare and beauty products, private label, custom packaging, product development and project coordination.",
});

export default async function Home() {
  await connection();
  return <HomepageV3 hero={await getHomeHero()} />;
}
