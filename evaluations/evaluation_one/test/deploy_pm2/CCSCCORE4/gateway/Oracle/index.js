const wsconfig=require('../config/ethconfig')
const path = require('path')

const {storeOC,GetOC} = require('../service/store.js')

const Configuration = require('../../nodejs-sdk/packages/api').Configuration;
const configuration = new Configuration(path.join(__dirname, "../config/fiscoconfig.json"));

const CompileService = require('../../nodejs-sdk/packages/api').CompileService;

const Web3jService = require('../../nodejs-sdk/packages/api').Web3jService;
const web3jService = new Web3jService(configuration);
const utils = require('ethers').utils
const ethers = require('ethers')


const GetResFromContract = async (res,Flag="0",Args=[]) => {

    var blockheight = null
    await web3jService.getBlockNumber().then((res)=>{
        blockheight = res.result
    });
    const compileService = new CompileService(configuration);
    const Clientcontract = compileService.GetContractClassByABI("clientcontract",res.ABI);
    const clientcontract = Clientcontract.newInstance();
    clientcontract.$load(web3jService,res.Address)
    // console.log(blockheight)
    // console.log(contract)
    var newVar;
    if (Flag==="0"){
        //主动同步认为是不带参情况
        newVar = await clientcontract[res.FunctionName]();
    }
    else if (Flag==="1"){
        //半主动同步认为是带参的不更改访问
        if (typeof Args!== typeof []||Args===[])
            return "请检查你的参数，参数不正确！"
        // console.log(Args)
        newVar = await clientcontract[res.FunctionName](...Args)
        let ress=[]
        // console.log(newVar)
        let num=ethers.BigNumber.from(newVar[0])
        ress.push({
            data:newVar,
            hex:num.toHexString()
        })
        newVar=ress
        console.log(newVar)
    }
    // console.log(typeof newVar)
    var data= newVar
    return {
        time: new Date().getTime(),
        BlockHeight: blockheight===undefined?-1:blockheight,
        ChainHash: res.ChainHash,
        data: data
    };
}

const SetResToOracleContract = async (res,Flag='0') => {


    var OC=await GetOC()
    // console.log(OC)
    const compileService = new CompileService(configuration);
    const OCcontract = compileService.GetContractClassByABI("OCcontract",OC[0].ABI);
    const occontract = OCcontract.newInstance();
    occontract.$load(web3jService,OC[0].Address)
    // console.log(OC[0])
//    开始向合约中上传数据，这里属于预言层，需要根据实际的链来更改，这里我们使用我们的demo合约来做适配。
//     console.log('0x'+res.input.CCSCHash.substring(0,10))
    var state=null
    // console.log(Flag)

    // console.log(JSON.parse(res.Result))
    if (Flag!=='0'){
        state=JSON.parse(res.Result).result.data[0].hex
    }else {
        state=JSON.parse(res.Result).data[0]
    }

    console.log(JSON.parse(res.Result))
    return occontract[OC[0].SetFunctionName](
        utils.arrayify('0x'+res.input.CCSCHash.substring(0,40)),
        utils.arrayify(state),
        utils.base64.decode(res.Msignature)
)
}

// UPdatatochain()

module.exports={GetResFromContract,SetResToOracleContract}
