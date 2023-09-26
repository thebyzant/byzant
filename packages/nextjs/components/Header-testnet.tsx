/**
 * Site header - alert
 */
export const Header = () => {
  return (
    <div className="sticky lg:static top-0 navbar bg-warning min-h-0 justify-center z-20 shadow-md shadow-warning px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-full justify-center">
        <ul className="text-black">
          The Byzant is currently live on the Sepolia Testnet and will be deployed to the Ethereum Mainnet on 9. October
          2023
        </ul>
      </div>
    </div>
  );
};
