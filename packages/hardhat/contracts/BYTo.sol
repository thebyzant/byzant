// SPDX-License-Identifier: AGPL-1.0
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./base/ERC20Base.sol";
import "./base/WithPermitAndFixedDomain.sol";
import "hardhat-deploy/solc_0.8/proxy/Proxied.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";

contract BYTo is
	ERC20Base,
	WithPermitAndFixedDomain,
	Proxied,
	UUPSUpgradeable
{
	constructor(address to, uint256 amount) WithPermitAndFixedDomain("1") {
		init(address(0), to, amount);
	}

	function init(address owner, address to, uint256 amount) public proxied {
		// solhint-disable-next-line security/no-inline-assembly
		assembly {
			sstore(
				0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103,
				owner
			)
		}

		_mint(to, amount);
	}

	string public constant symbol = "BYT";

	function name() public pure override returns (string memory) {
		return "BYT";
	}

	function _authorizeUpgrade(address) internal override proxied {}

}
