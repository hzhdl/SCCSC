require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"eth_chain2",
  networks: {
    hardhat: {
      accounts: [{
        privateKey: '0x2f6b8e2dc397013c43281c30e01bd6b67625031b2607b48fd72cc8c9aba08a3a',
        balance: '10000000000000000000000'
      }]
    },
    eth_chain1: {
      url: "http://localhost:8645",
    },
    eth_chain2: {
      url: "http://localhost:8640",
    }
  },
  solidity: {
    compilers:[
      {
        version: "0.8.17"
      },
      {
        version: "0.5.2",
      },
      // {
      //   version: "0.4.25"
      // }
    ]

  },
};
