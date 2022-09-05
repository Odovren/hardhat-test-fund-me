export const chainIds = {
  ARBITRUM: 42161,
  GOERLI: 5,
}

export const developmentChains = ["hardhat", "localhost"]
export const DECIMALS = 8
export const INITAL_ANSWER = 150000000000

export const networkConfig = {
  [chainIds.ARBITRUM]: {
    name: "arbitrum",
    ethUsdPriceFeed: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
  },
  [chainIds.GOERLI]: {
    name: "goerli",
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
  },
}
