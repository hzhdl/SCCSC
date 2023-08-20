const Web3=require('web3')
const abi =require('../contract/abi.js')
const ethconfig=require('../config/ethconfig.js')

const hlink="http://"+ethconfig.default.ip+":" +ethconfig.default.hport
const wlink="ws://"+ethconfig.default.ip+":" +ethconfig.default.wport


const getweb3http = () => {
    return new Web3(hlink)
}
const getweb3ws = () => {
    return  new Web3(wlink)
}

/*
* 数据分析并上链
* */
const Updatachain = (data) => {
    var web3http = getweb3http();
    console.log(hlink)
    // var contract = new web3http.eth.Contract(abi,'0x8019CF26f8c514eadCe6386d56bd6312a6512285');
    // contract.methods.retrieve("0xE2612d75e9BEBe8924d1d3e92a0003876eF113fa").call().then((res)=>{
    //     console.log(res)
    // })
}

//TODO 这里考虑几个问题
// 1.对于链上的存在性证明，都有哪些方式？
// 2.这些方式存在哪些弊端？
// 3.有没有相似的问题，其他场景如何解决

/*
* 存在性证明检查
*   1.merkle证明
*   2.零知识证明
*   3.other
* */
const checkproof = (data,proof) => {

}

/*
*
* */


module.exports = {getweb3ws,getweb3http,Updatachain,checkproof}
