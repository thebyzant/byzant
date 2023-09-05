import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { parseEther } from "ethers/lib/utils";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer, proxy1, beneficiary } = await getNamedAccounts();

  await deploy("BUSDT", {
    contract: "BUSDT",
    from: deployer,
    log: true,
  });
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
*/

  await deploy("Vendor", {
    contract: "Vendor",
    from: deployer,
    args: [beneficiary, parseEther("0")],
    proxy: {
      proxyContract: "UUPS",
      execute: {
        init: {
          methodName: "init",
          args: [proxy1, beneficiary, parseEther("0")],
        },
      },
    },
    log: true,
  });

  await deploy("BYS", {
    contract: "BYS",
    from: deployer,
    args: ["0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", proxy1, 240],
    log: true,
  });
  /** 
  await deploy("BYS", {
    contract: "BYSV2",
    from: deployer,
    args: ["0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", deployer, 240],
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
