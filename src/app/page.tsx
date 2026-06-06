import Hero from "@/components/home/Hero";
import FeaturedPosts from "@/components/home/FeaturedPosts";
import LatestPosts from "@/components/home/LatestPosts";
import Topics from "@/components/home/Topics";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPosts />
      <LatestPosts />
      <Topics />
    </>
  );
}
