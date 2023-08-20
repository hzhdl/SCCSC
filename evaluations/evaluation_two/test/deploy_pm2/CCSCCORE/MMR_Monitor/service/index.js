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


//    删除监控
    this.del=async (url,addr,topics)=> {

    }
    this.sublist= ()=>{
        let res=[]
        for (const monitorsKey in this.monitors) {
            res.push({
                key:monitorsKey,
                sublist: this.monitors[monitorsKey].subcribechainlist
            })
        }
        return res
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

    this.subscribe= async (chaindata)=> {

        //订阅，由oracle层来实现
        this.subinstance = await subcribecontract(this.url,this.addr,this.topics)
        //订阅链记录
        this.addsubscribelist(chaindata)
        this.subinstance.on("data", async (log) => {
            let beginalltime = new Date().getTime();
            await reminderchain(log,this.subcribechainlist,{
                url:this.hurl,
                addr:this.addr,
                topics:this.topics,
                ABI:this.ABI
            }).then((res)=>{
                this.alltime= new Date().getTime() - beginalltime
                console.log(res)
                this.signletime= res.signletime
            })
            // console.log(log)
            // console.log(this.subcribechainlist)
            // activemulti(log,item.CCSChash||"")
        })
        return
    }

    this.addsubscribelist= async (chaindata)=> {
        //订阅链记录
        this.subcribechainlist.push(chaindata)
        return
    }
    function unsubcribe() {

    }
}

//配置回调函数，通知其他链更新。
const reminderchain =async (log,chaindata,scdata)=>{
    console.log(chaindata)
    let promises=[]
    for (let i = 0; i < chaindata.length; i++) {
        promises.push(request(chaindata[i].surl,{
            log:log,
            data:scdata
        }))
    }
    return Promise.all(promises).then((res)=>{
        console.log("全部完成",res[0].data)
        let averagetime=0
        for (let i=0 ;i<res.length;i++){
            averagetime+=res[i].data.signletime
        }
        return {
            signletime: averagetime/res.length,
        }
    },(err)=>{
        console.log("----",err)
    })
}


module.exports = {Monitor,Monitors}
