const { Configuration, Web3jService, CompileService, ENCRYPT_TYPE } = require('../packages/api');
const configuration = new Configuration("./conf/config.json");
const abi =require('./abi.js')
let add="0xb2a2b029f219701af9ba1bfd6537bb8db91304b7"
let add1="0x2fc2d00121fa4210948fbefa913e4de5a8c54797"
const web3jService = new Web3jService(configuration);
web3jService.getBlockNumber().then((res)=>{
    console.log(res)
})

let compileService = new CompileService(configuration);

const State = compileService.GetContractClassByABI("State",abi);
const state = State.newInstance();
state.$load(web3jService,add1)
const sleep = (time,num) => {
    return new Promise(((resolve, reject) => {
        setTimeout(()=>{
            // console.log()
            resolve()
        },time)
    }))
}
// console.log(state.setGoldprice.encodeABI(["0x00000000000000000000000000000000000000000000000000000000000fffff"]));
async function main() {
    for (let i = 1000; i < 1020; i++) {
        await sleep(1000)
        await state.setGoldprice("0x000000000000000000000000000000000000000000000000ff0000000001"+i).then(console.log)
    }
}
main()


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



