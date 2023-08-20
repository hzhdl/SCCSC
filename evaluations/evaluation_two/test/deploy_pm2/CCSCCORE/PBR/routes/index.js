const router = require('koa-router')()
// const fs =require('fs')
const path = require('path')
const pbrconfig=require('../config/pbrconfig.js')
const {getresult} =require('../oracle/pbroracle.js')
const {requestcontract} = require('../oracle/request.js')


//为方便测试，直接从中间件来获取现有的合约数据，进行同步测试。
/*
* input：正确的合约结果集合，合约更新交易负载
* output: 同步到正确的合约数据的数量
* mertic:  从负载完成到，正确同步的时延（任务时延，同步时延）
* */

//保存预言合约信息
router.all('/index', async (ctx, next) => {

    ctx.body={
        msg:"this is hello world"
    }
    return

})

router.all('/test', async (ctx, next) => {

    const res = ctx.request.body
    // let monitor = new Monitor(res.url,res.addr,res.topics,res.chaindata);

    await test(res.nums,res.flag,res.chainhash,res.Nlimit,res.Climit).then((res)=>{
        ctx.body={
            msg:"success",
            data: res,
        }
    })
    // console.log(res.url,res.addr,res.topics)


})

async function test(i,flag,chainhash,Nlimit,climit) {
    // console.log(i,flag,chainhash,Nlimit,climit)
    let url=''
    let add=''
    let ABI=[]
    let func=''
    let promise=[]
    let times=[]
    let totaltime=0
    let totalsignletime=0
    let totalsignletimes=[]
    let scnums=60
    let addrs=[]
    let f=0;
    await requestcontract("8080","/evaluation/getcontractaddr",{
        "chainhash":chainhash,
        "flag":false,
        "NumsLimit": Nlimit,
        "ChainLimit":climit
    }).then((res)=>{
        if(flag=="0"){
            f=0;
            addrs=res.data.data[0]
        }else{
            f=1
            addrs=res.data.data[1]
        }

    },(err)=>{
        console.log(err)
    })
    if (addrs==null||addrs==undefined||addrs.length==0) return {msg:"请检查你的参数！！！"}
    while(i--){
        promise=[]
        let begintime = new Date().getTime();
        for (let j = 0; j < addrs.length; j++) {
            url=pbrconfig[f].host+':'+pbrconfig[f].port
            add=addrs[f]
            func=pbrconfig[f].func
            ABI=pbrconfig[f].ABI
            promise.push(getresult(url,add,ABI,func))
        }
        await Promise.all(promise)
            .then((res)=>{
                totaltime+=new Date().getTime() - begintime
                times.push(new Date().getTime() - begintime)
                totalsignletime=0;
                for (let j = 0; j < res.length; j++) {
                    totalsignletime+=res[j].costtime
                }
                totalsignletimes.push(totalsignletime/res.length)
            },(err)=>{
                console.log(err)
            })
        // console.log("第一次")
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return {
        totalsignletimes:  totalsignletimes,
        totaltimes:  totaltime/times.length
    }
}


module.exports = router
