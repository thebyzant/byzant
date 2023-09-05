import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <>
      <div className="flex items-center w-full bg-secondary p-8 mx-auto">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-secondary-content">
              A decentraclized, overcollateralized stablecoin.
            </h1>
            <p className="py-5 text-xl leading-normal lg:text-xl xl:text-2xl">
              The Byzant (BYZ) is a global medium of exchange. It has a fixed exchage rate to USDC, USDT and distributes
              USD money market yields while staked.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <Link
                href="/trade"
                className="px-8 py-4 text-lg font-medium text-center text-gray-500 dark:text-white bg-info rounded-md"
              >
                Trade
              </Link>
              <Link href="/stake" className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <svg
                  role="img"
                  width="48"
                  height="48"
                  version="1.1"
                  id="Capa_1"
                  className="w-5 h-5"
                  viewBox="0 0 462.8 462.8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <g>
                      <path
                        d="M59.3,273.225H10.5c-5.8,0-10.5,4.7-10.5,10.5v20.3v89.1v20.3c0,5.8,4.7,10.5,10.5,10.5h48.8c5.8,0,10.5-4.7,10.5-10.5
			v-20.3v-89.1v-20.3C69.8,277.925,65.1,273.225,59.3,273.225z"
                      />
                      <path
                        d="M157.9,214.925h-48.8c-5.8,0-10.5,4.7-10.5,10.5v78.6v30.8v78.6c0,5.8,4.7,10.5,10.5,10.5h48.8c5.8,0,10.5-4.7,10.5-10.5
			v-78.6v-30.8v-78.6C168.4,219.625,163.7,214.925,157.9,214.925z"
                      />
                      <path
                        d="M267,246.025v-86.8h33.7c6.2,0,10-6.8,6.7-12.1l-68.6-110.2c-3.1-5-10.4-5-13.5,0l-68.6,110.2c-3.3,5.3,0.5,12.1,6.7,12.1
			h33.7v254.2c0,5.8,4.7,10.5,10.5,10.5h48.8c5.8,0,10.5-4.7,10.5-10.4c-19.6-22.4-31.5-51.7-31.5-83.8
			C235.4,297.725,247.3,268.425,267,246.025z"
                      />
                      <path
                        d="M362.9,229.825c-55.2,0-99.9,44.7-99.9,99.9s44.7,99.9,99.9,99.9s99.9-44.7,99.9-99.9S418.1,229.825,362.9,229.825z
			 M391.6,369.225c-4.4,5.3-10,8.9-16.7,10.7c-2.9,0.8-4.2,2.3-4,5.3c0.1,2.9,0,5.9,0,8.9c0,2.6-1.3,4-3.9,4.1
			c-3.2,0.1-6.4,0.1-9.5,0c-2.8-0.1-4.1-1.6-4.1-4.3c0-2.2,0-4.3-0.1-6.5c0-4.8-0.2-5-4.8-5.7c-5.9-0.9-11.6-2.3-17-4.9
			c-4.2-2-4.6-3.1-3.4-7.5c0.9-3.3,1.8-6.6,2.8-9.8c1.2-3.8,2.2-4.2,5.7-2.4c5.9,3.1,12.2,4.8,18.8,5.6c4.3,0.5,8.4,0.1,12.3-1.6
			c7.3-3.2,8.5-11.7,2.3-16.8c-2.1-1.7-4.5-3-7-4.1c-6.4-2.8-13.2-5-19.2-8.6c-9.9-5.9-16.1-14-15.4-26c0.8-13.6,8.5-22.1,21-26.6
			c5.1-1.9,5.2-1.8,5.2-7.2c0-1.8,0-3.6,0-5.4c0.1-4.1,0.8-4.7,4.8-4.9c1.2,0,2.5,0,3.7,0c8.6,0,8.6,0,8.6,8.6c0,6.1,0,6.1,6.1,7
			c4.6,0.7,9.1,2.1,13.3,4c2.4,1,3.3,2.7,2.5,5.2c-1.1,3.7-2.1,7.4-3.3,11.1c-1.1,3.5-2.2,4-5.6,2.4c-6.7-3.2-13.7-4.6-21.1-4.2
			c-1.9,0.1-3.8,0.4-5.6,1.2c-6.4,2.8-7.4,9.9-2,14.2c2.8,2.2,5.9,3.8,9.2,5.2c5.7,2.3,11.4,4.6,16.7,7.6
			C399,333.025,403.6,354.525,391.6,369.225z"
                      />
                    </g>
                  </g>
                </svg>
                <span> Earn Yield</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={
                "https://images.ctfassets.net/vuub5tcriy3g/5o8u73clWbdg1iPlgC7nU2/4ff9ae6071bf5ac4510819b6bde38f79/photo-1451187580459-43490279c0fa.jpeg"
              }
              alt="Globe from space"
              width={900}
              height={900}
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
            />
          </div>
        </div>
      </div>
    </>
  );
};
