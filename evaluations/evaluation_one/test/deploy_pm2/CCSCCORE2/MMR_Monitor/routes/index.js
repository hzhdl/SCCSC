const router = require('koa-router')()
// const fs =require('fs')
const path = require('path')
const {Monitor,Monitors} =require('../service/index')

const monitors=new Monitors()

//保存预言合约信息
router.all('/index', async (ctx, next) => {

    ctx.body={
        msg:"this is hello world"
    }
    return

})

router.all('/monit', async (ctx, next) => {

    const res = ctx.request.body
    // let monitor = new Monitor(res.url,res.addr,res.topics,res.chaindata);
    await monitors.add(res.url,res.addr,res.topics,res.chaindata).then(console.log)

    // console.log(res.url,res.addr,res.topics)

    return {
        msg:"success"
    }
})
router.all('/monitinfo', async (ctx, next) => {

    // console.log(monitors.sublist())
    return ctx.body={
        msg: monitors.sublist()
    }
})

router.all('/remindme', async (ctx, next) => {

    console.log(ctx.request.body)
    // console.log(monitors.sublist())
    return ctx.body={
        msg: "getreminde"
    }
})


module.exports = router
