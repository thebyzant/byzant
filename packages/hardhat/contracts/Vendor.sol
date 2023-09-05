//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import "./base/ERC20Exchange.sol";
import "./base/WithPermitAndFixedDomain.sol";
import "hardhat-deploy/solc_0.8/proxy/Proxied.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";

contract Vendor is
	ERC20Exchange,
	WithPermitAndFixedDomain,
	Proxied,
	UUPSUpgradeable
{
	constructor(address to, uint256 amount) WithPermitAndFixedDomain("1") {
		init(address(0), to, amount);
	}

	IERC20 _USDC;
	IERC20 _USDT;
	IERC20 _BYT;

	function init(address owner, address to, uint256 amount) public proxied {
		// solhint-disable-next-line security/no-inline-assembly
		assembly {
			sstore(
				0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103,
				owner
			)
		}

		_mint(to, amount);
		_USDC = IERC20(0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512);
		_USDT = IERC20(0x5FbDB2315678afecb367f032d93F642f64180aa3);
		_BYT = IERC20(0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9);
	}

	string public constant symbol = "BYTex";

	function name() public pure override returns (string memory) {
		return "ByzantExchange";
	}

	function _authorizeUpgrade(address) internal override proxied {}

	function exchangeUSDC(uint256 amount) external {
		address from = msg.sender;
		uint256 balance = _USDC.balanceOf(from);
		require(balance >= amount, "Insufficient funds");
		_USDC.transferFrom(from, address(this), amount);

		uint256 amountToBuy = (amount * 1e18) / (1.404627262 * 1e18);
		_BYT.transfer(from, amountToBuy);
	}

	function exchangeUSDT(uint256 amount) external {
		address from = msg.sender;
		uint256 balance = _USDT.balanceOf(from);
		require(balance >= amount, "Insufficient funds");
		_USDT.transferFrom(from, address(this), amount);

		uint256 amountToBuy = (amount * 1e18) / (1.404627262 * 1e18);
		_BYT.transfer(from, amountToBuy);
	}
}
