import { HardhatUserConfig, task } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "hardhat-deploy"
import "hardhat-gas-reporter"
import "dotenv/config"

// @ts-ignore
const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.9" }, { version: "0.6.6" }],
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    goerli: {
      url: process.env.GOERLY_RPC_URL,
      chainId: 5,
      accounts: [process.env.PRIVATE_KEY!],
      blockConfirmations: 6,
    } as any,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    noColors: true,
    token: "ETH",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
}

export default config
