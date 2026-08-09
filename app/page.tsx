import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { BlueprintTransition } from "@/components/sections/BlueprintTransition";
import { Portfolio } from "@/components/sections/Portfolio";
import { Approach } from "@/components/sections/Approach";
import { WhyPrimePlus } from "@/components/sections/WhyPrimePlus";
import { CallToAction } from "@/components/sections/CallToAction";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <About />
      <Services />
      <BlueprintTransition />
      <Portfolio />
      <Approach />
      <WhyPrimePlus />
      <CallToAction />
      <Contact />
    </>
  );
}
