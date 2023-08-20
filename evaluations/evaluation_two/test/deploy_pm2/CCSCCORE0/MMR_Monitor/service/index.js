const {subcribecontract}=require('../oracle/index.js')
const  {request} =require('../service/requests.js')

const Monitors = function (){
    //监控列表
    this.monitors={}
    //监控配置
    this.config={

    }
    //添加监控
    this.add= async (url,addr,topics,chaindata,flag,hurl)=> {
        let msg='已存在'
        // console.log(this.monitors)
        if (hurl==null||hurl==undefined||hurl==""){
            msg="请检查参数"
        }
        else if (this.monitors[addr]===null||this.monitors[addr]===undefined){
            this.monitors[addr]= new Monitor(url,addr,topics,flag,hurl);
            await this.monitors[addr].subscribe(chaindata)
            msg='监控成功'
        }
        else {
            this.monitors[addr].addsubscribelist(chaindata)
            msg='已存在'
        }
        return new Promise((((resolve, reject) => {
            resolve({
                msg: msg
            })
        })))
    }
    //添加监控
    this.addall= async (url,addr,topics,chaindata,flag,hurl)=> {
        let msg='已存在'
        // console.log(this.monitors)
        if (hurl==null||hurl==undefined||hurl==""){
            msg="请检查参数"
        }
        else if (this.monitors[addr]===null||this.monitors[addr]===undefined){
            this.monitors[addr]= new Monitor(url,addr,topics,flag,hurl);
            await this.monitors[addr].subscribeall(chaindata)
            msg='监控成功'
        }

        return new Promise((((resolve, reject) => {
            resolve({
                msg: msg
            })
        })))
    }


//    删除监控
    this.del=async (url,addr,topics)=> {

    }
    this.sublist= ()=>{
        let res=[]
        let count=0
        for (const monitorsKey in this.monitors) {
            count++
            res.push({
                key:monitorsKey,
                counts: this.monitors[monitorsKey].subcribechainlist.length,
                num:this.monitors[monitorsKey].counts,
                badcounts:this.monitors[monitorsKey].badcounts,
                // sublist: this.monitors[monitorsKey].subcribechainlist,
                time:[this.monitors[monitorsKey].alltime,this.monitors[monitorsKey].signletime]
            })
        }
        return [res,count]
    }
    this.timedata= (addrs)=>{
        let res=[]
        for (let i = 0; i < addrs.length; i++) {
            res.push({
                key:addrs[i],
                alltime: this.monitors[addrs[i]].alltime,
                signletime: this.monitors[addrs[i]].signletime,
            })
        }
        return res
    }
//    手动直接触发
    this.test=()=>{
        let promise=[]
        let btime = new Date().getTime()
        for (const monitorsKey in this.monitors) {
            promise.push(this.monitors[monitorsKey].test(btime))
        }
        return Promise.all(promise).then((res)=>{
            let signletime=0
            for (let i = 0; i < res.length; i++) {
                signletime+=res[i].singleCtime;
            }
            return{
                signltime:signletime/res.length,
                tasktime: new Date().getTime() - btime
            }
        })
    }
//    清空
    this.clear=()=>{
        // for (const monitor in this.monitors) {
        //     monitor.del()
        // }
        delete this.monitors
        this.monitors={}
    }
}

const Monitor = function (url,addr,topics,flag,hurl="",ABI=[]){
    this.url=url
    this.addr=addr
    this.topics=topics
    this.ABI=ABI
    this.hurl=hurl
    //订阅的区块链列表
    this.subcribechainlist=[]
    this.subinstance=null
    this.alltime = 0
    this.signletime = 0
    this.counts=0
    this.badcounts=0

    //暂时禁用这个功能，小规模测试可以，长链接数量过多时需进行代码优化
    this.subscribe= async (chaindata)=> {

        //订阅，由oracle层来实现
        // this.subinstance = await subcribecontract(this.url,this.addr,this.topics)
        //订阅链记录

        this.addsubscribelist(chaindata)
        // this.subinstance.on("data", async (log) => {
        //     let beginalltime = new Date().getTime();
        //     await reminderchain(log,this.subcribechainlist,{
        //         url:this.hurl,
        //         addr:this.addr,
        //         topics:this.topics,
        //         ABI:this.ABI
        //     },beginalltime).then((res)=>{
        //         this.alltime= new Date().getTime() - beginalltime
        //         // console.log(res)
        //         this.signletime= res.signletime
        //         this.counts+=res.counts
        //         // console.log(this.alltime,"  ",this.signletime)
        //     },(err)=>{
        //         this.badcounts=err
        //         console.log(err)
        //     })
        //     // console.log(log)
        //     // console.log(this.subcribechainlist)
        //     // activemulti(log,item.CCSChash||"")
        // })
        return
    }

    //暂时禁用这个功能，小规模测试可以，长链接数量过多时需进行代码优化
    this.subscribeall= async (chaindata)=> {

        //订阅，由oracle层来实现
        // this.subinstance = await subcribecontract(this.url,this.addr,this.topics)
        //订阅链记录
        this.subcribechainlist=chaindata

        // this.subinstance.on("data", async (log) => {
        //     let beginalltime = new Date().getTime();
        //     await reminderchain(log,this.subcribechainlist,{
        //         url:this.hurl,
        //         addr:this.addr,
        //         topics:this.topics,
        //         ABI:this.ABI
        //     },beginalltime).then((res)=>{
        //         this.alltime= new Date().getTime() - beginalltime
        //         // console.log(res)
        //         this.signletime= res.signletime
        //         this.counts+=res.counts
        //         // console.log(this.alltime,"  ",this.signletime)
        //     },(err)=>{
        //         this.badcounts=err
        //         console.log(err)
        //     })
        //     // console.log(log)
        //     // console.log(this.subcribechainlist)
        //     // activemulti(log,item.CCSChash||"")
        // })
        return
    }


    this.test=async (beginalltime)=>{

        return await reminderchain(this.subcribechainlist,{
            url:this.hurl,
            addr:this.addr,
            topics:this.topics,
            ABI:this.ABI
        },beginalltime).then((res)=>{
            this.alltime= new Date().getTime() - beginalltime
            // console.log(res)
            this.signletime= res.signletime
            this.counts+=res.counts
            //这里只返回单个合约同步到指定数量链上的时间，作为单条时延
            return{
                singleCtime: new Date().getTime() - beginalltime,
            }
            // console.log(this.alltime,"  ",this.signletime)
        },(err)=>{
            this.badcounts=err
            console.log(err)
        })
    }
    this.addsubscribelist= async (chaindata)=> {
        //订阅链记录
        this.subcribechainlist.push(chaindata)
        return
    }
    function unsubcribe() {

    }
    function del() {
        this.subinstance=null
    }
}

//配置回调函数，通知其他链更新。
const reminderchain =async (chaindata,scdata,beginalltime)=>{
    // console.log(chaindata)

    let promises=[]
    for (let i = 0; i < chaindata.length; i++) {
        promises.push(request(chaindata[i].surl,{
            data:scdata,
            begintime:beginalltime
        }))
    }
    return Promise.all(promises).then((res)=>{
        console.log("全部完成",res.length)
        let averagetime=0
        for (let i=0 ;i<res.length;i++){
            averagetime+=res[i].data.signletime
        }
        return {
            counts: res.length,
            signletime: averagetime/res.length,
        }
    },(err)=>{
        return err
        console.log("发生error",err)
        // console.log("----",err)
    })
}


module.exports = {Monitor,Monitors}
