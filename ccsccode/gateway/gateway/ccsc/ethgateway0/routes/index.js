const router = require('koa-router')()
// const fs =require('fs')
const path = require('path')
const gateconfig = require('../config/gateconfig.js')
const {getweb3ws,getweb3http,Updatachain,checkproof} = require('../service/Chainservice.js')
const ccscconfig=require('../config/ccscconfig.js')
const {
  getKEY,sign,checksign
}=require('../service/cryptoservice.js')



const {registerchain,registercontract,getchain,getfunction,activeinvocation,activesync,subcontract,passiveaccess
} = require('../service/index.js');
// const {
//   storageconfig, storageccscconfig, getchainconfig,  getCCSCdatawithHash
// }=require('../service/OPfile.js');
const {
  storageChainconfig, storageccscconfig, getchainconfig,  getCCSCdatawithHash, getallinfo,storagepassivetime
}=require('../service/store.js');

var chainjson = path.resolve(__dirname,"../config/chain/chain.json");
var chainpem = path.resolve(__dirname,"../config/chain/chain.pem");

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
router.post('/testpassive', async (ctx, next) => {
  var time = new Date().getTime();
  await Promise.all([getchainconfig()])
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
  ctx.body={
    msg:"已完成"
  }
})
const checkpassword=(password)=>{
  return password!=gateconfig.password
}

//链信息获取接口,可以获取预言网关的公钥和所有公开的接口，以及描述
router.post('/getoraclegatewayinfo',async (ctx,next)=>{
  ress="服务错误，联系管理员检查服务"
  // ctx.body = {
  //   data: ress
  // }
  await getchain().then((res)=>{
    ress={
      ChainHash:  res.chaindata.ChainHash,
      ChainPk:   res.chaindata.pk,
      OpenContractInterfaces:  res.CCSCdata,
    }
    ctx.body = {
      data: ress
    }
  },(err)=>{
    // console.log("465464")
    ctx.body = {
      data: err
    }
  })


})

//链注册接口，面向网关的管理员使用
router.post('/registerchain', async (ctx, next) => {
  var requestjson = ctx.request.body;
  //口令检查
  if (checkpassword(requestjson.password)){
    ctx.body = {
      data:"口令错误，请从管理员处获取正确口令"
    }
    return
  }else{

  }

  //数据自动注入
  //网关的数据注入
  const data={
    Address: "http://"+gateconfig.ip + ":" +gateconfig.port,
    ChainName: gateconfig.ChainName,
    ChainID: gateconfig.ChainID,
    Publickey: "",
  }
  let ress="";
  //发起注册请求
  await registerchain(data).then((res)=>{
        console.log(res.res.data.msg)
    //首先检查签名校验结果
    if (!res.checksign){
      ress="签名校验失败或注册数据有问题，导致注册失败"
      ctx.body = {
        data: {msg:ress+"\n"+res.res.data.msg}
      }
      return
    }
    //检查返回的数据结果
    else if (!res.res.data.code){
      ress={msg:"注册成功",data: {ChainHash:res.data.ChainHash,PK:res.data.Publickey}}
    //  保存数据
      //  注册成功，记录注册数据

      storageChainconfig({
            ChainHash: JSON.parse(res.res.data.data).ChainHash,
            Address: "http://"+gateconfig.ip + ":" +gateconfig.port,
            ChainName: gateconfig.ChainName,
            ChainID: gateconfig.ChainID,
            "pk":res.key.publicKey,
            "sk":res.key.privateKey,
            "Spk":res.Spk
          },res.res.data)
      //旧存储方法
      // storageconfig(chainjson,JSON.stringify(res.res.data));
      // //  注册成功，记录chain数据,默认签名是校验完毕的，因此进行处理
      // storageconfig(chainpem,JSON.stringify({
      //     ChainHash: JSON.parse(res.res.data.data).ChainHash,
      //     Address: "http://"+gateconfig.ip + ":" +gateconfig.port,
      //     ChainName: gateconfig.ChainName,
      //     ChainID: gateconfig.ChainID,
      //     "pk":res.key.publicKey,
      //     "sk":res.key.privateKey,
      //     "Spk":res.Spk
      //   })
      // );

    }
    else {
      //失败，记录并提示
      console.log("code="+res.res.data.code+",msg="+res.res.data.msg+"   链注册失败！")
      ress= "注册失败，请重新检查参数等数据！    "+ res.res.data.msg;
    }
    ctx.body = {
      data:ress
    }
  },(error)=>{
        ctx.body = {
          data:error
        }
      })


})

//合约状态接口注册函数
router.post('/registerconstract', async (ctx, next) => {
  var requestjson = ctx.request.body;
  if (checkpassword(requestjson.password)){
    ctx.body = {
      data:"口令错误，请从管理员处获取正确口令"
    }
    return
  }

  let chaindata=undefined
  const p=getchainconfig()
  ctx.body={
    data:"  "
  }
  let ress="";
  await p.then((res)=>{
    chaindata=res
    const data={
      ChainHash: chaindata.ChainHash,
      Address: ctx.request.body.address,
      FunctionName: ctx.request.body.functionname,
      Flag: ctx.request.body.Flag||"0",
      ParamList:ctx.request.body.paramlist,
      Publickey:""
    }
    return {data:data,chaindata:chaindata}
  },(error)=>{
    // console.log("465")
    throw error})
      .then(registercontract,(onerror)=>{
        // console.log("789")
        throw onerror})
      .then((res)=>{
    //首先检查签名校验结果
    if (!res.checksign){
      ress="签名校验失败,"+res.res.data.msg
      // console.log("校验失败")
    }
    else if (!res.res.data.code){
      // console.log(res)
      //检查返回的数据结果
      ress={msg:"注册成功",data: {CCSChash: res.data.CCSChash,ChainHash:res.data.ChainHash,PK:res.data.Publickey}}
      //解析数据
      var parseres = res.res.data;
      var parseresdata = JSON.parse(parseres.data);
      //  注册成功，记录注册数据
      storageccscconfig({
          ChainHash: res.chainHash,
          CCSChash: parseresdata.CCSChash,
          Address: ctx.request.body.address,
          FunctionName: ctx.request.body.functionname,
          Flag:ctx.request.body.Flag||"0",
          ParamList:ctx.request.body.paramlist,
          pk: res.key.publicKey,
          sk: res.key.privateKey,
          Spk: res.Spk
        },res.res.data)
      //旧存储方法
      // var CCSCjson = path.resolve(__dirname,"../config/contractstate/"+ parseresdata.CCSChash +".json");
      // var CCSCdata = path.resolve(__dirname,"../config/contractstate/"+ parseresdata.CCSChash +".data");
      // var CCSCsummary = path.resolve(__dirname,"../config/contractstate.json");
      //
      // storageconfig(CCSCjson,JSON.stringify(res.res.data))
      // //  注册成功，记录私钥数据
      // storageconfig(CCSCdata,JSON.stringify({
      //   ChainHash: res.chainHash,
      //   CCSChash: parseresdata.CCSChash,
      //   Address: ctx.request.body.address,
      //   FunctionName: ctx.request.body.functionname,
      //   Flag: "0",
      //   ParamList:ctx.request.body.paramlist,
      //   pk: res.key.publicKey,
      //   sk: res.key.privateKey,
      //   Spk: res.Spk
      // }))
      //保存注册的CCSC的列表，一行一个
      // storageccscconfig(CCSCsummary,parseresdata.CCSChash);
    }
    else {
      //失败，记录并提示
      console.log("code="+res.res.data.code+",msg="+res.res.data.msg+"   合约状态注册失败！")
      ress= "注册失败，请重新检查参数等数据！    "+ res.res.data.msg;
    }
    ctx.body = {
      data:ress
    }
  },(error)=>{
        // console.log(error)
    ctx.body = {
      data:{error:"error",case:error}
    }
  })


})

//合约状态订阅函数
router.post('/subconstract', async (ctx, next) => {
  var requestjson = ctx.request.body;
  if (checkpassword(requestjson.password)){
    ctx.body = {
      data:"口令错误，请从管理员处获取正确口令"
    }
    return
  }

  let chaindata=undefined
  const p=getchainconfig()
  ctx.body={
    data:" "
  }
  let ress="";
  await p.then((res)=>{
    chaindata=res
    // const data={
    //   ChainHash: chaindata.ChainHash,
    //   Address: ctx.request.body.address,
    //   FunctionName: ctx.request.body.functionname,
    //   Flag: "0",
    //   ParamList:ctx.request.body.paramlist,
    //   Publickey:""
    // }
    let reqdata={
      ChainHash:ctx.request.body.ChainHash,
      CCSCHash:ctx.request.body.CCSCHash,
      SChainHash:"",
      Flag: ctx.request.body.Flag||"0",
      Status:"0",
      Exdata:"0",
      Preargs:ctx.request.body.Preargs||[{}]
    }
    return {reqdata:reqdata,chaindata:chaindata}
  },(error)=>{
    // console.log("lllll")
    throw error})
      .then(subcontract,(error)=>{throw error})
      .then((res)=>{
        //首先检查签名校验结果
        if (!res.checksign){
          ress="签名校验失败,"+res.res.data.msg
        }
        else if (!res.res.data.code){
          //检查返回的数据结果
          ress="订阅成功"
        }
        else {
          //失败，记录并提示
          console.log("code="+res.res.data.code+",msg="+res.res.data.msg+"   订阅状态失败！")
          ress= "订阅失败，请重新检查参数等数据！    "+ res.res.data.msg;
        }

      },(error)=>{
        console.log(error)
        ress=error
      })
  ctx.body={
    data: ress
  }
})


//主动更新方法，这里的方法接收中间件的主动更新使用，主进程中另外布置其主动向外更新方法
router.post('/activesync', async (ctx, next) => {
//  首先校验数据是否正确，校验签名
  let SchainStime=new Date().getTime()
  var checksign1 =false
  var res=ctx.request.body
  // var spk=undefined
  if (res.code==0){
      var parse = JSON.parse(res.data);
      // var index=parse.input.CCSCHash.substring(0,40);
    // console.log(parse.input,index,ccscconfig.CCSC[index],res.Csignature)
    //   console.log(parse.input.start_time)
    //   console.log(ccscconfig.CCSC,index)
    //   console.log(res.Csignature)
    //   checksign1=checksign(res.data,ccscconfig.CCSC[index], res.Csignature);
      // spk = parse.publicKey
    // console.log(parse);
    console.log("目标链耗时时间："+(parse.input.TchainEtime -parse.input.TchainStime))
    console.log("跨链组件链耗时时间："+(parse.ServerEtime -parse.ServerStime))
    console.log("总耗时时间："+ (SchainStime - parse.input.TchainStime))
  }
  console.log("C签名校验结果：",checksign1)

  // return {
  //     "res":res,
  //     "checksign":checksign1,
  //     // "key":key,
  //     // "Spk":spk
  // }
//  是否需要进一步验证其可信性（是否要怀疑其数据源的可信性）
//  考虑为merkle证明等操作保留相应的操作空位


//  连接区块链节点，清洗数据，准备上链的数据。
    // 清洗上链数据
  let upchain={
    data:[],
    time:"",
    blockheight:"",
    proof:"",
    flag:""
  }
  // Updatachain();
  //整理数据
  var reponsedata = {
    msg:"accept this request!",
    SchainStime:SchainStime,
    ServerEtime:parse.ServerEtime,
    SchainEtime:new Date().getTime()
  };

//  收尾清理数据
  var p = getchainconfig();
  await p.then((ress)=> {
    ctx.body = {
      data: {
        code: 1,
        msg: 'success',
        data: JSON.stringify(reponsedata),
        count: '',
        exdata: '',
        encryptflag: false,
        Msignature: "",
        Csignature: sign(JSON.stringify(reponsedata), ress.sk)
      }
    }
  })
})
//半主动更新，根据预参数获取数据
router.post('/multiquery',async (ctx,next)=>{
  console.log(ctx.request.body.data)
  //签名校验

  //预言层数据查询
  res=JSON.parse(ctx.request.body.data)
  chaindata=res.Chaindata
  chaindata.forEach((item,index)=>{
    chaindata[index].result="this is a result"+index.toString()
  })
  //返回数据
  var p = getchainconfig();
  const data={
    input:res,
    result:chaindata
  }
  await p.then((res)=>{
    ctx.body={
      code: 1,
      msg: 'success',
      data: JSON.stringify(data),
      count: '',
      exdata: '',
      encryptflag: false,
      Msignature: "",
      Csignature: sign(JSON.stringify(data),res.sk)
    }
  })

})
//被动更新，被访问数据接口
router.post('/passiveaccessget',async (ctx,next)=>{
  console.log(ctx.request.body.data)
  const TchainStime=new Date().getTime()
  //签名校验

  //预言层数据查询
  res=JSON.parse(ctx.request.body.data)
  chaindata=res.Chaindata
  chaindata.result="this is a passiveresult"
  //返回数据
  const data={
    input:res,
    result:chaindata,
    TchainStime:TchainStime,
    ServerEtime:res.ServerEtime,
    TchainEtime: new Date().getTime()
  }
  await Promise.all([getchainconfig(),getCCSCdatawithHash(res.input.CCSCHash)])
      .then((ress)=>{
          ctx.body={
            code: 1,
            msg: 'success',
            data: JSON.stringify(data),
            count: '',
            exdata: '',
            encryptflag: false,
            Msignature: sign(JSON.stringify(data),ress[1].sk),
            Csignature: sign(JSON.stringify(data),ress[0].sk)
          }
  })

})

//测试主动更新的服务代码使用
router.post('/active', async (ctx, next) => {
  //本接口仅做测试，实际中并不调用
  ress="发起主动更新，本接口仅做测试使用"
  redata=ctx.request.body
  // let TchainStime=new Date().getTime()
  let reqdata={
    ChainHash:redata.ChainHash,
    CCSCHash:redata.CCSCHash,
    Result: redata.Result,
    TchainStime: new Date().getTime(),
    Flag: redata.Flag==undefined?"0":redata.Flag,
    Status:redata.Status==undefined?"0":redata.Status,
    Exdata:redata.Exdata==undefined?"0":redata.Exdata
  }
  await activesync(reqdata).then((res)=>{
    ress=res
  },(err)=>{
    ress="服务出错，请检查服务代码"
  })
  ctx.body={
    data: ress
  }
})
// //测试半主动更新的服务代码使用
// router.post('/halfactive', async (ctx, next) => {
//   //本接口仅做测试，实际中并不调用
//   ress="发起主动更新，本接口仅做测试使用"
//   redata=ctx.request.body
//   // let TchainStime=new Date().getTime()
//   let reqdata={
//     ChainHash:redata.ChainHash,
//     CCSCHash:redata.CCSCHash,
//     Result: redata.Result,
//     TchainStime: new Date().getTime(),
//     Flag: redata.Flag==undefined?"0":redata.Flag,
//     Status:redata.Status==undefined?"0":redata.Status,
//     Exdata:redata.Exdata==undefined?"0":redata.Exdata
//   }
//   await activesync(reqdata).then((res)=>{
//     ress=res
//   },(err)=>{
//     ress="服务出错，请检查服务代码"
//   })
//   ctx.body={
//     data: ress
//   }
// })


module.exports = router
