
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const hre = require("hardhat");
require("@nomiclabs/hardhat-ethers");
const Web3 =  require("web3");
const {pub}=require("./pub.js")
const {sub}=require("./sub.js")
const {test_active}=require('./test_active.js')
const path = require('path')
const Configuration = require('../../nodejs-sdk/packages/api').Configuration;
const configuration = new Configuration(path.join(__dirname, "../config/fiscoconfig.json"));

const CompileService = require('../../nodejs-sdk/packages/api').CompileService;
const compileService = new CompileService(configuration);

const Web3jService = require('../../nodejs-sdk/packages/api').Web3jService;


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
    async function getdeploycontractinfisco(name) {
        const lockedAmount = 1000000000;
        const url=path.
        //编译合约并获取对象
        const contractclass = await CompileService.compile(path.join(__dirname,"../contracts/"+name+".sol"));
        const contract = contractclass.newInstance();
        await contract.$deploy();

        return contract;
    }

    describe("test fiscocode",()=>{
        it('regitster contract', async function () {
            const deploycontractinfisco = getdeploycontractinfisco("State");
            console.log(deploycontractinfisco.Address);

        }
    })

    // describe("deploy state and proxyaccess",()=>{
    //     it('should deploy', async function () {
    //         let utils = hre.ethers.utils;
    //         var defaultProvider = new ethers.getDefaultProvider("http://172.16.0.37:8640");
    //         var dsigner = defaultProvider.getSigner();
    //         var State = await hre.ethers.getContractFactory("State");
    //         var ProxyAccess = await hre.ethers.getContractFactory("ProxyAccess");
    //
    //         var connect = State.connect(dsigner);
    //         var connect1 = ProxyAccess.connect(dsigner);
    //
    //         var state = await connect.deploy();
    //         var proxyaccess = await connect1.deploy();
    //
    //         console.log(state.address)
    //         console.log(proxyaccess.address)
    //
    //         await proxyaccess.setStateC(state.address);
    //         var r1 = await proxyaccess.callgetstate(utils.arrayify("0x440c46490705db9a864dc31bdad678e88117017a"));
    //         // console.log(proxyaccess.interface.format(utils.FormatTypes.json) );
    //         await r1.wait().then((res)=>{
    //             console.log(res.events[0].args['result'])
    //         })
    //
    //         await proxyaccess.callsetstate(utils.arrayify("0x440c46490705db9a864dc31bdad678e88117017a"),utils.arrayify("0xffffff"),utils.arrayify("0xeeeeeeeeee"))
    //         var r2 = await proxyaccess.callgetstate(utils.arrayify("0x440c46490705db9a864dc31bdad678e88117017a"));
    //         await r2.wait().then((res)=>{
    //             console.log(res.events[0].args['result'])
    //             // console.log(utils.hexValue(utils.arrayify(res.events[0].args['result'])))
    //             // console.log(res.events[0])
    //         })
    //         // 0x639c1E7d987e7bbdbfF318F7d7817d03A38B9604
    //         // 0x941194Bd76a5e0Db3D67c096fcC1Fb15B40b17D7
    //
    //         var contract = new ethers.Contract(proxyaccess.address,proxyaccess.interface,dsigner);
    //         // console.log(JSON.parse(proxyaccess.interface.format(utils.FormatTypes.json)))
    //         // console.log(proxyaccess.interface)
    //         await contract.functions['callsetstate'](utils.arrayify("0x440c46490705db9a864dc31bdad678e88117017a"),utils.arrayify("0x465789"),utils.arrayify("0xeeeeeeeeee"));
    //         console.log(contract)
    //         var res3 = await proxyaccess.functions['callgetstate'](utils.arrayify("0x440c46490705db9a864dc31bdad678e88117017a"));
    //         console.log(contract.functions)
    //         await res3.wait().then((res)=>{
    //             console.log(res.events[0].args['result'])
    //             // console.log(utils.hexValue(utils.arrayify(res.events[0].args['result'])))
    //             // console.log(res.events[0])
    //         })
    //     });
    // })


    // describe("Deployment contract   ", function () {
    //     let CCSCHash=["","","","","","",""]
    //     let ChainHash=["","","","","","",""]
    //
    //     it("deploy contract  and register contracts function", async function () {
    //         //部署五个合约
    //         let utils = hre.ethers.utils;
    //         var defaultProvider = new ethers.getDefaultProvider("http://172.16.0.37:8640");
    //         var dsigner = defaultProvider.getSigner();
    //
    //         const proxy0 = await deployOneYearLockFixture(hre.ethers,dsigner);
    //         const proxy1 = await deployOneYearLockFixture(hre.ethers,dsigner);
    //         // const proxy2 = await deployOneYearLockFixture(hre.ethers,dsigner);
    //         // const proxy3 = await deployOneYearLockFixture(hre.ethers,dsigner);
    //         // const proxy4 = await deployOneYearLockFixture(hre.ethers,dsigner);
    //         // const proxy5 = await deployOneYearLockFixture(hre.ethers,dsigner);
    //         // const proxy6 = await deployOneYearLockFixture(hre.ethers,dsigner);
    //         const contracts=[]
    //         // contracts.push(proxy0,proxy1,proxy2,proxy3,proxy4,proxy5)
    //         contracts.push(proxy0,proxy1)
    //         console.log(contracts.length)
    //         // ChainHash=res2.data.data.data.ChainHash;
    //         // CCSCHash=res2.data.data.data.CCSChash;
    //      // 获取信息，进行注册
    //         for (let index = 0; index <2; index++) {
    //             await pub("3000",{
    //                 address: contracts[index].address,
    //                 functionname: contracts[index].interface.functions['set(address,bytes32)'].name,
    //                 paramlist: contracts[index].interface.functions['set(address,bytes32)'].inputs,
    //                 Flag: index%2==0?"0":"1",
    //                 password:"123456"
    //             }).then((res)=> {
    //                 console.log("proxy"+index+"注册",res.msg)
    //                 ChainHash[index]=res.data.data.data.ChainHash
    //                 CCSCHash[index]=res.data.data.data.CCSChash;
    //             })
    //             // setTimeout(()=>{},1000)
    //         }
    //
    //         // await pub("3001",{
    //         //     address: proxy6.address,
    //         //     functionname: proxy6.interface.functions['set(address,bytes32)'].name,
    //         //     paramlist: proxy6.interface.functions['set(address,bytes32)'].inputs,
    //         //     Flag: "2",
    //         //     password:"123456"
    //         // }).then((res)=> {
    //         //     console.log("proxy6注册",res.msg)
    //         //     ChainHash[6]=res.data.data.data.ChainHash
    //         //     CCSCHash[6]=res.data.data.data.CCSChash;
    //         // })
    //         // setTimeout(()=>{},5000)
    //     });
    //
    //     it("subscribe contract", async function () {
    //         console.log(CCSCHash,ChainHash)
    //         await sub("3001",{
    //             ChainHash: ChainHash[0],
    //             CCSCHash: CCSCHash[0],
    //             Flag:"0",
    //         })
    //         await sub("3001",{
    //             ChainHash: ChainHash[1],
    //             CCSCHash: CCSCHash[1],
    //             Flag:"1",
    //             Realargs:[
    //                 {name: "testa",value:"23"},
    //                 {name: "testb",value:"456"}
    //             ]
    //         })
    //         // for (let i = 1; i <=40; i++) {
    //         //     await sub("300"+i.toString(),{
    //         //         ChainHash: ChainHash[0],
    //         //         CCSCHash: CCSCHash[0],
    //         //         Flag:"0",
    //         //     })
    //         //     await sub("300"+i.toString(),{
    //         //         ChainHash: ChainHash[1],
    //         //         CCSCHash: CCSCHash[1],
    //         //         Flag:"1",
    //         //         Realargs:[
    //         //             {name: "testa",value:"23"},
    //         //             {name: "testb",value:"456"}
    //         //         ]
    //         //     })
    //         //
    //         //     if(i>10){
    //         //         await sub("300"+i.toString(),{
    //         //             ChainHash: ChainHash[2],
    //         //             CCSCHash: CCSCHash[2],
    //         //             Flag:"0",
    //         //         })
    //         //         await sub("300"+i.toString(),{
    //         //             ChainHash: ChainHash[3],
    //         //             CCSCHash: CCSCHash[3],
    //         //             Flag:"1",
    //         //             Realargs:[
    //         //                 {name: "testa",value:"23"},
    //         //                 {name: "testb",value:"456"}
    //         //             ]
    //         //         })
    //         //     }
    //         //     if (i>25){
    //         //         await sub("300"+i.toString(),{
    //         //             ChainHash: ChainHash[4],
    //         //             CCSCHash: CCSCHash[4],
    //         //             Flag:"0",
    //         //         })
    //         //         await sub("300"+i.toString(),{
    //         //             ChainHash: ChainHash[5],
    //         //             CCSCHash: CCSCHash[5],
    //         //             Flag:"1",
    //         //             Realargs:[
    //         //                 {name: "testa",value:"23"},
    //         //                 {name: "testb",value:"456"}
    //         //             ]
    //         //         })
    //         //     }
    //         // }
    //     });
    //
    //     // it("test subscribe contract one sync time", async function () {
    //     //     // console.log(CCSCHash,ChainHash)
    //     //     await test_active({
    //     //         ChainHash:ChainHash,
    //     //         CCSCHash:CCSCHash,
    //     //         Result: {amount:"15646"},
    //     //         count: 100
    //     //     }).then((res)=>{
    //     //         console.log(res.data)
    //     //     })
    //     //
    //     // });
    //
    // });

});
