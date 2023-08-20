
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
    //要在1s内将这些合约触发，因此动态调整时间。
    let sleeptime=100
    if (flag=="0"){
        sleeptime= 1000/Allcontracts[0].length
        for (let i=0;i<Allcontracts[0].length;i++){
            await Allcontracts[0][i].setGoldprice(utils.zeroPad(utils.arrayify("0xf465789f"),32))
            await sleep(sleeptime)
        }
    }else {
        sleeptime= 1000/Allcontracts[1].length
        // console.log(Allcontracts[1][0])
        for (let j=0;j<Allcontracts[1].length;j++){
            await Allcontracts[1][j].send("0xb2a2b029f219701af9ba1bfd6537bb8db91304b7",10)
            await sleep(sleeptime)
        }
    }
}

async function testfiscoallcontract(Allcontracts,flag){
    //要在1s内将这些合约触发，因此动态调整时间。
    let sleeptime=100
    if (flag=="0"){
        sleeptime= 1000/Allcontracts[0].length
        for (let i=0;i<Allcontracts[0].length;i++){

            await Allcontracts[0][i].setGoldprice("0x000000000000000000000000000000000000000000000000ff00000000066667")
            await sleep(sleeptime)
        }
    }else {
        sleeptime= 1000/Allcontracts[1].length
        for (let j=0;j<Allcontracts[1].length;j++){
            await Allcontracts[1][j].send("0xb2a2b029f219701af9ba1bfd6537bb8db91304b7",0)
            await sleep(sleeptime)
        }
    }
}

async function mmrmonit(monitdata,flag,nl,cl){
    let f=0
    if (flag=="1")
        f=1
    let chaindata=[]
    for (let i = 0; i < cl; i++) {
        chaindata.push({
            "surl":"http://172.16.0.13:600"+i+"/remindme"
        })

    }

    await requesttimedata("6000","/clear",{})
    for (let j = 0; j < monitdata[f].length; j++) {
        await requesttimedata("6000","/monitall",{
            "url":"ws://172.16.0.13:8641",
            "hurl":"http://172.16.0.13:8640",
            "addr": monitdata[f][j],
            "topics":["0xbda0553cb8ce83a953f7df7633a4923fac43306af7506421652c9c42dcaf8c42"],
            "chaindata":chaindata
        })
            // .then((res)=> console.log(res.data))
    }


}
async function mmrmonite2(monitdata,flag,nl,cl){
    let f=0
    if (flag=="1")
        f=1
    let chaindata=[]
    for (let i = 0; i < cl; i++) {
        chaindata.push({
            "surl":"http://172.16.0.13:600"+i+"/remindme"
        })

    }

    await requesttimedata("6000","/clear",{})
    for (let j = 0; j < monitdata[f].length; j++) {
        await requesttimedata("6000","/monitall",{
            "url":"ws://172.16.0.13:8646",
            "hurl":"http://172.16.0.13:8645",
            "addr": monitdata[f][j],
            "topics":["0xbda0553cb8ce83a953f7df7633a4923fac43306af7506421652c9c42dcaf8c42"],
            "chaindata":chaindata
        })
            // .then((res)=> console.log(res.data))
    }


}

//监听功能似乎承载不了过多ws长连接，改为直接触发
async function test(chaindata) {
    return await requesttimedata("6000","/test",{})

}


async function evealresult(chainhash,nl,cl,counts,flag,dsigner) {
    let allcontracts=[]
    let monitdata=null

    await requesttimedata("8080","/evaluation/getcontractaddr",{
        "chainhash": chainhash,
        "flag":false,
        "NumsLimit":nl,
        "ChainLimit":cl,
    }).then(async (res)=>{
        // console.log(res.data.data)
        monitdata=res.data.data
        await mmrmonit(monitdata,flag,nl,cl)
        // return await getethallcontract(res.data.data,dsigner)
    })
        // .then((res)=>{allcontracts=res})

    let btime=new Date().getTime()
    let begintimes=new Date().getTime()
    let f=0
    if (flag=="1")
        f=1

    // for (let i = 0; i < counts; i++) {
    utils=hre.ethers.utils
    let signletime = 0
    let tasktime = 0
    let data= []
    for (let index = 0; index <counts; index++) {
        // await testethallcontract(allcontracts,flag)
        await test(monitdata).then((res)=>{
            data.push(res.data.data)
            // console.log(res)
        })
        await sleep(5000)
        process.stdout.write(`${index + 1} / ${counts} \r`)
    }
    // console.log("signletime:",signletime/(counts*monitdata[f].length))
    // console.log("tasktime:",tasktime/(counts*monitdata[f].length))

    return data

}
async function evealresulte2(chainhash,nl,cl,counts,flag,dsigner) {
    let allcontracts=[]
    let monitdata=null

    await requesttimedata("8080","/evaluation/getcontractaddre2",{
        "chainhash": chainhash,
        "flag":false,
        "NumsLimit":nl,
        "ChainLimit":cl,
    }).then(async (res)=>{
        // console.log(res.data.data)
        monitdata=res.data.data
        await mmrmonite2(monitdata,flag,nl,cl)
        // return await getethallcontract(res.data.data,dsigner)
    })
        // .then((res)=>{allcontracts=res})

    let btime=new Date().getTime()
    let begintimes=new Date().getTime()
    let f=0
    if (flag=="1")
        f=1

    // for (let i = 0; i < counts; i++) {
    utils=hre.ethers.utils
    let signletime = 0
    let tasktime = 0
    let data= []
    // console.log(monitdata)
    for (let index = 0; index <counts; index++) {
        // await testethallcontract(allcontracts,flag)
        await test(monitdata).then((res)=>{
            data.push(res.data.data)
            // console.log(res)
        })
        await sleep(5000)
        process.stdout.write(`${index + 1} / ${counts} \r`)
    }
    // console.log("signletime:",signletime/(counts*monitdata[f].length))
    // console.log("tasktime:",tasktime/(counts*monitdata[f].length))

    return data

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
        "4b8050429dda892826d97854845b89290c2c6a0ee14a42036e62ce908347615e93c96888bc8f732fb96afce7106227fdb7a8eff9732cc4e5dc0c87b54d13c896",
        "2b82be65e8b625cdb888813760ca385d4fc39d4f71aaaea712ed74e51a3d99342196abf6da724a12d8f79bc6f1c913817af5f151cfce7cb55879db8f06ec951c"
    ]

    let begintimes=new Date().getTime();
    // 测试baseline 的数据，被动同步的时间。此处需要考虑
    // it("实验二   第一组", async function () {
    //     this.timeout(50000000)
    //     var defaultProvider = new ethers.getDefaultProvider("http://172.16.0.13:8640");
    //     var dsigner = defaultProvider.getSigner();
    //     let allcontracts=null
    //     let finalresult=[]
    //
    //     let counts=3
    //     let nl=[
    //         20,
    //         40,
    //         60,
    //         80,
    //         100
    //     ]
    //     let cl=30
    //
    //     for (let i = 0; i < nl.length; i++) {
    //         console.log("-----------")
    //         finalresult[i]=[]
    //         for (let j = 0; j < 3; j++) {
    //             await evealresult(Chainhash[0],nl[i],cl,counts,"0",dsigner)
    //                 .then((res)=>{
    //                 finalresult[i].push(res);
    //                     console.log(res)
    //             })
    //         }
    //     }
    //     console.log(finalresult)
    //     // for (let i = 0; i < finalresult.length; i++) {
    //     //     for (let j = 0; j < finalresult[i].length; j++) {
    //     //         let data = finalresult[i][j]
    //     //         console.log("平均单条时间0：" ,data[3][0]+"ms","平均单条时间1：" ,data[3][1]+"ms")
    //     //         console.log("平均任务时间0：" ,data[2][0]+"ms","平均任务时间1：" ,data[2][1]+"ms")
    //     //         console.log("成功率0：" ,(data[4][0]*100)/(counts*nl[i]*cl)+"%","成功率1：" ,(data[4][1]*100)/(counts*nl[i]*cl)+"%")
    //     //     }
    //     //
    //     // }
    //
    //
    // });
    it("实验二   第二组", async function () {
        this.timeout(50000000)
        var defaultProvider = new ethers.getDefaultProvider("http://172.16.0.13:8645");
        var dsigner = defaultProvider.getSigner();
        let allcontracts=null
        let finalresult=[]

        let counts=3
        let nl=60
        let cl=[
            10,
            20,
            30,
            40,
            50
        ]
        // let cl=30

        for (let i = 0; i < cl.length; i++) {
            console.log("-----------")
            finalresult[i]=[]
            for (let j = 0; j < 3; j++) {
                await evealresulte2(Chainhash[1],nl,cl[i],counts,"0",dsigner)
                    .then((res)=>{
                    finalresult[i].push(res);
                        console.log(res)
                })
            }
        }
        console.log(finalresult)
        // for (let i = 0; i < finalresult.length; i++) {
        //     for (let j = 0; j < finalresult[i].length; j++) {
        //         let data = finalresult[i][j]
        //         console.log("平均单条时间0：" ,data[3][0]+"ms","平均单条时间1：" ,data[3][1]+"ms")
        //         console.log("平均任务时间0：" ,data[2][0]+"ms","平均任务时间1：" ,data[2][1]+"ms")
        //         console.log("成功率0：" ,(data[4][0]*100)/(counts*nl[i]*cl)+"%","成功率1：" ,(data[4][1]*100)/(counts*nl[i]*cl)+"%")
        //     }
        //
        // }


    });


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
