const Configuration = require('nodejs-sdk/packages/api').Configuration;
const configuration = new Configuration("./fiscoconfig.json");

const CompileService = require('nodejs-sdk/packages/api').CompileService;

const Web3jService = require('nodejs-sdk/packages/api').Web3jService;

const web3jService = new Web3jService(configuration);
web3jService.getBlockNumber().then((res)=>{
    console.log(res)
})

const compileService = new CompileService(configuration);

const contracts1 = compileService.compile("../contract/State.sol");
const proxy1 = contracts1.newInstance();
let add="0xb2a2b029f219701af9ba1bfd6537bb8db91304b7"

const ProxyAccess = compileService.compile("../contract/ProxyAccess.sol");
const proxyAccess = ProxyAccess.newInstance();
proxyAccess.$deploy(web3jService).then((res)=>{
    console.log(res)
    proxyAccess.setStateC(add).then((res)=>{
        console.log(res)
    })
})



// proxy1.$load(web3jService,add)
//
// console.log("---------------")
// proxy1.getstate(add).then(async (res)=>{
//     console.log(res)
//     await proxy1.setstate(add,"0x123fff56","0x456789").then(console.log)
//     await proxy1['getstate'](add).then(console.log)
// })





// proxy1.$getEventABIOf()



