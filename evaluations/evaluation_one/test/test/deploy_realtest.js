
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");
require("@nomiclabs/hardhat-ethers");
const Web3 =  require("web3");
const {pub,newpub,SetOC,fiscopub,SetfiscoOC}=require("./pub.js")
const {sub}=require("./sub.js")
const {test_active}=require('./test_active.js')
const path =require('path')
const {request} = require('./request.js')
const { Configuration, Web3jService, CompileService, ENCRYPT_TYPE } = require('../../nodejs-sdk/packages/api');
const {
    EventLogService,
    TopicConvertor,
    hash,
    EVENT_LOG_FILTER_PUSH_STATUS
} = require('../../nodejs-sdk/packages/api');
const configuration = new Configuration(path.join(__dirname,"../conf/config.json"));
const eventLogService = new EventLogService(configuration);
const compileService = new CompileService(configuration);
const web3jService = new Web3jService(configuration);
async function sleep(time) {
    return new Promise(((resolve, reject) =>{
        setTimeout(()=>{
            resolve()
        },time)
    }))
}

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

    //获取注册好的fisco合约对象
    async function getdeploycontractinfisco(name,configname) {
        const lockedAmount = 1000000000;
        //获取编译对象，根据用户配置，进行连接正确的链
        const configuration0 = new Configuration(path.join(__dirname,"../conf/"+configname+".json"));
        const compileService0 = new CompileService(configuration0);
        const web3jService0 = new Web3jService(configuration0);
        //编译合约并获取对象
        const contractclass = await compileService0.compile(path.join(__dirname,"../contracts/"+name+".sol"));

        const contract = await contractclass.newInstance();
        // console.log(contractclass)
        await contract.$deploy(web3jService0).then(async (res)=>{
            console.log(res)
        },(err)=>{
            console.log("*****",err)
        });

        return contract;
    }

    async function registerOC(port,configname){
        /*
           * 初始化数据
           * */
        let utils = hre.ethers.utils;

        /*
        * 获取新部署的预言合约（State,Proxy）
        * */
        var State = await getdeploycontractinfisco("State",configname);
        var ProxyAccess = await getdeploycontractinfisco("ProxyAccess",configname);
        // console.log(State,ProxyAccess)

        /*
        * 初始化新的合约
        * */
        await ProxyAccess.setStateC(State.address);

        /*
        * 注册合约状态
        * */
        var eventsn = State.abi.events;
        eventsname=[]
        for (let eventsnKey in eventsn) {
            eventsname.push(eventsn[eventsnKey].name)
        }
        // console.log(eventsname)
        // 获取信息，进行注册
        await SetfiscoOC(port,ProxyAccess,"callsetstate",["callgetstate","callgetsign"],
            eventsname,"123456")
            .then((res)=> {
                console.log(res.data)
            },(errors)=>{
                console.log(errors)})
        setTimeout(()=>{},5000)
    }
    async function registerethOC(link,port){
        /*
           * 初始化数据
           * */
        let utils = hre.ethers.utils;
        var defaultProvider = new ethers.getDefaultProvider(link);
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
        await ProxyAccess.setStateC(State.address);

        /*
            * 注册合约状态
            * */
        var eventsn = State.interface.events;
        eventsname=[]
        for (let eventsnKey in eventsn) {
            eventsname.push(eventsn[eventsnKey].name)
        }
        // console.log(eventsname)
        // 获取信息，进行注册
        await SetOC(port,ProxyAccess,"callsetstate",["callgetstate","callgetsign"],
            eventsname,"123456")
            .then((res)=> {
                console.log(res.data)
            },(errors)=>{
                console.log(errors)})
        // setTimeout(()=>{},5000)
    }

    async function registertestcontract(contractname,port,Function,event,flag,configname){
        /*
           * 初始化数据
           * */
        let utils = hre.ethers.utils;

        /*
        * 获取新部署的测试合约
        * */
        var tmp = await getdeploycontractinfisco(contractname,configname);

        /*
        * 注册合约状态
        * */
        var eventsn = tmp.abi;
        eventsname=[]
        for (let i = 0; i < eventsn.length; i++) {
            if (eventsn[i].type==='event')
                eventsname.push(eventsn[i].name)
        }

        let CCSCHash,ChainHash;
        // console.log(eventsname)
        // 获取信息，进行注册
        await fiscopub(port,tmp,Function,event,flag,"123456").then((data)=>{
            console.log(data.data)
            CCSCHash=data.data.data.data.CCSChash
            ChainHash=data.data.data.data.ChainHash
            console.log(CCSCHash,ChainHash)
        })
        return {CCSCHash:CCSCHash,ChainHash:ChainHash}
    }
    async function registertestethcontract(link,contractname,port,Function,event,flag){
        /*
           * 初始化数据
           * */
        let utils = hre.ethers.utils;
        var defaultProvider = new ethers.getDefaultProvider(link);
        var dsigner = defaultProvider.getSigner();

        /*
        * 获取新部署的测试合约
        * */
        var tmp = await deploycontract(hre.ethers,dsigner,contractname);

        /*
        * 注册合约状态
        * */
        // var eventsn = tmp.abi;
        // eventsname=[]
        // for (let i = 0; i < eventsn.length; i++) {
        //     if (eventsn[i].type==='event')
        //         eventsname.push(eventsn[i].name)
        // }

        let CCSCHash,ChainHash;
        // 获取信息，进行注册   port,contract,Function,Event,Flag,password
        await newpub(port,tmp,Function,event,flag,"123456").then((data)=>{
            console.log(data.data)
            CCSCHash=data.data.data.data.CCSChash
            ChainHash=data.data.data.data.ChainHash
            console.log(CCSCHash,ChainHash)
        })
        return {CCSCHash:CCSCHash,ChainHash:ChainHash}
    }

    async function registerchain(port) {
        await request(port,"/registerchain",{password:"123456"}).then((res)=>{
            console.log(res.data)
        })
    }

    async function ethtestcontractdeploy(link,pport,sport=[]){
        const hashdata0 = await registertestethcontract(link,'Goldprice',pport,"getGoldprice",['SetGoldprice'],'0');
        const hashdata1 = await registertestethcontract(link,'Token',pport,"getbalence",['Sent'],'1');
        for (let i=0;i<sport.length;i++){
            await sub(sport[i],{
                ChainHash: hashdata0.ChainHash,
                CCSCHash: hashdata0.CCSCHash,
                Flag:"0",
                Preargs:[]
            }).then((res)=>{
                console.log(hashdata0)
                console.log(res.data)
            })

            await sub(sport[i],{
                ChainHash: hashdata1.ChainHash,
                CCSCHash: hashdata1.CCSCHash,
                Flag:"1",
                Preargs:["0xb2a2b029f219701af9ba1bfd6537bb8db91304b7"]
            }).then((res)=>{
                console.log(hashdata1)
                console.log(res.data)
            })
        }
    }
    async function fiscotestcontractdeploy(configname,pport,sport=[]){
        const hashdata0 = await registertestcontract('Goldprice',pport,"getGoldprice",['SetGoldprice'],'0',configname);
        const hashdata1 = await registertestcontract('Token',pport,"getbalence",['Sent'],'1',configname);
        for (let i=0;i<sport.length;i++){
            await sub(sport[i],{
                ChainHash: hashdata0.ChainHash,
                CCSCHash: hashdata0.CCSCHash,
                Flag:"0",
                Preargs:[]
            }).then((res)=>{
                console.log(hashdata0)
                console.log(res.data)
            })

            await sub(sport[i],{
                ChainHash: hashdata1.ChainHash,
                CCSCHash: hashdata1.CCSCHash,
                Flag:"1",
                Preargs:["0xb2a2b029f219701af9ba1bfd6537bb8db91304b7"]
            }).then((res)=>{
                console.log(hashdata1)
                console.log(res.data)
            })
        }
    }

    describe("Deployment contract   ", function () {

        // it("注册链",async function () {
        //     // await registerchain("3000")
        //     // await registerchain("3001")
        //     // await registerchain("3002")
        //     // await registerchain("3003")
        //     // await registerchain("3004")
        // })
        //
        // it("注册预言合约",async function () {
        //     //
        //     // await registerethOC("http://172.16.0.13:8640","3000")
        //     // await registerethOC("http://172.16.0.13:8645","3001")
        //     // await registerethOC("http://172.16.0.13:8647","3002")
        //     // await registerOC("3003","config")
        //     // await registerOC("3004","config1")
        // })

        it("注册订阅合约",async function () {
            this.timeout(50000000)
            //计数订阅的数量
            let count=60

            //实验一订阅
            for (let i = 0; i < count; i++) {
                //eth->eth 这里订阅一个
                await ethtestcontractdeploy("http://172.16.0.13:8640","3000",["3001","3002"])
                //eth->fisco
                await ethtestcontractdeploy("http://172.16.0.13:8645","3001",["3003","3004"])

                // await ethtestcontractdeploy("http://172.16.0.13:8640","3000",["3001","3002"])

                // await ethtestcontractdeploy("http://172.16.0.13:8645","3001",["3000","3002"])
                //fisco->eth
                // await fiscotestcontractdeploy("3002",["3000"])
                await fiscotestcontractdeploy("config","3003",["3000","3001"])
                sleep(1000);
            }
        })

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
        //     // await ProxyAccess.setStateC(State.address);
        //     var proxyAccess = await ProxyAccess.attach("0x647151e6f5212E48A9a6FeFB04B805bA1A1D1CFC");
        //
        //     /*
        //     * 注册合约状态
        //     * */
        //     // console.log(utils.arrayify("0x97865e1addfc456acf009326db8a2e47a34be558"))
        //     // await ProxyAccess.callgetstate("0x97865e1addfc456acf009326db8a2e47a34be558").then(console.log);
        //
        //     var newVar = await proxyAccess.callgetstate(utils.arrayify("0x2ae6d61dc3dac61f4e56021f4c2aeea13f98a353"));
        //     await newVar.wait().then((res)=>{
        //         console.log(proxyAccess.interface.parseLog(res.logs[0]).args)
        //     })
        //     var newVar1 = await proxyAccess.callgetstate(utils.arrayify("0xcd6d1e8417e0d237d1547c69c4bad9176ab84c0c"));
        //     await newVar1.wait().then((res)=>{
        //         console.log(proxyAccess.interface.parseLog(res.logs[0]).args)
        //     })
        //
        //     // await proxyAccess.callsetstate(utils.arrayify("0x97865e1addfc456acf009326db8a2e47a34be558"),
        //     //     utils.arrayify("0x132132"),
        //     //     utils.arrayify("0x465465"))
        //     // var newVar1 = await proxyAccess.callgetstate(utils.arrayify("0x97865e1addfc456acf009326db8a2e47a34be558"));
        //     // await newVar1.wait().then((res)=>{
        //     //     console.log(proxyAccess.interface.parseLog(res.logs[0]))
        //     // })
        //
        //
        // })
    });

});
