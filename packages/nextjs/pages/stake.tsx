import { useState } from "react";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { BYSd } from "~~/components/contract-interactions/BYS-deposit";
import { BYSp } from "~~/components/contract-interactions/BYS-preview";
import { BYTa } from "~~/components/contract-interactions/BYT-BYS-approve";

const Stake: NextPage = () => {
  const [deposit, setDeposit] = useState(true);
  return (
    <>
      <MetaHeader title="Exchanging and Swapping BYZ/BYS" description="Get BYZ">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid h-screen place-items-center">
        <div className="w-full p-6 bg-primary border border-gray-200 rounded-[20px] shadow-md lg:max-w-2xl text-center">
          <div className="join items-start">
            <button className="btn join-item" onClick={() => setDeposit(true)}>
              Deposit
            </button>
            <button className="btn join-item" onClick={() => setDeposit(false)}>
              Preview
            </button>
          </div>
          {deposit ? (
            <>
              <BYTa /> <BYSd />{" "}
            </>
          ) : (
            <BYSp />
          )}
        </div>
      </div>
    </>
  );
};

export default Stake;
