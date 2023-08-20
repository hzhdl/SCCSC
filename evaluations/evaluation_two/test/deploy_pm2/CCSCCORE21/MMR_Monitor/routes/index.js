const router = require('koa-router')()
// const fs =require('fs')
const path = require('path')
const {Monitor,Monitors} =require('../service/index')
const {getresult} =require('../oracle/oracle.js')
const {mmr,mmrconfig} =require('../config/mmrconfig.js')

let monitors=new Monitors()

//保存预言合约信息
router.all('/index', async (ctx, next) => {

    ctx.body={
        msg:"this is hello world"
    }
    return

})

router.all('/monit', async (ctx, next) => {

    const res = ctx.request.body
    // console.log(res.addr)
    // let monitor = new Monitor(res.url,res.addr,res.topics,res.chaindata);
    await monitors.add(res.url,res.addr,res.topics,res.chaindata,"0",res.hurl).then((res)=>{
        ctx.body={
            msg:res
        }
    })

    // console.log(res.url,res.addr,res.topics)


})
router.all('/monitall', async (ctx, next) => {

    const res = ctx.request.body
    // console.log(res.addr)
    // let monitor = new Monitor(res.url,res.addr,res.topics,res.chaindata);
    await monitors.addall(res.url,res.addr,res.topics,res.chaindata,"0",res.hurl).then((res)=>{
        ctx.body={
            msg:res
        }
    })

    // console.log(res.url,res.addr,res.topics)


})
router.all('/monitinfo', async (ctx, next) => {

    // console.log(monitors.sublist())
    return ctx.body={
        msg: monitors.sublist()
    }
})
router.all('/clear', async (ctx, next) => {

    // console.log(monitors.sublist())
    await monitors.clear()
    return ctx.body={
        msg: "clear all monit and sub"
    }
})
router.all('/monittimedata', async (ctx, next) => {


    const res = ctx.request.body
    // console.log(res.data.addrs)
    // console.log(monitors.)
    if (res.addrs==null||res.addrs==undefined){
        return ctx.body={
            msg: "failure",
        }
    }
    return ctx.body={
        msg: "success",
        data: monitors.timedata(res.addrs)
    }
})

router.all('/remindme', async (ctx, next) => {

    // console.log(ctx.request.body)
    var res = ctx.request.body;
    let begintime = res.begintime
    let lasttime = 0
    //为方便测试，实现其自动的注入，默认使用第一个测试合约的参数，
    //注意，PBR和MMR并不需要区分主动和半主动的模式，因此采用一个默认合约来测试即可
    await getresult(res.data.url,res.data.addr,mmrconfig[0].ABI,mmrconfig[0].func).then((res)=>{
        // console.log(res)
        lasttime= new Date().getTime() - begintime
    })
    // console.log(monitors.sublist())
    return ctx.body={
        msg: "getreminde",
        data:"This is a test,this chain has accepted the message!",
        signletime: lasttime
    }
})


module.exports = router
