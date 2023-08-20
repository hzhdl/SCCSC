
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");
require("@nomiclabs/hardhat-ethers");
const Web3 =  require("web3");
const {pub1,pub2}=require("./pub.js")
const {sub}=require("./sub.js")
const {test_active}=require('./test_active.js')
const {request,requestpass,requesttimedata}=require('./request.js')
const path =require('path')


const { Configuration, Web3jService, CompileService, ENCRYPT_TYPE } = require('../../nodejs-sdk/packages/api');
const configuration = new Configuration(path.join(__dirname,"../conf/config.json"));

let add="0xb2a2b029f219701af9ba1bfd6537bb8db91304b7"
let add1="0x940cb188e2c4b798ff72f4caed3eaef081265667"
const compileService = new CompileService(configuration);
const web3jService = new Web3jService(configuration);
const {DockerMoit,DockerMoits} = require("../deploy/dockermonit.js")
const {exportByExcel} = require("./excel.js")

async function getdeploycontractinfisco(name,add) {
    const lockedAmount = 1000000000;
    //编译合约并获取对象
    const contractclass = await compileService.compile(path.join(__dirname,"../contracts/"+name+".sol"));
    const contract = await contractclass.newInstance();

    const State = compileService.GetContractClassByABI(name,contract.abi);
    const state = State.newInstance();
    state.$load(web3jService,add)
    // console.log(contract)

    return state;
}
async function getdeploycontract(ethers,signer,cname,add) {
    const lockedAmount = 1000000000;

    // Contracts are deployed using the first signer/account by default
    const accounts = await ethers.getSigners();
    const Proxy = await ethers.getContractFactory(cname);
    // console.log(Proxy.runner)
    var Proxyy = Proxy.connect(signer);
    // console.log(Proxyy.signer)
    const proxy = await Proxyy.deploy();
    const proxy1=proxy.attach(add)

    return proxy1;
}
async function sleep(time) {
    return new Promise(((resolve, reject) =>{
        setTimeout(()=>{
            resolve()
        },time)
    }))
}
let dockerMoits = new DockerMoits();
async function monitdockerstart(name) {
    await dockerMoits.add(name)
    dockerMoits.startcachedata(name)
}
async function monitdockerstop(name) {
    return dockerMoits.stopcachedata(name)
}

async function getethallcontract(addrs,dsigner){
    let Allcontracts=[]
    let contracts0=[]
    let contracts1=[]
    for (let i=0;i<addrs[0].length;i++){
        contracts0.push(await getdeploycontract(hre.ethers,dsigner,"Goldprice",addrs[0][i]))
    }
    for (let j=0;j<addrs[1].length;j++){
        contracts1.push(await getdeploycontract(hre.ethers,dsigner,"Token",addrs[1][j]))
    }
    Allcontracts.push(contracts0)
    Allcontracts.push(contracts1)

    return Allcontracts
}
async function getfiscoallcontract(addrs){
    let Allcontracts=[]
    let contracts0=[]
    let contracts1=[]
    for (let i=0;i<addrs[0].length;i++){
        contracts0.push(await getdeploycontractinfisco("Goldprice",addrs[0][i]))
    }
    for (let j=0;j<addrs[1].length;j++){
        contracts1.push(await getdeploycontractinfisco("Token",addrs[1][j]))
    }
    Allcontracts.push(contracts0)
    Allcontracts.push(contracts1)

    return Allcontracts
}

async function testethallcontract(Allcontracts,flag){
    if (flag=="0"){
        for (let i=0;i<Allcontracts[0].length;i++){
             await Allcontracts[0][i].setGoldprice(utils.zeroPad(utils.arrayify("0xf465789f"),32))
            await sleep(100)
        }
    }else {
        for (let j=0;j<Allcontracts[1].length;j++){
            await Allcontracts[1][j].send("0xb2a2b029f219701af9ba1bfd6537bb8db91304b7",10)
            await sleep(100)
        }
    }
}

async function testfiscoallcontract(Allcontracts,flag){
    if (flag=="0"){
        for (let i=0;i<Allcontracts[0].length;i++){
            await Allcontracts[0][i].setGoldprice("0x000000000000000000000000000000000000000000000000ff00000000066667")
            await sleep(100)
        }
    }else {
        for (let j=0;j<Allcontracts[1].length;j++){
            await Allcontracts[1][j].send("0xb2a2b029f219701af9ba1bfd6537bb8db91304b7",10)
            await sleep(100)
        }
    }
}

// const sleep = require('sleep');

describe("proxy", function () {
    let CCSCHash=""
    let ChainHash=""
    let contractaddr=[
        "0x01D6151470c132A9502E20acdf4B3d826d2035d2",
        "0x0E94cCF5E637468c8F51bD3C6f13D1f6eDa49266",
        "0x7118afcd60661602Dd1a3F13a454F35fca58093e",
        "0x11Ba02a6E381958Eff2994718236055c81451790",
        "0xa72d1060021526cb26257c0ec9848fe96df2ca74",
        "0xefc149bf55cf242bab9af82ccd6f1f3c1f6cb9f3",
    ]
    let OCcontract=[
        "0x66ff5c3454D1877dC7967ea7eAd96B33d7508bCb",
        "0x806B1f57d79b084be44121Ed282e1A0Df8e88CFE"
    ]
    let Chainhash=[
        "4b9b1360f513bf966f788a19e3dd1c8024d7bbf8ce42694541f0b151cae4869eff44aaf42efa6dc93de38e9d535faa5beb426b676bb6ef020162643f646d6eac",
        "52a43d6111da65417051fa5775121055bedc99f243cfdd40ce6828aeb17e5ae7e4a8821f869ca40c4caddb5b65dd35f6cebe97479d9ea97413b8583c0836d692",
        "29ba45bde7e6f711d095bc5bc901f08be152f835acbb8d6c230f9db03434d492ef3dc69b6507068d659ccf181fd49233b57b1b7f70995c47f33ba7e2c0b59cc6",
        "41882ae1abefb86fbd4c899a8d7877f1aadeaec8ce752d57924e82e9edfd457c9787cd0d9dc93293eebd8da02f9c5b2d69b7339b010f21d946876cd359e525e9",
        "98bed88e5efa53ff86b8bbb189d7bb535047163913f28de5d06f60c40d42c13746adf3f157ddf4dca9eb95cdf9fc16580eff7392afe347e389616c165b2222b9"
    ]

    let begintimes=new Date().getTime();
    // 测试baseline 的数据，被动同步的时间。此处需要考虑
    // it("测试从eth->eth", async function () {
    //     this.timeout(50000000)
    //     var defaultProvider = new ethers.getDefaultProvider("http://172.16.0.13:8640");
    //     var dsigner = defaultProvider.getSigner();
    //     let allcontracts=null
    //     await requesttimedata("8080","/evaluation/getcontractaddr",{
    //         "chainhash": Chainhash[0]
    //     }).then(async (res)=>{
    //         // console.log(res.data.data)
    //         return await getethallcontract(res.data.data,dsigner)
    //     }).then((res)=>{allcontracts=res})
    //
    //
    //     let counts=[10,
    //         // 100,
    //         // 1000,
    //         // 10000
    //     ]
    //     let btime=new Date().getTime()
    //     begintimes=new Date().getTime()
    //
    //     for (let i = 0; i < counts.length; i++) {
    //         await monitdockerstart("ccscethchain1")
    //         utils=hre.ethers.utils
    //         for (let index = 0; index <counts[i]; index++) {
    //             await testethallcontract(allcontracts,"0")
    //             await sleep(2000);
    //             // sleep.msleep(10);
    //             process.stdout.write(`${index + 1} / ${counts[i]} \r`)
    //         }
    //         await monitdockerstop("ccscethchain1").then((res)=>{
    //             exportByExcel(res,
    //                 ["name","available_memory","usage_memory","Memory_usage",
    //                     "cpu_delta","system_cpu_delta","number_cpus","CPU_usage"]
    //                 ,"eth_eth_dockerdata_"+counts[i])
    //         })
    //         console.log("\n")
    //     }
    //
    //     await sleep(20000).then(async (res)=>{
    //         return await requesttimedata("8080","/evaluation/getdatares",{
    //             "date":begintimes
    //         })
    //     }).then((res)=>{
    //         console.log("eth->eth:")
    //         console.log(res.data)
    //     })
    // });
    //
    // it("测试从eth->fisco", async function () {
    //     this.timeout(50000000)
    //     var defaultProvider = new ethers.getDefaultProvider("http://172.16.0.13:8645");
    //     var dsigner = defaultProvider.getSigner();
    //     let allcontracts=null
    //     await requesttimedata("8080","/evaluation/getcontractaddr",{
    //         "chainhash": Chainhash[1]
    //     }).then(async (res)=>{
    //         // console.log(res.data.data)
    //         return await getethallcontract(res.data.data,dsigner)
    //     }).then((res)=>{allcontracts=res})
    //
    //
    //     let counts=[10,
    //         // 100,
    //         // 1000,
    //         // 10000
    //     ]
    //     let btime=new Date().getTime()
    //     for (let i = 0; i < counts.length; i++) {
    //
    //         // await monitdockerstart("ccscethchain1")
    //         utils=hre.ethers.utils
    //         await monitdockerstart("ccscethchain2")
    //         begintimes=new Date().getTime()
    //         for (let index = 0; index <counts[i]; index++) {
    //             await testethallcontract(allcontracts,"0")
    //             await sleep(2000);
    //             // sleep.msleep(10);
    //             process.stdout.write(`${index + 1} / ${counts[i]} \r`)
    //         }
    //         await monitdockerstop("ccscethchain2").then((res)=>{
    //             exportByExcel(res,
    //                 ["name","available_memory","usage_memory","Memory_usage",
    //                     "cpu_delta","system_cpu_delta","number_cpus","CPU_usage"]
    //                 ,"eth_fisco_dockerdata_"+counts[i])
    //         })
    //         console.log("\n")
    //     }
    //     await sleep(20000).then(async (res)=>{
    //         return await requesttimedata("8080","/evaluation/getdatares",{
    //             "date":begintimes
    //         })
    //     }).then((res)=>{
    //         console.log("eth->fisco:")
    //         console.log(res.data)
    //     })
    // });
    //
    //
    // it("测试fisco->eth的合约数据同步",async function (){
    //     this.timeout(50000000)
    //     let ethers =hre.ethers
    //     let utils = hre.ethers.utils;
    //     // const state = await getdeploycontractinfisco("Goldprice",contractaddr[4])
    //     let allcontracts=null
    //     await requesttimedata("8080","/evaluation/getcontractaddr",{
    //         "chainhash": Chainhash[3]
    //     }).then(async (res)=>{
    //         // console.log(res.data.data[0].length)
    //         return await getfiscoallcontract(res.data.data)
    //     }).then((res)=>{allcontracts=res})
    //
    //     begintimes = new Date().getTime()
    //     let counts = [10
    //         // ,100,1000,10000
    //     ]
    //     for (let i = 0; i < counts.length; i++) {
    //         for (let j = 0; j < counts[i]; j++) {
    //             // await state.setGoldprice("0x000000000000000000000000000000000000000000000000ff00000000066667")
    //             await testfiscoallcontract(allcontracts,"0")
    //             await sleep(2000)
    //             process.stdout.write(`${j + 1} / ${counts[i]} \r`)
    //         }
    //         console.log("\n")
    //     }
    //     await sleep(20000).then(async (res)=>{
    //         return await requesttimedata("8080","/evaluation/getdatares",{
    //             "date":begintimes
    //         })
    //     }).then((res)=>{
    //         console.log("fisco->eth:")
    //         console.log(res.data)
    //     })
    //
    // })



    // 测试半主动更新
    // it("测试从eth->eth,半主动更新",async function () {
    //     this.timeout(50000000)
    //
    //     var defaultProvider = new ethers.getDefaultProvider("http://172.16.0.13:8640");
    //     var dsigner = defaultProvider.getSigner();
    //     let allcontracts=null
    //     await requesttimedata("8080","/evaluation/getcontractaddr",{
    //         "chainhash": Chainhash[0]
    //     }).then(async (res)=>{
    //         // console.log(res.data.data)
    //         return await getethallcontract(res.data.data,dsigner)
    //     }).then((res)=>{allcontracts=res})
    //     let count = 10
    //     await monitdockerstart("ccscethchain1")
    //     begintimes = new Date().getTime()
    //     for (let index = 0; index <count; index++) {
    //         await testethallcontract(allcontracts,"1")
    //         await sleep(500);
    //     }
    //     await monitdockerstop("ccscethchain1").then((res)=>{
    //         exportByExcel(res,
    //             ["name","available_memory","usage_memory","Memory_usage",
    //                 "cpu_delta","system_cpu_delta","number_cpus","CPU_usage"]
    //             ,"eth_eth_dockerdata_HA_"+count)
    //     })
    //     await sleep(20000).then(async (res)=>{
    //         return await requesttimedata("8080","/evaluation/getdatares",{
    //             "date":begintimes
    //         })
    //     }).then((res)=>{
    //         console.log("eth->eth,半主动更新:")
    //         console.log(res.data)
    //     })
    //
    // })
    // it("测试从eth->fisco,半主动更新",async function () {
    //     this.timeout(50000000)
    //
    //     var defaultProvider = new ethers.getDefaultProvider("http://172.16.0.13:8645");
    //     var dsigner = defaultProvider.getSigner();
    //
    //     let allcontracts=null
    //     await requesttimedata("8080","/evaluation/getcontractaddr",{
    //         "chainhash": Chainhash[1]
    //     }).then(async (res)=>{
    //         // console.log(res.data.data)
    //         return await getethallcontract(res.data.data,dsigner)
    //     }).then((res)=>{allcontracts=res})
    //
    //     let count = 10
    //     await monitdockerstart("ccscethchain2")
    //     begintimes = new Date().getTime()
    //     for (let index = 0; index <count; index++) {
    //         await testethallcontract(allcontracts,"1")
    //         await sleep(500);
    //     }
    //     await monitdockerstop("ccscethchain2").then((res)=>{
    //         exportByExcel(res,
    //             ["name","available_memory","usage_memory","Memory_usage",
    //                 "cpu_delta","system_cpu_delta","number_cpus","CPU_usage"]
    //             ,"eth_fisco_dockerdata_HA_"+count)
    //     })
    //     await sleep(20000).then(async (res)=>{
    //         return await requesttimedata("8080","/evaluation/getdatares",{
    //             "date":begintimes
    //         })
    //     }).then((res)=>{
    //         console.log("eth->fisco,半主动更新:")
    //         console.log(res.data)
    //     })
    //
    // })

    it("测试从fisco->eth,半主动更新",async function () {
        this.timeout(50000000)
        let allcontracts=null
        await requesttimedata("8080","/evaluation/getcontractaddr",{
            "chainhash": Chainhash[3]
        }).then(async (res)=>{
            // console.log(res.data.data[0].length)
            return await getfiscoallcontract(res.data.data)
        }).then((res)=>{allcontracts=res})
        begintimes = new Date().getTime()
        let count=10
        for (let index = 0; index <count; index++) {
            await testfiscoallcontract(allcontracts,"1")
            await sleep(1000)
        }
        await sleep(20000).then(async (res)=>{
            return await requesttimedata("8080","/evaluation/getdatares",{
                "date":begintimes
            })
        }).then((res)=>{
            console.log("fisco->eth,半主动更新:")
            console.log(res.data)
        })


    })


    // it("获取分析的数据",async function (){
    //
    //     await sleep(10000).then(async (res)=>{
    //         return await requesttimedata("8080","/evaluation/getdatares",{
    //             "date":begintimes
    //         })
    //     }).then((res)=>{
    //         console.log(res.data)
    //     })
    //
    // })


});
