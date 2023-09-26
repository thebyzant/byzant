import { useState } from "react";
import { useWalletClient } from "wagmi";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const BYTex = () => {
  const [newAmount, setNewAmount] = useState("");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "BYTVendor",
    functionName: "purchaseForBUSDC",
    args: [BigInt(newAmount.toString().concat("000000"))],
    value: `${0}`,
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const address = useWalletClient().data?.account.address;
  const { data: balance } = useScaffoldContractRead({
    contractName: "BUSDC",
    functionName: "balanceOf",
    args: [address],
  });

  const { data: BYTbalance } = useScaffoldContractRead({
    contractName: "BYT",
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <div className="mt-8 grid grid-flow-row auto-rows-min content-center gap-2 sm:gap-5">
      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
        <input
          type="text"
          placeholder="BYT purchase amount"
          className="input font-bai-jamjuree w-full px-5 border border-primary text-lg placeholder-white uppercase"
          onChange={e => setNewAmount(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold leading-tight">
          bUSDC Balance: {balance?.toString().slice(0, balance.toString.length - 6) || 0}
        </span>
        <span className="text-xs">1 bUSDC = 0.661226 BYT</span>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
        <input
          type="number"
          placeholder="BYT amount"
          className="input font-bai-jamjuree w-full px-5 border border-primary text-lg placeholder-white uppercase"
          disabled={true}
          value={+newAmount * 1.512342}
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold leading-tight">
          BYT Balance: {BYTbalance?.toString().slice(0, BYTbalance.toString.length - 6) || 0}
        </span>
        <span className="text-xs">1 BYT = 1.512342 bUSDC</span>
      </div>
      <div className="flex rounded-full border content-center border-secondary">
        <button
          className={`btn btn-primary rounded-full capitalize font-normal font-white w-full items-center gap-1 hover:gap-2 transition-all tracking-widest ${
            isLoading ? "loading" : ""
          }`}
          onClick={() => writeAsync()}
        >
          {!isLoading && (
            <>
              Exchange <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
