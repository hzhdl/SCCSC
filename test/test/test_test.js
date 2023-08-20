
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");
require("@nomiclabs/hardhat-ethers");
const Web3 =  require("web3");
const {pub1,pub2}=require("./pub.js")
const {sub}=require("./sub.js")
const {test_active}=require('./test_active.js')
const {request,requestpass}=require('./request.js')

const sleep = require('sleep');

describe("proxy", function () {
    let CCSCHash=""
    let ChainHash=""
    let contractaddr=[
        '0xe600B8F5DC1F08b30B9BE3E8Cb6FC1967ae851d6',
        '0xCAbCb602ec263256f118E5715AabE8232f6cFEf2'
    ]

    // 测试baseline 的数据，被动同步的时间。此处需要考虑
    it("test subscribe contract one sync time", async function () {
        this.timeout(50000000)
        const lockedAmount = 1000000000;
        const accounts = await hre.ethers.getSigners();

        const Goldprice = await hre.ethers.getContractFactory("Goldprice");
        const Token = await hre.ethers.getContractFactory("Token");
        // const proxy = await Proxy.deploy();
        const goldprice = await Goldprice.deploy();
        const token = await Token.deploy();
        let count=1000
        totaltime=0

        let btime=new Date().getTime()

        const goldprice1=goldprice.attach(contractaddr[0])
        const token1=token.attach(contractaddr[1])
        utils=hre.ethers.utils
        for (let index = 0; index <count; index++) {
            // await goldprice1.setGoldprice(utils.zeroPad(utils.arrayify("0xf465789f"),32)).then(console.log)
            var rr=await token1.issue('0xe600B8F5DC1F08b30B9BE3E8Cb6FC1967ae851d6',100000)
            await rr.wait().then((res)=>{
                // token1.interface.parseLog(res.logs[0])
                // console.log(res.logs)
            })
            var rr1=await token1.send('0xe600B8F5DC1F08b30B9BE3E8Cb6FC1967ae851d6',1000)
            await rr1.wait().then((res)=>{
                // token1.interface.parseLog(res.logs[0])
                // console.log(res.logs)
            })
            // await token1.getbalence('0x009A77B77c1Bd10F6bd6ce0C76B6a06c1Df5E8AE').then(console.log)

            sleep.msleep(10);
            process.stdout.write(`${index + 1} / ${count} \r`)
        }
        let etime=new Date().getTime()
        console.log("\n")


        // newVar.wait().then((res)=>{
        //     console.log(res.logs[0].topics)
        // })
        // let response0=await proxy1.retrieve(accounts[0].address)
        // console.log(response0)
    });

    // it("test subscribe contract one sync time", async function () {
    //     this.timeout(50000000)
    //     const lockedAmount = 1000000000;
    //     const accounts = await hre.ethers.getSigners();
    //     const Proxy = await hre.ethers.getContractFactory("proxy");
    //     // const proxy = await Proxy.deploy();
    //     const proxy = await Proxy.deploy();
    //     let count=[
    //         // 1,
    //         // 5,
    //         // 10,
    //         // 15,
    //         // 20,
    //         // 30,
    //         40
    //     ]
    //     let result=[]
    //     for (let ii = 0; ii < count.length; ii++) {
    //         totaltime=0
    //         for (let i = 0; i <50; i++){
    //             console.log(contractaddr[0])
    //             let btime=new Date().getTime()
    //             process.stdout.write(`${i + 1} / ${contractaddr.length} \r`)
    //             const proxy1=proxy.attach(contractaddr[0])
    //             utils=hre.ethers.utils
    //             const pro=[]
    //             for (let index = 0; index <count[ii]; index++) {
    //                 pro.push(requestpass("sdfads"))
    //                 // sleep.msleep(500);
    //                 process.stdout.write(`${index + 1} / ${count[ii]} \r`)
    //             }
    //             await Promise.all(pro).then((res)=>{
    //                 console.log(res[0].body)
    //                 let etime=new Date().getTime()
    //                 totaltime+=etime-btime
    //             })
    //             console.log("\n")
    //         }
    //         result.push(totaltime/50)
    //     }
    //     console.log(result)
    //
    //     // newVar.wait().then((res)=>{
    //     //     console.log(res.logs[0].topics)
    //     // })
    //     // let response0=await proxy1.retrieve(accounts[0].address)
    //     // console.log(response0)
    // });

    // //测试主动同步数据
    // it("test subscribe contract one sync time", async function () {
    //     const lockedAmount = 1000000000;
    //     const accounts = await hre.ethers.getSigners();
    //     const Proxy = await ethers.getContractFactory("proxy");
    //     // const proxy = await Proxy.deploy();
    //     const proxy = await Proxy.deploy();
    //     const proxy1=proxy.attach('0x9356613adFf3a08975c6338b7a7f9D622b094ef3')
    //     utils=ethers.utils
    //     for (let i = 0; i <10; i++) {
    //         var newVar=await proxy1.set(accounts[1].address,
    //             utils.zeroPad(999,32));
    //     }
    //     // newVar.wait().then((res)=>{
    //     //     console.log(res.logs[0].topics)
    //     // })
    //     // let response0=await proxy1.retrieve(accounts[0].address)
    //     // console.log(response0)
    // });

});
