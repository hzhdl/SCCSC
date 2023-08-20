const {mongoose,Chain,CCSC}=require('../service/mongoop.js')
const {
    storageChainconfig, storageccscconfig, getchainconfig,  getCCSCdatawithHash, getallinfo
}=require('../service/store.js')


const data={
    ChainHash: "sdfasdfasfdgcxvbuyiuy",
    Address: "String",
    ChainName: "String",
    ChainID: "String",
    "pk":"String",
    "sk":"String",
    "Spk":"486741",
}
const data1={
    ChainHash: "String",
    CCSChash: "65sdfg423fc1vx1gb65ds",
    Address: "String",
    FunctionName: "String",
    Flag: "String",
    ParamList:{a:"3sad1f35sd14f3s2daf685sa"},
    pk: "String",
    sk: "String",
    Spk: 'String',
}

const json={
    a:123465,
    b:"657465dsf"
}
var time = new Date().getTime();
CCSC.find({},{
    ChainHash: 1,
    Address: 1,
    sk: 1,
    Spk: 1,
    pk: 1
}).limit(1).then((err,docs)=>{
    console.log(err[0])
    console.log(new Date().getTime()-time)
})
// getchainconfig()
// getchainconfig()
// getchainconfig()
// getchainconfig()
// getCCSCdatawithHash("749e64cfa9bcd62ba927c0633902beed343fc45d2aab006288136e6cfcdc8c0d3b7909af914277ce7bda5389e6179e5508b36e93fbca2c5e686874ce852a433e")
// let time1=new Date().getTime()
// Chain.find({},(err,docs)=>{
//     console.log("查询链1耗时",new Date().getTime()-time)
// })
// let time2=new Date().getTime()
// Chain.find({},(err,docs)=>{
//     console.log("查询链2耗时",new Date().getTime()-time)
// })
// console.log(instance);
//
// instance.save((error)=>{
//     if (error!=null)
//         console.log(error)
// })
// MyModel.find({},(err,docs)=>{
//     console.log(docs)
// })
