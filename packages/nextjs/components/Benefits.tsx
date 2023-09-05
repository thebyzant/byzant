import Image from "next/image";
import Link from "next/link";
import { GiMeshNetwork, GiProgression } from "react-icons/gi";
import { GoCloudOffline } from "react-icons/go";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { MdRealEstateAgent } from "react-icons/md";
import { RiGovernmentFill } from "react-icons/ri";

export const Benefits = () => {
  return (
    <>
      <div className="flex flex-col items-center content-center justify-center bg-secondary p-8 mx-auto">
        <div>
          <h1 className="text-4xl text-center font-bold dark:text-secondary-content">Why should you use the Byzant?</h1>
        </div>
        <div>
          <p className="py-5 text-center text-xl">
            Would you like to earn money market yields on your U.S. Dollar - USDT, USDC - and keep those returns instead
            of giving them to the issuer? Start using the Byzant today!
          </p>
        </div>
      </div>
      <div className="flex items-center w-full bg-secondary p-8 mx-auto">
        <div className="flex items-center w-full lg:w-1/2"></div>
      </div>
      <div className="flex items-center justify-start w-full bg-secondary p-8 mx-auto">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={
              "https://images.ctfassets.net/vuub5tcriy3g/2kI0PhXQOSJhQ1G4BZk9u1/229f0bf1cb62c20001848d30754f4114/yoal-desurmont-S9OCBwRFV_k-unsplash.jpg"
            }
            alt="Road to the mountain"
            width={300}
            height={300}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />

          <div>
            <h1 className="text-5xl font-bold dark:text-secondary-content">The Byzant Advantage</h1>
            <div className="flex items-center gap-4">
              <div>
                <LiaExchangeAltSolid size={30} />
              </div>
              <div>
                <p className="py-6">A fixed exchange rate to the U.S. Dollar (USDC and USDT)</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <GiProgression size={30} />
              </div>
              <div>
                <p className="py-6">Earn USD money market yields while executing other investment strategies</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <RiGovernmentFill size={30} />
              </div>
              <div>
                <p className="py-6">You can govern the monetary policies of the Byzant instead of being governed</p>
              </div>
            </div>
            <Link href="/trade" className="underline underline-offset-2">
              <button className="btn btn-primary">Get BYT</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end w-full bg-secondary p-8 mx-auto">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <h1 className="text-5xl font-bold dark:text-secondary-content">The Byzant Difference</h1>
            <div className="flex items-center gap-4">
              <div>
                <MdRealEstateAgent size={30} />
              </div>
              <div>
                <p className="py-6">
                  The Byzant is backed by U.S. Dollars at launch and will be backed by other government issued
                  currencies and debt going forward. The project will consider other real assets but nothing crypto
                  native as collateral for the time being.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <GoCloudOffline size={30} />
              </div>
              <div>
                <p className="py-6">
                  The BYS stablecoin is not only intended for online use and executing crypto trading strategies but
                  also for splitting the bill at your local restaurant or paying for your groceries offline while
                  earning yield.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <GiMeshNetwork size={30} />
              </div>
              <div>
                <p className="py-6">
                  It is native decentralized and self regulated when needed e.g. daily publishing of brokerage account
                  statements to make offchain audits possible for the community in a transparent way.
                </p>
              </div>
            </div>
            <Link href="/trade" className="underline underline-offset-2">
              <button className="btn btn-primary">Get BYT</button>
            </Link>
          </div>
          <Image
            src={
              "https://images.ctfassets.net/vuub5tcriy3g/5nopglPsEHpXZxzLeQWl5Z/23598aa4475c5f7f78d213c22e3d1486/photo-1548018560-cd92fb00373f.jpeg"
            }
            alt="Open door"
            width={300}
            height={300}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </div>
      </div>
    </>
  );
};
