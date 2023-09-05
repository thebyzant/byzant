import type { NextPage } from "next";
import { Benefits } from "~~/components/Benefits";
import { Faq } from "~~/components/Faq";
import { Hero } from "~~/components/Hero";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <Hero />
      <Benefits />
      <Faq />
    </>
  );
};

export default Home;
