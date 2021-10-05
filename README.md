# AthleteX DEX Quick Start

AthleteX DEX is a fork of [Pangolin](https://github.com/pangolindex/exchange-contracts) which in turn is forked from [Uniswap](https://github.com/Uniswap)

This guide is intended to get your AthleteX DEX deployed through [Remix](https://remix.ethereum.org/) and show you how to interact with the DEX by setting up test pairs and swaps.

This guide is assuming you understand the basics of compiling and deploying a contract via Remix as well as the basics of deploying a test ERC20 token. If you're unfamiliar with those refer to the following to get started quickly:

[Creating and Deploying a Contract - Remix - Ethereum IDE 1 documentation](https://remix-ide.readthedocs.io/en/latest/create_deploy.html)


[OpenZeppelin - Create an ERC20 using Remix, without writing Solidity](https://forum.openzeppelin.com/t/create-an-erc20-using-remix-without-writing-solidity/2908)


## Installation

``IGNORE THE TEST FOLDERS``

Upload all contracts to Remix, I like to use  GitHub import:

```bash
https://github.com/SportsToken/exchange-contracts
```

Compile `AthleteXFactory.sol using v0.5.16`

Deploy `AthleteXFactory.sol`

Call the `INIT_CODE_PAIR_HASH` function at the deployed `AthleteXFactory` contract to retrieve the CREATE2 hash used to predict addresses on-chain for pairs

Make sure the `INIT_CODE_PAIR_HASH` matches line 25 in:

```bash
../athletex-periphery/libraries/AthleteXLibrary.sol
```

Compile `AthleteXRouter.sol using v0.6.6`

Deploy `AthleteXRouter.sol` using the `AthleteXFactory address` and the `WAVAX address` (can just use the Factory address for now, you won't need to test with AVAX)

You should now have the Factory and Router deployed and able to interact with one another.

## Usage

First you need to ensure that the `Router address` has been `approved` to transfer tokens from both tokens you're trying to swap or add liquidity with.

Creating a pair:

Using two different test ERC20 tokens that you've set-up and deployed, call the `createPair` function on `AthleteXFactory` and use `both ERC20 token addresses`. This will create a pair of the two, call `getPair` to view the pair.

Adding liquidity to a swap:

Use the `addLiquidity` function and the `two addresses of the tokens you're adding` to the pool, the `amountDesired` is how much you want to add, the `amountMin` is the extent to which B/A price can go up before the transaction reverts. The `to` address is the address that was created for the swap and `deadline` is the deadline at which the transaction will revert if it hasn't already been processed.

For more information on the function refer to: [Router02 | Uniswap](https://docs.uniswap.org/protocol/V2/reference/smart-contracts/router-02#addliquidity)

Initiating a swap using the pool of the pair:

There's many different swapping techniques available, the most basic being `swapTokensForExactTokens` and `swapExactTokensForTokens`. The names should imply which is trying to achieve what goal.

Using `swapExactTokensForTokens` as an example, `amountIn` is the exact amount of tokens you want to swap, `amountOutMin` is the minimum you'll swap for, `path` is an array for the tokens being swapped, pools for each consecutive pair of addresses must exist and have liquidity. The `to` address is the recipient of the output tokens (you), and again `deadline` is the deadline at which the transaction reverts if it hasn't already been initiated.

Fill in the info and submit a swap, you should now have put in the exact amount of tokens you specified into the pool for the specified swap, and received the appropriate amount of tokens based on the pools exchange rate.
