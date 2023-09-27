import { AiFillGithub, AiFillMediumCircle, AiFillTwitterCircle } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { SiGitbook } from "react-icons/si";
import { hardhat } from "wagmi/chains";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { useGlobalState } from "~~/services/store/store";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);

  return (
    <div className="min-h-0 p-5 mb-11 lg:mb-0 bg-secondary">
      <div>
        <div className="fixed flex justify-between items-center w-full z-20 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex space-x-2 pointer-events-auto">
            {nativeCurrencyPrice > 0 && (
              <div className="btn btn-primary btn-sm font-normal cursor-auto">
                <CurrencyDollarIcon className="h-4 w-4 mr-0.5" />
                <span>{nativeCurrencyPrice}</span>
              </div>
            )}
            {getTargetNetwork().id === hardhat.id}
          </div>
          <SwitchTheme className="pointer-events-auto" />
        </div>
      </div>
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div>
              <a
                href="https://blog.thebyzant.com"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                <AiFillMediumCircle className="inline-block h-8 w-8" />
              </a>
            </div>
            <span>·</span>
            <div>
              <a
                href="https://discord.gg/rwfA4UrC"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                <BsDiscord className="inline-block h-8 w-8" />
              </a>
            </div>
            <span>·</span>
            <div>
              <a
                href="https://github.com/thebyzant"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                <AiFillGithub className="inline-block h-8 w-8" />
              </a>
            </div>
            <span>·</span>
            <div>
              <a
                href="https://twitter.com/thebyzant"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                <AiFillTwitterCircle className="inline-block h-8 w-8" />
              </a>
            </div>
            <span>·</span>
            <div>
              <a
                href="https://docs.thebyzant.com"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                <SiGitbook className="inline-block h-8 w-8" />
              </a>
            </div>
          </div>
        </ul>
      </div>
      <div className="my-10 text-sm text-center text-gray-600 dark:text-white">
        Copyright © {new Date().getFullYear()}. Made with ♥ by{" The Byzant DAO "}
      </div>
    </div>
  );
};
