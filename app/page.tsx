import { ServiceItem } from "@/lib/types";
import { mockServiceItems } from "@/lib/mock-data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUsSection from "@/components/SmashProcessSection";
import ServicesSection from "@/components/MenuSection";
import AboutSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export const dynamic = "force-dynamic";

async function getServiceItems(): Promise<ServiceItem[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project")) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("available", true)
        .order("category")
        .order("name");

      if (error || !data || data.length === 0) {
        return mockServiceItems;
      }

      return data as ServiceItem[];
    } catch (err) {
      console.error("Supabase error:", err);
      return mockServiceItems;
    }
  }

  return mockServiceItems;
}

export default async function HomePage() {
  const serviceItems = await getServiceItems();

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />
      <Hero />
      <WhyChooseUsSection />
      <ServicesSection items={serviceItems} />
      <AboutSection />
      <FAQSection />
      <BookingForm />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
