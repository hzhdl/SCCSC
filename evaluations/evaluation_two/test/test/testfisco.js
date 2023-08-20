const { Configuration, Web3jService, CompileService, ENCRYPT_TYPE } = require('../packages/api');
const configuration = new Configuration("./conf/config.json");
const abi =require('./abi.js')
let add="0xb2a2b029f219701af9ba1bfd6537bb8db91304b7"
let add1="0x940cb188e2c4b798ff72f4caed3eaef081265667"
const web3jService = new Web3jService(configuration);
web3jService.getBlockNumber().then((res)=>{
    console.log(res)
})

let compileService = new CompileService(configuration);

const State = compileService.GetContractClassByABI("Goldprice",abi);
const state = State.newInstance();
state.$load(web3jService,add1)
// console.log(state.setGoldprice.encodeABI(["0x00000000000000000000000000000000000000000000000000000000000fffff"]));
for (let i = 0; i < 1; i++) {
    state.setGoldprice("0x000000000000000000000000000000000000000000000000ff00000000011111").then(console.log)
}


// const contracts1 = compileService.compile("../contract/State.sol");
// const proxy1 = contracts1.newInstance();
// let add="0xb2a2b029f219701af9ba1bfd6537bb8db91304b7"
// proxy1.$load(web3jService,add)
//
// console.log("---------------")
// proxy1.getstate(add).then(async (res)=>{
//     console.log(res)
//     await proxy1.setstate(add,"0x123fff56","0x456789").then(console.log)
//     await proxy1['getstate'](add).then(console.log)
// })





// proxy1.$getEventABIOf()



