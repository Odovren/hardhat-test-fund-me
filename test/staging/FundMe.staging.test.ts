import { Contract } from "ethers"
import { ethers, getNamedAccounts, network } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { assert } from "chai"

developmentChains.includes(network.name)
  ? describe.skip
  : describe("fundMe", function () {
      let fundMe: Contract
      let deployer: string
      const sendValue = ethers.utils.parseEther("0.04") // 1ETH

      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        fundMe = await ethers.getContract("FundMe", deployer)
      })

      it("should allow people to fund and withdraw", async function () {
        let transactionResponse = await fundMe.fund({ value: sendValue })
        await transactionResponse.wait(1)

        transactionResponse = await fundMe.withdraw({
          gasLimit: 100000,
        })
        await transactionResponse.wait(1)

        const endingBalance = await fundMe.provider.getBalance(fundMe.address)
        assert.equal(endingBalance.toString(), "0")
      })
    })
