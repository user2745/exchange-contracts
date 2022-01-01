// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const AthleteXFactory = await hre.ethers.getContractFactory("AthleteXFactory");
  console.log("Got athletexfactory")
  const athleteXFactory = await AthleteXFactory.deploy("0x72EbF01BB708b9D745EbbD59dd9E3C0DbCc5F6dB");
  console.log("attempting to deploy \n\n" + athleteXFactory);
  await athleteXFactory.deployed();
  console.log("Factory deployed to:", athleteXFactory.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
