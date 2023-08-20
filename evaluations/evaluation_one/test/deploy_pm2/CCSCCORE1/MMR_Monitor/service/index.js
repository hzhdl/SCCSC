const {subcribecontract}=require('../oracle/index.js')
const  {request} =require('../service/requests.js')

const Monitors = function (){
    //监控列表
    this.monitors={}
    //监控配置
    this.config={

    }
    //添加监控
    this.add= async (url,addr,topics,chaindata)=> {
        let msg='已存在'
        console.log(this.monitors)
        if (this.monitors[addr]===null||this.monitors[addr]===undefined){
            this.monitors[addr]= new Monitor(url,addr,topics);
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
}

const Monitor = function (url,addr,topics,ABI=[]){
    this.url=url
    this.addr=addr
    this.topics=topics
    this.ABI=ABI
    //订阅的区块链列表
    this.subcribechainlist=[]
    this.subinstance=null

    this.subscribe= async (chaindata)=> {

        //订阅，由oracle层来实现
        this.subinstance = await subcribecontract(this.url,this.addr,this.topics)
        //订阅链记录
        this.addsubscribelist(chaindata)
        this.subinstance.on("data", (log) => {
            reminderchain(log,this.subcribechainlist)
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
const reminderchain =async (log,chaindata)=>{
    console.log(chaindata)
    let promises=[]
    for (let i = 0; i < chaindata.length; i++) {
        promises.push(request(chaindata[i].surl,{
            log:log
        }))
    }
    await Promise.all(promises).then((res)=>{
        console.log("发送完成")
    })
}


module.exports = {Monitor,Monitors}
