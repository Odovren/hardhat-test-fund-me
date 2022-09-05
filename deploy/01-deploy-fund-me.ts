import { DeployFunction } from "hardhat-deploy/types"
import { network } from "hardhat"
import {
  networkConfig,
  chainIds,
  developmentChains
} from "../helper-hardhat-config"
import { verify } from "../utils/verify"

const deployFundMe: DeployFunction = async function({
  getNamedAccounts,
  deployments
}) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  let ethUsdPriceFeedAddress = null
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator")
    ethUsdPriceFeedAddress = ethUsdAggregator.address
  } else if (chainId) {
    ethUsdPriceFeedAddress = networkConfig[chainId]?.ethUsdPriceFeed
  }

  const args = [ethUsdPriceFeedAddress]

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: (network.config as any).blockConfirmations || 1
  })

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, args)
  }

  log("------------------------------------------")
}

export default deployFundMe
deployFundMe.tags = ["all"]
