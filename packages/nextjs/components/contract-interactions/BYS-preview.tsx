import { useState } from "react";
import { useWalletClient } from "wagmi";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const BYSp = () => {
  const [newAmount, setNewAmount] = useState("");

  const address = useWalletClient().data?.account.address;

  const { data: preview } = useScaffoldContractRead({
    contractName: "BYS",
    functionName: "previewDeposit",
    args: [BigInt(newAmount.concat("000000"))],
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
          className="input font-bai-jamjuree w-full px-5 border border-primary text-center text-lg placeholder-white uppercase"
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
          className={`btn btn-primary rounded-full capitalize font-normal font-white w-full items-center gap-1 hover:gap-2 transition-all tracking-widest`}
          onClick={() => {
            if (preview == null) {
            } else if (document) {
              preview.toString();
              (document.getElementById("my_modal_1") as HTMLFormElement).showModal();
            }
          }}
        >
          <>
            Preview <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
          </>
        </button>
        <dialog id="my_modal_1" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Preview Amount</h3>
            <p className="py-4">
              You would receive {preview?.toString().slice(0, preview.toString.length - 6) || 0} BYS
            </p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
};
