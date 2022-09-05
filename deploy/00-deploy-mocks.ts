import { DeployFunction } from "hardhat-deploy/types"
import { network } from "hardhat"
import {
  DECIMALS,
  developmentChains,
  INITAL_ANSWER
} from "../helper-hardhat-config"

const deployMocks: DeployFunction = async function({
  getNamedAccounts,
  deployments
}) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  if (developmentChains.includes(network.name)) {
    log("local network detected! Deploying mocks...")
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITAL_ANSWER]
    })
    log("Mocks deployed")
    log("------------------------------------------")
  }
}

export default deployMocks
deployMocks.tags = ["all", "mocks"]
