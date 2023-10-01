import { useState } from "react";
import { useWalletClient } from "wagmi";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const BYSd = () => {
  const [newAmount, setNewAmount] = useState("");

  const address = useWalletClient().data?.account.address;

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "BYS",
    functionName: "deposit",
    args: [BigInt(newAmount.concat("000000")), address],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { data: BYTbalance } = useScaffoldContractRead({
    contractName: "BYT",
    functionName: "balanceOf",
    args: [address],
  });

  const { data: BYTsbalance } = useScaffoldContractRead({
    contractName: "BYS",
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <div className="mt-8 grid grid-flow-row auto-rows-min content-center gap-2 sm:gap-5">
      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
        <input
          type="text"
          placeholder="BYT staking amount"
          className="input font-bai-jamjuree w-full px-5 border border-primary text-lg placeholder-white uppercase"
          onChange={e => {
            if (e.target.value) {
              const reg = new RegExp("^[0-9]+$");
              const test1 = reg.test(e.target.value);
              if (test1 === true) {
                setNewAmount(e.target.value);
              } else {
                setNewAmount("");
              }
            }
          }}
        />
      </div>
      <div className="flex flex-row justify-center gap-4">
        <div>
          <span className="font-light text-xs">
            BYT Balance: {BYTbalance?.toString().slice(0, BYTbalance.toString.length - 6) || 0}
          </span>
        </div>
        <div>
          <span className="font-light text-xs">
            BYS Balance: {BYTsbalance?.toString().slice(0, BYTsbalance.toString.length - 6) || 0}
          </span>
        </div>
      </div>
      <div className="flex rounded-full border content-center border-neutral">
        <button
          className={`btn btn-primary rounded-full capitalize font-normal font-white w-full items-center gap-1 hover:gap-2 transition-all tracking-widest ${
            isLoading ? "loading" : ""
          }`}
          onClick={() => writeAsync()}
        >
          {!isLoading && (
            <>
              Deposit & Earn <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
