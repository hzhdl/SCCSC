
var {ethws,link} = require('../app');
const ccscconfig=require('../config/ccscconfig.js')
const {activeSync,halfactiveSync,passiveaccess
} = require('../service/index.js');
const {
    storageChainconfig, storageccscconfig, getchainconfig,  getCCSCdatawithHash, getallinfo,
    getactiveCCSC,storagepassivetime,getOraclesubCCSC
}= require('../service/store.js')
const {GetResFromContract}=require("../Oracle/index")

const req=(res,time1)=>{
    return new Promise(async (resolve, reject) => {
        /*预留访问位置，此处为res.CCSCdatas预留处理位置，为Result字段赋值*/
        // console.log("dsfsdafsdafsd")
        var result=await GetResFromContract(res[1])
        res[1].data=null
        res[1].Result=[result]
        res[1].TchainStime=time1
        /*以异步并发方式发起请求处理*/
        resolve(
            activeSync({
                chaindata: res[0],
                CCSCdatas: res[1]
            })
        )
    })
}
const halfreq=(res,time1)=>{
    return new Promise(async (resolve, reject) => {
        /*预留访问位置，此处为res.CCSCdatas预留处理位置，为Result字段赋值*/
        // console.log(res[1][i])
        // var result=await GetResFromContract(res[1])
        res[1].data=null
        res[1].Result=[{}]
        res[1].TchainStime=time1
        /*以异步并发方式发起请求处理*/
        resolve(
            halfactiveSync({
                chaindata: res[0],
                CCSCdatas: res[1]
            })
        )
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
        // console.log(res)
        return res.data
    })
}


/*
* 配置更新，当链上事件发生时，进行更新。
* */
// var subscription = ethws.eth.subscribe('newBlockHeaders', function(error, result){
//     if (!error) {
//         console.log("no error");
//         return;
//     }
//     console.error(error);
// })
//     .on("connected", function(subscriptionId){
//         console.log("subscribe link:", link);
//         console.log("subscribe ID :",subscriptionId);
//     })
//     .on("data",async function(blockHeader){
//         console.log("new blockhash："+blockHeader.hash);
//         //优化并发请求，优化数据库访问，仅访问一次
//         var time = new Date().getTime();
//         await Promise.all([getchainconfig(),getactiveCCSC()])
//             .then((res)=>{
//                 actives=[]
//                 var time1 = new Date().getTime();
//                 // console.log("数据访问耗时",time1-time)
//                 // console.log(res[1])
//                 res[1].forEach((item,i)=>{
//                     // console.log(item)
//                     if (item.Flag=="0"){
//                         // console.log(item);
//                         actives.push(req(res,i,time1))
//                     }else if (item.Flag=="1"){
//                         // actives.push(halfreq(res,i,time1))
//                     }else {
//                         // actives.push(passivereq(res,i,time1))
//                     }
//                 })
//                 console.log("生成请求耗时",new Date().getTime()-time)
//             })
//     })
//     .on("error", console.error);

/*
* 主动同步多订阅触发
* */
const activemulti =async (log,hash) => {
    // 优化并发请求，优化数据库访问，仅访问一次
        var time = new Date().getTime();
        await Promise.all([getchainconfig(),getCCSCdatawithHash(hash)])
            .then((res)=>{
                // console.log(res[1])
                actives=[]
                var time1 = new Date().getTime();
                actives.push(req(res,time))
                console.log("生成请求耗时",new Date().getTime()-time)
            })
}

/*
* 主动同步多订阅触发
* */
const halfactivemulti =async (log,hash) => {
// 优化并发请求，优化数据库访问，仅访问一次
    var time = new Date().getTime();
    await Promise.all([getchainconfig(),getCCSCdatawithHash(hash)])
        .then((res)=>{
            // console.log(res[1])
            actives=[]
            var time1 = new Date().getTime();
            actives.push(halfreq(res,time))
            console.log("生成请求耗时",new Date().getTime()-time)
        })
}

/*
* 主动同步多订阅触发
* */
const passivemulti =async (log,data) => {
    //优化并发请求，优化数据库访问，仅访问一次
    var time = new Date().getTime();
    return Promise.all([getchainconfig()])
        .then((res)=>{
            actives=[]
            var time1 = new Date().getTime();
            console.log("数据访问耗时",time1-time)
            var ccscdata=ccscconfig.CCSC['440c46490705db9a864dc31bdad678e88117017a67de18172dcb7520872b5dd9']
            ccscdata.forEach((item,index)=>{
                // console.log(res[0])
                actives.push(passivereq(res[0],item,time))
            })
            console.log("生成请求耗时",new Date().getTime()-time)
            return Promise.all(actives)
        })
        .then((res)=>{
            // console.log(res)
            var time2 = new Date().getTime();
            res.forEach((item,index)=>{
                // console.log(JSON.parse(item))
                var parse = JSON.parse(item);
                parse.Time.EndTime=time2
                parse.Time.Alltime=time2-parse.Time.SchainStime
                storagepassivetime(parse)
            })
        })
}
/*
* 新型订阅，根据数据库的存储数据自动进行订阅，根据标志位实现区分是否订阅
* */
const subdata=getOraclesubCCSC()
subdata.then((res)=>{
    res.forEach(async (item,index)=>{
        if (item.Flag==="0"){
            await ethws.eth.subscribe('logs', {address:item.Address,topics:item.Topic}, function(error, result){
                if (error)
                    console.log(error);
            })
                .on("connected", function(subscriptionId){
                    console.log("已订阅：",item.Address,"\n访问类型为：",item.Flag,"\n订阅ID为：",subscriptionId,"\nTopics为：",item.Topic);
                })
                .on("data", (log) => {
                    // console.log(CCSChash)
                    activemulti(log,item.CCSChash||"")
                })
                .on("changed", function(log){
                });
        }else if (item.Flag==="1"){
            await ethws.eth.subscribe('logs', {address:item.Address,topics:item.Topic}, function(error, result){
                if (error)
                    console.log(error);
            })
                .on("connected", function(subscriptionId){
                    console.log("已订阅：",item.Address,"\n访问类型为：",item.Flag,"\n订阅ID为：",subscriptionId,"\nTopics为：",item.Topic);
                })
                .on("data", (log) => halfactivemulti(log,item.CCSChash||""))
                .on("changed", function(log){
                });
        }else {
            // console.log({address:item.Address,Topic:item.Topic})
            // await ethws.eth.subscribe('logs', {address:item.Address,topics:item.Topic}, function(error, result){
            //         if (error)
            //             console.log(error);
            //     })
            //     .on("connected", function(subscriptionId){
            //         console.log("已订阅：",item.Address,"\n访问类型为：",item.Flag,"\n订阅ID为：",subscriptionId);
            //     })
            //     .on("data", (log) => passivemulti(log,item.CCSChash||""))
            //     .on("changed", function(log){
            //     });
        }
    })
},(error)=>{
    console.log(error)
    console.log("Oracle layer start fail!")
})

// if (ccscconfig!==undefined&&ccscconfig!==null&&ccscconfig.Subargs!==undefined){
//     let callfun;
//     ccscconfig.Subargs.forEach((item,index)=>{
//         if (item.flag==="0"){
//             ethws.eth.subscribe('logs',
//                 item.args, function(error, result){
//                     // if (!error)
//                     //     console.log(result);
//                 })
//                 .on("connected", function(subscriptionId){
//                     console.log("已订阅：",item.args.address,"\n访问类型为：",item.flag,"\n订阅ID为：",subscriptionId);
//                 })
//                 .on("data", (log) => activemulti(log,item.CCSCHash||""))
//                 .on("changed", function(log){
//                 });
//         }else if (item.flag==="1"){
//             ethws.eth.subscribe('logs',
//                 item.args, function(error, result){
//                     // if (!error)
//                     //     console.log(result);
//                 })
//                 .on("connected", function(subscriptionId){
//                     console.log("已订阅：",item.args.address,"\n访问类型为：",item.flag,"\n订阅ID为：",subscriptionId);
//                 })
//                 .on("data", (log) => halfactivemulti(log,item.CCSCHash||""))
//                 .on("changed", function(log){
//                 });
//         }else {
//             ethws.eth.subscribe('logs',
//                 item.args, function(error, result){
//                     // if (!error)
//                     //     console.log(result);
//                 })
//                 .on("connected", function(subscriptionId){
//                     console.log("已订阅：",item.args.address,"\n访问类型为：",item.flag,"\n订阅ID为：",subscriptionId);
//                 })
//                 .on("data", (log) => passivemulti(log,item.CCSCHash||""))
//                 .on("changed", function(log){
//                 });
//         }
//
//     })
//
// }else {
//     console.log("请检查多订阅配置！！！")
// }

// /*
// * 触发多订阅的主动同步
// * */
// var subscription = ethws.eth.subscribe('logs',
//     args, function(error, result){
//     // if (!error)
//     //     console.log(result);
// })
//     .on("connected", function(subscriptionId){
//         console.log(subscriptionId);
//     })
//     .on("data",async function(log){
//         console.log("blockhash:",log.blockHash)
//         //优化并发请求，优化数据库访问，仅访问一次
//         var time = new Date().getTime();
//         await Promise.all([getchainconfig()])
//             .then((res)=>{
//                 actives=[]
//                 var time1 = new Date().getTime();
//                 console.log("数据访问耗时",time1-time)
//                 var ccscdata=ccscconfig.CCSC['440c46490705db9a864dc31bdad678e88117017a67de18172dcb7520872b5dd9']
//                 ccscdata.forEach((item,index)=>{
//                     // console.log(res[0])
//                     actives.push(passivereq(res[0],item,time1))
//                 })
//                 console.log("生成请求耗时",new Date().getTime()-time)
//                 return Promise.all(actives)
//             })
//             .then((res)=>{
//                 // console.log(res)
//                 var time2 = new Date().getTime();
//                 res.forEach((item,index)=>{
//                     // console.log(JSON.parse(item))
//                     var parse = JSON.parse(item);
//                     parse.Time.EndTime=time2
//                     parse.Time.Alltime=time2-parse.Time.SchainStime
//                     storagepassivetime(parse)
//                 })
//
//             })
//     })
//     .on("changed", function(log){
//     });
