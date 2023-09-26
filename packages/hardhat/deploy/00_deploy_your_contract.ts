import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
//import { parseEther } from "ethers/lib/utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer, proxy1, beneficiary } = await getNamedAccounts();
  console.log(deployer, proxy1, beneficiary);

  await deploy("BUSDC", {
    contract: "BUSDC",
    from: deployer,
    log: true,
  });

  await deploy("BYT", {
    contract: "BYT",
    from: deployer,
    proxy: {
      proxyContract: "UUPS",
      execute: {
        init: {
          methodName: "init",
          args: [],
        },
      },
    },
    log: true,
  });

  await deploy("BUSDT", {
    contract: "BUSDT",
    from: deployer,
    log: true,
  });

  await deploy("BYTVendor", {
    contract: "BYTVendor",
    from: deployer,
    args: [
      "0x94F560888843e82A2235cF5ec72BCf82f107c163",
      "0xCc878e506Bde5CdD3D7484c49EC6Df90E66905Ad",
      "0x21F5F94bEE2912D27949326E157Ee498CD95bFD5",
      1 * 1e6,
    ],
    log: true,
  });

  await deploy("BYS", {
    contract: "BYS",
    from: deployer,
    args: ["0x21F5F94bEE2912D27949326E157Ee498CD95bFD5", deployer, 86400],
    log: true,
  });

  /** 
  await deploy("BYN", {
    contract: "BYNV2",
    from: deployer,
    proxy: {
      proxyContract: "UUPS",
      execute: {
        init: {
          methodName: "init",
          args: [proxy01Owner],
        },
      },
    },
    log: true,
  });

  await deploy("BYTo", {
    contract: "BYTo",
    from: deployer,
    args: [simpleERC20Beneficiary, parseEther("0")],
    proxy: {
      proxyContract: "UUPS",
      execute: {
        init: {
          methodName: "init",
          args: [proxy01Owner, simpleERC20Beneficiary, parseEther("0")],
        },
      },
    },
    log: true,
  });

  await deploy("BYTo", {
    contract: "BYToV2",
    from: proxy01Owner,
    args: [simpleERC20Beneficiary, parseEther("0")],
    proxy: {
      proxyContract: "UUPS",
    },
    log: true,
  });


  await deploy("Vendor", {
    contract: "Vendor",
    from: "0xfa33fbd278bD82b89Ad4297Ba23B264c05bcdC6E",
    args: [
      beneficiary,
      parseEther("0"),
      "0x40ecFD7c3D672Cad655cd7B6F3f0808A7e347a72",
      "0x4aD5c7a31AAF5BECf5740a962B7fE63Af268a184",
    ],
    proxy: {
      proxyContract: "UUPS",
      execute: {
        init: {
          methodName: "init",
          args: [
            proxy1,
            beneficiary,
            parseEther("0"),
            "0x40ecFD7c3D672Cad655cd7B6F3f0808A7e347a72",
            "0x4aD5c7a31AAF5BECf5740a962B7fE63Af268a184",
          ],
        },
      },
    },
    log: true,
  });
*/

  /** 
  await deploy("VendorV2", {
    contract: "VendorV2",
    from: deployer,
    args: [
      "0x40ecFD7c3D672Cad655cd7B6F3f0808A7e347a72",
      "0xc30F77Cde0bDd25aF1a0660b68953DA6EE66DcD8",
      "0x4aD5c7a31AAF5BECf5740a962B7fE63Af268a184",
      100,
    ],
    log: true,
  });

  await deploy("BYS", {
    contract: "BYS",
    from: deployer,
    args: ["0x4aD5c7a31AAF5BECf5740a962B7fE63Af268a184", proxy1, 240],
    log: true,
  });

  /** 
  await deploy("BYS", {
    contract: "BYSV2",
    from: deployer,
    args: ["0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", deployer, 86400],
    deterministicDeployment: true,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
    },
    log: true,
  });
*/
};
export default func;
func.tags = ["SimpleERC20_builtin_UUPS"];
