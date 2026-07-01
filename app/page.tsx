import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/hero/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PlatformHighlights from "@/components/home/PlatformHighlights";
import PriceCenter from "@/components/home/pricing/PriceCenter";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PlatformHighlights />
        <PriceCenter />
        <Categories />
        <FeaturedProducts />
      </main>
    </>
  );
}
