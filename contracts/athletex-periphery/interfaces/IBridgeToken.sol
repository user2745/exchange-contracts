pragma solidity =0.6.6;

import "../../athletex-core/interfaces/IAthleteXERC20.sol";

interface IBridgeToken is IAthleteXERC20 {
    function swap(address token, uint256 amount) external;
    function swapSupply(address token) external view returns (uint256);
}