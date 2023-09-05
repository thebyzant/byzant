import type { NextPage } from "next";
import { Header } from "~~/components/Header-testnet";
import { MetaHeader } from "~~/components/MetaHeader";
//import { Swap } from "~~/components/Swap";
import { BUSDC } from "~~/components/contract-interactions/BUSDC-approve-allow";
import { BUSDCreq } from "~~/components/contract-interactions/BUSDC-request";
import { BYTex } from "~~/components/contract-interactions/BYT-exchange";

const Trade: NextPage = () => {
  return (
    <>
      <Header />
      <MetaHeader title="Get BYT" description="Trade USDC/USDT for BYT">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid h-screen place-items-center">
        <div className="w-full p-2 bg-primary border border-gray-200 rounded-[20px] shadow-md lg:max-w-md text-center">
          <BUSDCreq />
          <BUSDC />
          <BYTex />
        </div>
      </div>
    </>
  );
};

export default Trade;
