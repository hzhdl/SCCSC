
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");
require("@nomiclabs/hardhat-ethers");
const Web3 =  require("web3");
const {pub,newpub,SetOC}=require("./pub.js")
const {sub}=require("./sub.js")
const {test_active}=require('./test_active.js')

describe("proxy", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearLockFixture(ethers,signer) {
        const lockedAmount = 1000000000;

        // Contracts are deployed using the first signer/account by default
        const accounts = await ethers.getSigners();
        const Proxy = await ethers.getContractFactory("proxy");
        // console.log(Proxy.runner)
        var Proxyy = Proxy.connect(signer);
        // console.log(Proxyy.signer)
        const proxy = await Proxyy.deploy();


        return proxy;
    }
    async function deploycontract(ethers,signer,cname) {
        const lockedAmount = 1000000000;

        // Contracts are deployed using the first signer/account by default
        const accounts = await ethers.getSigners();
        const Proxy = await ethers.getContractFactory(cname);
        // console.log(Proxy.runner)
        var Proxyy = Proxy.connect(signer);
        // console.log(Proxyy.signer)
        const proxy = await Proxyy.deploy();


        return proxy;
    }


    describe("Deployment contract   ", function () {
        let CCSCHash=""
        let ChainHash=""

        // it("deploy Proxy and state contracts",async function () {
        //     /*
        //     * 初始化数据
        //     * */
        //     let utils = hre.ethers.utils;
        //     var defaultProvider = new ethers.getDefaultProvider("http://172.16.0.37:8640");
        //     var dsigner = defaultProvider.getSigner();
        //
        //     /*
        //     * 获取新部署的预言合约（State,Proxy）
        //     * */
        //     var State = await deploycontract(hre.ethers,dsigner,"State");
        //     var ProxyAccess = await deploycontract(hre.ethers,dsigner,"ProxyAccess");
        //     // console.log(State,ProxyAccess)
        //
        //     /*
        //     * 初始化新的合约
        //     * */
        //     await ProxyAccess.setStateC(State.address);
        //
        //     /*
        //     * 注册合约状态
        //     * */
        //     var eventsn = State.interface.events;
        //     eventsname=[]
        //     for (let eventsnKey in eventsn) {
        //         eventsname.push(eventsn[eventsnKey].name)
        //     }
        //     // console.log(eventsname)
        //     // 获取信息，进行注册
        //     await SetOC("3000",ProxyAccess,"callsetstate",["callgetstate","callgetsign"],
        //         eventsname,"123456")
        //         .then((res)=> {
        //             console.log(res.data)
        //         },(errors)=>{
        //             console.log(errors)})
        //     setTimeout(()=>{},5000)
        // })

        it("deploy Proxy and state contracts",async function () {
            /*
            * 初始化数据
            * */
            let utils = hre.ethers.utils;
            var defaultProvider = new ethers.getDefaultProvider("http://172.16.0.37:8640");
            var dsigner = defaultProvider.getSigner();

            /*
            * 获取新部署的预言合约（State,Proxy）
            * */
            var State = await deploycontract(hre.ethers,dsigner,"State");
            var ProxyAccess = await deploycontract(hre.ethers,dsigner,"ProxyAccess");
            // console.log(State,ProxyAccess)

            /*
            * 初始化新的合约
            * */
            // await ProxyAccess.setStateC(State.address);
            var proxyAccess = await ProxyAccess.attach("0x647151e6f5212E48A9a6FeFB04B805bA1A1D1CFC");

            /*
            * 注册合约状态
            * */
            // console.log(utils.arrayify("0x97865e1addfc456acf009326db8a2e47a34be558"))
            // await ProxyAccess.callgetstate("0x97865e1addfc456acf009326db8a2e47a34be558").then(console.log);

            var newVar = await proxyAccess.callgetstate(utils.arrayify("0x2ae6d61dc3dac61f4e56021f4c2aeea13f98a353"));
            await newVar.wait().then((res)=>{
                console.log(proxyAccess.interface.parseLog(res.logs[0]).args)
            })
            var newVar1 = await proxyAccess.callgetstate(utils.arrayify("0xcd6d1e8417e0d237d1547c69c4bad9176ab84c0c"));
            await newVar1.wait().then((res)=>{
                console.log(proxyAccess.interface.parseLog(res.logs[0]).args)
            })

            // await proxyAccess.callsetstate(utils.arrayify("0x97865e1addfc456acf009326db8a2e47a34be558"),
            //     utils.arrayify("0x132132"),
            //     utils.arrayify("0x465465"))
            // var newVar1 = await proxyAccess.callgetstate(utils.arrayify("0x97865e1addfc456acf009326db8a2e47a34be558"));
            // await newVar1.wait().then((res)=>{
            //     console.log(proxyAccess.interface.parseLog(res.logs[0]))
            // })


        })

        // it("deploy contract  and register contracts function", async function () {
        //
        //     let utils = hre.ethers.utils;
        //     var defaultProvider = new ethers.getDefaultProvider("http://172.16.0.37:8640");
        //     var dsigner = defaultProvider.getSigner();
        //     var defaultProvider1 = new ethers.getDefaultProvider("http://172.16.0.37:8645")
        //     var dsigner1 = defaultProvider1.getSigner();
        //
        //     const Token = await deploycontract(hre.ethers,dsigner,"Token");
        //     const Goldprice = await deploycontract(hre.ethers,dsigner,"Goldprice");
        //
        //     // 获取信息，进行注册   port,contract,Function,Event,Flag,password
        //     await newpub("3000",Goldprice,"getGoldprice",['SetGoldprice'],'0',"123456").then((data)=>{
        //         console.log(data.data)
        //         CCSCHash=data.data.data.data.CCSChash
        //         ChainHash=data.data.data.data.ChainHash
        //         console.log(CCSCHash,ChainHash)
        //     })
        //
        //
        //     await sub('3000',{
        //         ChainHash: ChainHash,
        //         CCSCHash: CCSCHash,
        //         Flag:"0",
        //         Realargs:[]
        //     }).then((res)=>{
        //         console.log(CCSCHash,ChainHash)
        //         console.log(res.data)
        //     })
        // });
        //
        //
        // it("deploy contract  and register contracts function", async function () {
        //
        //     let utils = hre.ethers.utils;
        //     var defaultProvider = new ethers.getDefaultProvider("http://172.16.0.37:8640");
        //     var dsigner = defaultProvider.getSigner();
        //     var defaultProvider1 = new ethers.getDefaultProvider("http://172.16.0.37:8645")
        //     var dsigner1 = defaultProvider1.getSigner();
        //
        //     const Token = await deploycontract(hre.ethers,dsigner,"Token");
        //
        //     // 获取信息，进行注册   port,contract,Function,Event,Flag,password
        //     await newpub("3000",Token,"getbalence",['Sent'],'1',"123456").then((data)=>{
        //         CCSCHash=data.data.data.data.CCSChash
        //         ChainHash=data.data.data.data.ChainHash
        //     })
        //
        //
        //     await sub('3000',{
        //         ChainHash: ChainHash,
        //         CCSCHash: CCSCHash,
        //         Flag:"1",
        //         Preargs:['0x009A77B77c1Bd10F6bd6ce0C76B6a06c1Df5E8AE']
        //     }).then((res)=>{
        //         console.log(CCSCHash,ChainHash)
        //         console.log(res.data)
        //     })
        // });



        // it("subscribe contract", async function () {
        //     // console.log(CCSCHash,ChainHash)
        //     await sub({
        //         ChainHash: ChainHash,
        //         CCSCHash: CCSCHash,
        //         Flag:"2",
        //         Realargs:[
        //             {name: "a",value:"123"},
        //             {name: "b",value:"456"}
        //         ]
        //     }).then((res)=>{
        //         console.log(CCSCHash,ChainHash)
        //         console.log(res.data)
        //     })
        //
        // });

        // it("test subscribe contract one sync time", async function () {
        //     // console.log(CCSCHash,ChainHash)
        //     await test_active({
        //         ChainHash:ChainHash,
        //         CCSCHash:CCSCHash,
        //         Result: {amount:"15646"},
        //         count: 100
        //     }).then((res)=>{
        //         console.log(res.data)
        //     })
        //
        // });

    });

});
