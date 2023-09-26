// SPDX-License-Identifier: MIT
// Voting logic inspired by OpenZeppelin Contracts v4.4.1 (token/ERC20/extensions/ERC20Votes.sol)

pragma solidity ^0.8.0;

import { ERC20 } from "solmate/src/tokens/ERC20.sol";
import { Auth, Authority } from "solmate/src/auth/Auth.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import { xERC4626, ERC4626 } from "./base/xERC4626.sol";

/**
 @title xTribe: Yield bearing, voting, and gauge enabled TRIBE
 @notice xTribe is an ERC-4626 compliant TRIBE token which:
         * distributes TRIBE rewards to stakers in a manipulation resistant manner.
 */
contract BYS is xERC4626, Ownable {
	constructor(
		ERC20 _byt,
		address _owner,
		uint32 _rewardsCycleLength
	)
		xERC4626(_rewardsCycleLength)
		ERC4626(_byt, "Byzant Vault", "BYS")
	{}

	/*///////////////////////////////////////////////////////////////
                            xERC4626 LOGIC
    //////////////////////////////////////////////////////////////*/

	function syncRewards() public override onlyOwner {
		super.syncRewards();
	}

	/*///////////////////////////////////////////////////////////////
                             ERC20 LOGIC
    //////////////////////////////////////////////////////////////*/

	function _burn(
		address from,
		uint256 amount
	) internal virtual override(ERC20) {
		ERC20._burn(from, amount);
	}

	function transfer(
		address to,
		uint256 amount
	) public virtual override(ERC20) returns (bool) {
		return ERC20.transfer(to, amount);
	}

	function transferFrom(
		address from,
		address to,
		uint256 amount
	) public virtual override(ERC20) returns (bool) {
		return ERC20.transferFrom(from, to, amount);
	}
}