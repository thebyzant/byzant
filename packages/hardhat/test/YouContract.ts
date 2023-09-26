import { expect } from "./chai-setup";
import { ethers, deployments, getNamedAccounts } from "hardhat";

describe("VendorV2", function () {
  it("Should return deployer account address", async function () {
    await deployments.fixture(["SimpleERC20_builtin_UUPS"]);
    const { deployer } = await getNamedAccounts();
    const Token = await ethers.getContractAt("BUSDC", "0x5fbdb2315678afecb367f032d93f642f64180aa3");
    const ownerBalance = await Token.balanceOf(deployer);
    const supply = await Token.totalSupply();
    expect(ownerBalance).to.equal(supply);

    /** 
    const myBUSDC = await deploy("BUSDC", {
      contract: "BUSDC",
      from: deployer,
      log: true,
    });
    const myBUSDT = await deploy("BUSDT", {
      contract: "BUSDT",
      from: deployer,
      log: true,
    });
    const myBYT = await deploy("BYT", {
      contract: "BYT",
      from: deployer,
      log: true,
    });
    const myVendor = await deploy("VendorV2", {
      contract: "VendorV2",
      from: deployer,
      args: [myBUSDC.address, myBUSDT.address, myBYT.address, 100],
      log: true,
    });
    console.log(myVendor.address);
      */
  });
});
