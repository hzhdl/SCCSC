const { Configuration, Web3jService, CompileService, ENCRYPT_TYPE } = require('../packages/api');
const {
    EventLogService,
    TopicConvertor,
    hash,
    EVENT_LOG_FILTER_PUSH_STATUS
} = require('../packages/api');
const configuration = new Configuration("./conf/config.json");
const eventLogService = new EventLogService(configuration);
const abi =require('./abi.js')
let add="0xb2a2b029f219701af9ba1bfd6537bb8db91304b7"
let add1="0x99e9717ccc423a288a17881f80adcabf242f4c48"
const web3jService = new Web3jService(configuration);
web3jService.getBlockNumber().then((res)=>{
    console.log(res)
})

let compileService = new CompileService(configuration);

const waitFor = async function (pred) {
    await Promise.all([new Promise((resolve) => {
        let handle = setInterval(async () => {
            let flag = await pred();
            if (flag) {
                clearInterval(handle);
                resolve();
            }
        }, 10);
    })]);
};
const State = compileService.GetContractClassByABI("State",abi);
const state = State.newInstance();
state.$load(web3jService,add1)
let event1ABI = state.$getEventABIOf('Set');
let status=null;
let logs=null;
// console.log(event1ABI)
// console.log(configuration)
eventLogService.registerEventLogFilter({
    addresses: [state.$getAddress()],
    topics: [TopicConvertor.fromABI(event1ABI, configuration.encryptType)]
}, (_status, _logs) => {
    // console.log("---------",_status)
    console.log("************",_logs)
    status = _status;
    logs = _logs;
}, event1ABI).then((res)=>{
    // console.log(res)
})
async function  main(data){
    await state.callsetstate(add,data,"0xaaaaaaaaaaaa")
    await waitFor(()=>{
        return status !== null;
    }).then((res)=>{
        // console.log(res)
    })
    // console.log(status,logs)
}
async function mainpro(){
    for (let i = 0; i <10; i++) {
        await main("0xaaa"+i)
    }
}

mainpro()


// state.callgetstate(add).then(console.log)


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



