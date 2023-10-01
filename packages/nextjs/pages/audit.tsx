import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import type { NextPage } from "next";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useWalletClient } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Audit: NextPage = () => {
  const address = useWalletClient().data?.account.address;
  const [url, setUrl] = useState("");
  const [selected, setSelected] = useState<Date>();

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }

  const { data: BYSbalance } = useScaffoldContractRead({
    contractName: "BYS",
    functionName: "balanceOf",
    args: [address],
  });

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      setUrl(
        `https://res.cloudinary.com/du0drdeby/image/upload/v1695754211/${format(
          selected || new Date(),
          "yyyy-MM-dd",
        )}.png`,
      );
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [selected]);

  if (Number(BYSbalance?.toString().slice(0, BYSbalance.toString.length - 6)) > 0) {
    return (
      <>
        <MetaHeader title="Exchanging and Swapping BYZ/BYS" description="Get BYZ">
          {/* We are importing the font this way to lighten the size of SE2. */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
        </MetaHeader>
        <div className="grid h-screen place-items-center">
          <div className="w-full p-6 bg-primary border border-gray-200 rounded-[20px] shadow-md lg:max-w-md text-center">
            <div className="flex flex-col">
              <span className="font-bold leading-tight">
                BYS Balance: {BYSbalance?.toString().slice(0, BYSbalance.toString.length - 6) || 0}
              </span>
              <span className="text-xs">1 bUSDC = 0.661226 BYS</span>
            </div>
            <br></br>
            <DayPicker mode="single" selected={selected} onSelect={setSelected} footer={footer} />
            <Image
              src={url}
              priority={true}
              alt="Picture of Broker Statement"
              width={500}
              height={500}
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
            />
          </div>
        </div>
      </>
    );
  } else
    return (
      <>
        <MetaHeader title="Exchanging and Swapping BYZ/BYS" description="Get BYZ">
          {/* We are importing the font this way to lighten the size of SE2. */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
        </MetaHeader>
        <div className="backdrop-blur-sm grid h-screen place-items-center">
          <div className="w-full p-6 bg-primary border border-gray-200 rounded-[20px] shadow-md lg:max-w-md text-center">
            <div className="flex flex-col">
              <span className="font-bold leading-tight">
                You need to hold BYS to be able to access the reports. Check your wallet and try again.
              </span>
            </div>
          </div>
        </div>
      </>
    );
};

export default Audit;
