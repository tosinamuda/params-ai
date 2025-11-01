import promptStudioAnimation from "@/assets/studio.lottie.json";
import Hero from "@/features/Home/components/Hero";
import Header from "@/layouts/Header";
import Lottie from "lottie-react";
import { OnboardingItems } from "../features/Home/components/OnboardingItems";
import { Footer } from "../layouts/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <section className="bg-violet-100">
        <div className="p-4 lg:p-16">
          <div className="rounded-sm shadow-2xl">
            <Lottie animationData={promptStudioAnimation} loop={true} />
          </div>
        </div>
      </section>
      <OnboardingItems />
      <Footer></Footer>
    </>
  );
};

export default Home;
