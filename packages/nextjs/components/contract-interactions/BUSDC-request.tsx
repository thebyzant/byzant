import { useState } from "react";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const BUSDCreq = () => {
  const [newAddress, setNewAddress] = useState("");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "BUSDC",
    functionName: "requestTokens",
    args: [newAddress, 10000000000000000000000n],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
      <input
        type="text"
        placeholder="Your Wallet Address"
        className="input font-bai-jamjuree w-full px-5 border border-primary text-lg placeholder-white uppercase"
        onChange={e => setNewAddress(e.target.value)}
      />
      <div className="flex rounded-full border border-primary p-1">
        <div className="flex rounded-full border-2 border-primary p-1">
          <button
            className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
              isLoading ? "loading" : ""
            }`}
            onClick={() => writeAsync()}
          >
            {!isLoading && (
              <>
                Request bUSDC <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
