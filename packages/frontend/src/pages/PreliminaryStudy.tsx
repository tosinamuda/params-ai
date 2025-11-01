import Hero from "@/features/Home/components/Hero";
import { OnboardingItems } from "@/features/Home/components/OnboardingItems";
import { Footer } from "@/layouts/Footer";
import Header from "@/layouts/Header";

const PreliminaryStudy = () => {
  return (
    <>
      <Header />
      <Hero title="Preliminary Study" showCTA={false} />

      <div className="w-full">
        <iframe
          className="w-full h-screen bg-white no-scrollbar overflow-none"
          src="https://docs.google.com/forms/d/e/1FAIpQLSddOH6XkE-tpNCoEs4t5P-XBUhaY99xrxPgov8J2akz7GL2Hw/viewform?embedded=true"
        >
          Loading…
        </iframe>
      </div>

      <section className="h-16 bg-primary-300"></section>

      <OnboardingItems />
      <Footer></Footer>
    </>
  );
};
export default PreliminaryStudy;
