// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract BUSDC is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    constructor() ERC20("bUSDC", "bUSDC") ERC20Permit("bUSDC") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    //when you requestTokens address and blocktime+1 day is saved in Time Lock
    mapping(address => uint) public lockTime;

    //allow users to call the requestTokens function to mint tokens
    function requestTokens (address requestor , uint256 amount) external {
        
        //perform a few check to make sure function can execute
        require(block.timestamp > lockTime[msg.sender], "lock time has not expired. Please try again later");
        require(amount <= 10000 * 1e18, "amount needs to be equal or smaller than 10,000");
        //mint tokens
        _mint(requestor, amount);

        //updates locktime 1 day from now
        lockTime[msg.sender] = block.timestamp + 1 days;
    }
}