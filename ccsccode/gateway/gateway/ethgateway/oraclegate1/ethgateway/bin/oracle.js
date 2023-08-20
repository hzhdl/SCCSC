
var {ethws,link} = require('../app');
const ccscconfig=require('../config/ccscconfig.js')
const {activeSync,halfactiveSync,passiveaccess
} = require('../service/index.js');
const {
    storageChainconfig, storageccscconfig, getchainconfig,  getCCSCdatawithHash, getallinfo,
    getactiveCCSC
}= require('../service/store.js')

const req=(res,i,time1)=>{
    return new Promise((resolve, reject) => {
        /*预留访问位置，此处为res.CCSCdatas预留处理位置，为Result字段赋值*/
        // console.log("dsfsdafsdafsd")
        res[1][i].data=null
        res[1][i].Result=[{
            ChainHash: "",
            data: "testtesttest"
        }]
        res[1][i].TchainStime=time1
        /*以异步并发方式发起请求处理*/
        activeSync({
            chaindata: res[0],
            CCSCdatas: res[1][i]
        }).then(()=>{
            resolve()
        })
    })
}
const halfreq=(res,i,time1)=>{
    return new Promise((resolve, reject) => {
        /*预留访问位置，此处为res.CCSCdatas预留处理位置，为Result字段赋值*/
        // console.log(res[1][i])
        res[1][i].data=null
        res[1][i].Result=[{}]
        res[1][i].TchainStime=time1
        /*以异步并发方式发起请求处理*/
        halfactiveSync({
            chaindata: res[0],
            CCSCdatas: res[1][i]
        }).then(()=>{
            resolve()
        })
    })
}
const passivereq=(res,ccsc,time1)=>{
    return new Promise((resolve, reject) => {
        /*预留访问位置，此处为res.CCSCdatas预留处理位置，为Result字段赋值*/
        // console.log(res[1][i])
        res.data=null
        res.Result=[{}]
        res.SchainStime=time1
        /*以异步并发方式发起请求处理*/
        resolve(
            passiveaccess({
                chaindata: res,
                CCSCdatas: ccsc
            })
        )
    }).then((res)=>{
        console.log(res)
    })
}
/*
* 配置更新，当链上事件发生时，进行更新。
* */
var subscription = ethws.eth.subscribe('newBlockHeaders', function(error, result){
    if (!error) {
        console.log("no error");
        return;
    }
    console.error(error);
})
    .on("connected", function(subscriptionId){
        console.log("subscribe link:", link);
        console.log("subscribe ID :",subscriptionId);
    })
    .on("data",async function(blockHeader){
        console.log("new blockhash："+blockHeader.hash);
        //优化并发请求，优化数据库访问，仅访问一次
        var time = new Date().getTime();
        await Promise.all([getchainconfig(),getactiveCCSC()])
            .then((res)=>{
                actives=[]
                var time1 = new Date().getTime();
                console.log("数据访问耗时",time1-time)
                // console.log(res[1])
                res[1].forEach((item,i)=>{
                    // console.log(item)
                    if (item.Flag=="0"){
                        // actives.push(req(res,i,time1))
                    }else if (item.Flag=="1"){
                        // actives.push(halfreq(res,i,time1))
                    }else {
                        // actives.push(passivereq(res,i,time1))
                    }

                })
                console.log("生成请求耗时",new Date().getTime()-time)
            })
    })
    .on("error", console.error);

const args={
    address: '0x1C9868d312361aaF57e047c97B05e15eFb775E86',
    topics: [
        '0x440c46490705db9a864dc31bdad678e88117017a67de18172dcb7520872b5dd9'
    ]
}
var subscription = ethws.eth.subscribe('logs',
    args, function(error, result){
    // if (!error)
    //     console.log(result);
})
    .on("connected", function(subscriptionId){
        console.log(subscriptionId);
    })
    .on("data",async function(log){
        console.log("blockhash:",log.blockHash)
        //优化并发请求，优化数据库访问，仅访问一次
        var time = new Date().getTime();
        await Promise.all([getchainconfig()])
            .then((res)=>{
                actives=[]
                var time1 = new Date().getTime();
                console.log("数据访问耗时",time1-time)
                var ccscdata=ccscconfig.CCSC['440c46490705db9a864dc31bdad678e88117017a67de18172dcb7520872b5dd9']
                ccscdata.forEach((item,index)=>{
                    // console.log(res[0])
                    actives.push(passivereq(res[0],item,time1))
                })
                console.log("生成请求耗时",new Date().getTime()-time)
            })
    })
    .on("changed", function(log){
    });
