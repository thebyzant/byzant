// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract BYTVendor is ReentrancyGuard {
	using SafeERC20 for IERC20;
	using SafeMath for uint256;

	address public owner;
	address public BUSDCAddress;
	address public BUSDTAddress;
	address public BYTAddress;

	uint256 public BYTtoBUSDCRate;
	uint256 public minimumPurchaseAmount;

	constructor(
		address _BUSDCAddress,
		address _BUSDTAddress,
		address _BYTAddress,
		uint256 _minimumPurchaseAmount
	) {
		owner = msg.sender;

		BUSDCAddress = _BUSDCAddress;
		BUSDTAddress = _BUSDTAddress;
		BYTtoBUSDCRate = 1.512342 * 1e18;
		BYTAddress = _BYTAddress;
		minimumPurchaseAmount = _minimumPurchaseAmount;
	}

	event Transfer(address from, address to, uint256 amount);

	modifier onlyOwner() {
		require(msg.sender == owner, "You do not have an access");
		_;
	}

	function convertToStable(
		uint256 _TokenAmount
	) public view returns (uint256) {
		return _TokenAmount * BYTtoBUSDCRate / 1e18;
	}

	function convertFromStable(uint256 _stableamount) public view returns (uint256) {
		return _stableamount * 1e12 / BYTtoBUSDCRate *1e6;
	}
	
	function BUSDCinVendor() public view returns (uint256) {
		return IERC20(BUSDCAddress).balanceOf(address(this));
	}

	function BUSDTinVendor() public view returns (uint256) {
		return IERC20(BUSDCAddress).balanceOf(address(this));
	}

	modifier checkPurchaseAmount(uint256 _TokenAmount) {
		require(
			_TokenAmount >= minimumPurchaseAmount,
			"Minimum purchase amount is greater than input amount"
		);
		_;
	}

	modifier sufficientTokenFunds(address fundsOwner, uint256 _TokenAmount) {
		IERC20 TOKEN = IERC20(BYTAddress);
		require(
			TOKEN.balanceOf(fundsOwner) >= _TokenAmount,
			"Insufficient funds in ERC20"
		);
		_;
	}

	function purchaseForStable(
		uint256 _TokenAmount,
		address stableAddress
	)
		public
		payable
		checkPurchaseAmount(_TokenAmount)
		sufficientTokenFunds(address(this), _TokenAmount)
		returns (uint256 spentAmount)
	{
		uint256 stableAmount = convertToStable(_TokenAmount);

		IERC20 STABLE = IERC20(stableAddress);
		IERC20 TOKEN = IERC20(BYTAddress);

		require(
			STABLE.balanceOf(msg.sender) >= stableAmount,
			"Insufficient funds in BUSDT/BUSDC"
		);
		require(
			STABLE.allowance(msg.sender, address(this)) >= stableAmount,
			"Insufficient allowance in BUSDT/BUSDC"
		);

		STABLE.safeTransferFrom(msg.sender, address(this), stableAmount);
		emit Transfer(msg.sender, address(this), stableAmount);

		TOKEN.safeTransfer(msg.sender, _TokenAmount);
		emit Transfer(address(this), msg.sender, _TokenAmount);

		return stableAmount;
	}

	function purchaseForBUSDC(
		uint256 _TokenAmount
	) public payable returns (uint256 spentAmount) {
		return purchaseForStable(_TokenAmount, BUSDCAddress);
	}

	function purchaseForBUSDT(
		uint256 _TokenAmount
	) public payable returns (uint256 spentAmount) {
		return purchaseForStable(_TokenAmount, BUSDTAddress);
	}

	function withdrawStable(
		uint256 _TokenAmount,
		address stableAddress
	) public payable returns (uint256 withdrawnAmount) {
		uint256 stableAmount = convertToStable(_TokenAmount);

		IERC20 STABLE = IERC20(stableAddress);
		IERC20 TOKEN = IERC20(BYTAddress);

		require(
			STABLE.balanceOf(address(this)) >= stableAmount,
			"Insufficient funds in the Vending contract"
		);
		require(
			TOKEN.allowance(msg.sender, address(this)) >= _TokenAmount,
			"Insufficient allowance in ERC20"
		);

		TOKEN.safeTransferFrom(msg.sender, address(this), _TokenAmount);
		emit Transfer(msg.sender, address(this), _TokenAmount);

		STABLE.safeTransfer(msg.sender, stableAmount);
		emit Transfer(address(this), msg.sender, stableAmount);

		return stableAmount;
	}

	function withdrawBUSDC(
		uint256 _TokenAmount
	)
		public
		payable
		nonReentrant
		sufficientTokenFunds(msg.sender, _TokenAmount)
		returns (uint256 withdrawnAmount)
	{
		return withdrawStable(_TokenAmount, BUSDCAddress);
	}

	function withdrawBUSDT(
		uint256 _TokenAmount
	)
		public
		payable
		nonReentrant
		sufficientTokenFunds(msg.sender, _TokenAmount)
		returns (uint256 withdrawnAmount)
	{
		return withdrawStable(_TokenAmount, BUSDTAddress);
	}

	function withdrawOwnerStable(
		uint256 _withdrawAmount,
		address stableAddress,
		address withdrawAddress
	) public payable onlyOwner returns (uint256 withdrawnAmount) {
		IERC20 STABLE = IERC20(stableAddress);

		require(
			STABLE.balanceOf(address(this)) >= _withdrawAmount,
			"Insufficient funds in the Vending contract"
		);

		STABLE.safeTransfer(withdrawAddress, _withdrawAmount);
		emit Transfer(address(this), withdrawAddress, _withdrawAmount);

		return _withdrawAmount;
	}

	function withdrawOwnerBUSDC(
		uint256 _withdrawAmount,
		address withdrawAddress
	) public payable onlyOwner returns (uint256 withdrawnAmount) {
		return
			withdrawOwnerStable(_withdrawAmount, BUSDCAddress, withdrawAddress);
	}

	function withdrawOwnerBUSDT(
		uint256 _withdrawAmount,
		address withdrawAddress
	) public payable onlyOwner returns (uint256 withdrawnAmount) {
		return
			withdrawOwnerStable(_withdrawAmount, BUSDCAddress, withdrawAddress);
	}
}
