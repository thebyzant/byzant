import { useState } from "react";
import { useWalletClient } from "wagmi";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const BYTa = () => {
  const [newAmount, setNewAmount] = useState("");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "BYT",
    functionName: "approve",
    args: ["0xC065c61358A9454567eC80d0f8EfAfc2d0587270", BigInt(newAmount.concat("000000"))],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const address = useWalletClient().data?.account.address;
  const { data: allowance } = useScaffoldContractRead({
    contractName: "BYT",
    functionName: "allowance",
    args: [address, "0xC065c61358A9454567eC80d0f8EfAfc2d0587270"],
  });

  return (
    <>
      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
        <input
          type="text"
          placeholder="BYT approval amount"
          className="input font-bai-jamjuree w-9/12 px-5 border border-primary text-lg placeholder-white uppercase"
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
        <div className="flex rounded-full border-2 border-neutral">
          <button
            className={`btn btn-primary rounded-full capitalize font-normal font-white flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
              isLoading ? "loading" : ""
            }`}
            onClick={() => writeAsync()}
          >
            {!isLoading && (
              <>
                Approve <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
              </>
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold leading-tight">
          Current BYT allowance for staking contract:{" "}
          {allowance?.toString().slice(0, allowance.toString.length - 6) || 0}
        </span>
      </div>
    </>
  );
};
