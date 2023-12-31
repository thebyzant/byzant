// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract BUSDT is ERC20, ERC20Burnable, Ownable, ERC20Permit {
	constructor() ERC20("bUSDT", "bUSDT") ERC20Permit("bUSDT") {}

	function decimals() public pure override returns (uint8) {
		return 6;
	}

	function mint(address to, uint256 amount) public onlyOwner {
		_mint(to, amount);
	}
}
