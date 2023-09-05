import { useEffect, useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { useWalletClient } from "wagmi";
import { Header } from "~~/components/Header-testnet";
import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Audit: NextPage = () => {
  const address = useWalletClient().data?.account.address;
  const [url, setUrl] = useState("");

  const { data: BYSbalance } = useScaffoldContractRead({
    contractName: "BYS",
    functionName: "balanceOf",
    args: [address],
  });

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async (query: string) => {
      const data = await fetch(`https://graphql.contentful.com/content/v1/spaces/thdia5tnhbeh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer pIrRuIgOFky25vIxzkKqK3W6hYVhrvuJAf7o9_7um_o`,
        },
        body: JSON.stringify({ query }),
      }).then(data => data.json());
      setUrl(data.data.brokerStatements.statement.url);
    };
    // call the function
    fetchData(
      'query brokerStatementsEntryQuery {\n  brokerStatements(id: "a5IK08LQhPb6rTJpu9zM2") {\n    sys {\n      id\n    }\n    statement {\n      url\n    }\n  }\n}\n',
    )
      // make sure to catch any error
      .catch(console.error);
  }, []);

  if (Number(BYSbalance?.toString().slice(0, BYSbalance.toString.length - 18)) > 0) {
    return (
      <>
        <Header />
        <MetaHeader title="Exchanging and Swapping BYZ/BYS" description="Get BYZ">
          {/* We are importing the font this way to lighten the size of SE2. */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
        </MetaHeader>
        <div className="grid h-screen place-items-center">
          <div className="w-full p-6 bg-primary border border-gray-200 rounded-[20px] shadow-md lg:max-w-md text-center">
            <div className="flex flex-col">
              <span className="font-bold leading-tight">
                BYS Balance: {BYSbalance?.toString().slice(0, BYSbalance.toString.length - 18) || 0}
              </span>
              <span className="text-xs">1 bUSDC = 0.7119 BYS</span>
            </div>
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
        <Header />
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
