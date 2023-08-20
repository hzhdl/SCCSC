const wsconfig=require('../config/ethconfig')

const Web3=require('web3')
const  ethers=require('ethers')
const {storeOC,GetOC} = require('../service/store.js')
// const {CCSC} = require("./mongoop");
const link="http://"+wsconfig.default.ip + ":" +wsconfig.default.hport


const GetResFromContract = async (res,Flag="0",Args=[]) => {
    let utils = ethers.utils;
    var defaultProvider = new ethers.getDefaultProvider(link);
    var dsigner = defaultProvider.getSigner();
    var contract = new ethers.Contract(res.Address,JSON.parse(res.ABI),dsigner);
    var blockheight = await defaultProvider.getBlockNumber();
    // console.log(blockheight)
    // console.log(contract)
    var newVar;
    if (Flag==="0"){
        //主动同步认为是不带参情况
        newVar = await contract.functions[res.FunctionName]();
    }
    else if (Flag==="1"){
        //半主动同步认为是带参的不更改访问
        if (typeof Args!== typeof []||Args===[])
            return "请检查你的参数，参数不正确！"
        // console.log(Args)
        newVar = await contract.functions[res.FunctionName](...Args)
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
    let utils = ethers.utils;
    var defaultProvider = new ethers.getDefaultProvider(link);
    var dsigner = defaultProvider.getSigner();
    var OC=await GetOC()
    // console.log(OC[0])
    var contract = new ethers.Contract(OC[0].Address,JSON.parse(OC[0].ABI),dsigner);
//    开始向合约中上传数据，这里属于预言层，需要根据实际的链来更改，这里我们使用我们的demo合约来做适配。
//     console.log('0x'+res.input.CCSCHash.substring(0,10))
    var state=null
    // console.log(Flag)
    if (Flag!=='0'){
        state=JSON.parse(res.Result).result.data[0].hex
    }else {
        state=JSON.parse(res.Result).data[0]
    }
    console.log(JSON.parse(res.Result))
    return contract.functions[OC[0].SetFunctionName](
        utils.arrayify('0x'+res.input.CCSCHash.substring(0,40)),
        utils.arrayify(state),
        utils.base64.decode(res.Msignature)
)


}

// UPdatatochain()

module.exports={GetResFromContract,SetResToOracleContract}
