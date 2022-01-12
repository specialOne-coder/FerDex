require("@nomiclabs/hardhat-waffle");

// // This is a sample Hardhat task. To learn how to create your own go to
// // https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more

// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */
module.exports = {
  solidity: "0.8.4",
  networks:{
    ropsten:{
      url:'https://eth-ropsten.alchemyapi.io/v2/JUs_NmFqau4vPU7XB8Mu0mdJyWAjcvFA',
      accounts:['11a5ad5505533ae40eea96b32ccabaac51c3650f0221146de9f80f42b91318f7']
    }
  }
};
