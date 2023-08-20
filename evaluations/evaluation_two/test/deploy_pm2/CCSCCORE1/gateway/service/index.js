const ethconfig=require('../config/ethconfig.js')
const ccscconfig=require('../config/ccscconfig.js')
const {request}=require('./requests.js')
const {
    getKEY,sign,checksign
}=require('./cryptoservice.js')
// const {
//     storageconfig, storageccscconfig, getchainconfig,  getCCSCdatawithHash, getallinfo
// }=require('./OPfile.js')
const {
    storageChainconfig, storageccscconfig, getchainconfig,  getCCSCdatawithHash, getallinfo
}=require('./store.js')

/*
* 注册链服务，这里留下接口，仅允许从内部使用特定的口令来进行链和合约的注册（同时方便进行实验的测试）
* */
const registerchain = async (data)=>{
    // console.log(ethconfig.default);
    //生成链对应的秘钥，并将公钥公布出去
    const key=getKEY()
    //核心数据，需要签名
    data.Publickey=key.publicKey
    //详细接口数据
    const config={
        code: 1,
        msg: 'success',
        data: JSON.stringify(data),
        count: '',
        exdata: '',
        encryptflag: false,
        Msignature: sign(JSON.stringify(data),key.privateKey),
        Csignature: ""
    }
    // return config
    return request("/Chain/register",config).then((res)=>{
        // console.log(parse)
        var checksign1 =false
        var spk=undefined
        if (res.data.code==0){
            var parse = JSON.parse(res.data.data);
            checksign1=checksign(res.data.data, parse.Publickey, res.data.csignature);
            spk=parse.Publickey
        }
        return {
            "res":res,
            "checksign":checksign1,
            "data":parse,
            "key":key,
            "Spk":spk
        }

    },(error)=>{
        console.log(error,"这里是service")
        throw error
    })
}
/*
* 注册合约服务
* */
const registercontract =(res)=>{
    // console.log(res.data)
    const data=res.data;
    const pk=res.chaindata.Spk;
    const sk=res.chaindata.sk;
    const chainhash=res.chaindata.ChainHash

    // console.log(chainsk,data)
    // console.log(ethconfig.default);
    //生成链对应的秘钥，并将公钥公布出去
    const key=getKEY()
    //核心数据，需要签名
    data.Publickey=key.publicKey
    //详细接口数据
    const config={
        code: 1,
        msg: 'success',
        data: JSON.stringify(data),
        count: '',
        exdata: '',
        encryptflag: false,
        Msignature: sign(JSON.stringify(data),key.privateKey),
        Csignature: sign(JSON.stringify(data),sk)
    }
    // console.log(data.Flag)
    // return config
    return request("/Contract/register",config).then((res)=>{
        // console.log(res.data)
        // console.log(parse)
        var checksign1 =false
        var spk=undefined
        if (res.data.code==0){
            var parse = JSON.parse(res.data.data);
            // console.log(pk)
            checksign1=checksign(res.data.data, pk, res.data.csignature);
            spk = parse.publicKey
        }
        console.log("C签名校验结果：",checksign1)
        return {
            "res":res,
            "checksign":checksign1,
            "chainHash":chainhash,
            "data":parse,
            "key":key,
            "Spk":spk
        }
    })


}

/*
* 订阅合约服务
* */
const subcontract = (ress)=>{
    const reqdata=ress.reqdata
    const res=ress.chaindata
    console.log(reqdata.CCSCHash.substring(0,20),"数据加载完成")
    let sk=res.sk
    let pk=res.Spk
    reqdata.SChainHash=res.ChainHash
    // console.log(reqdata)
    return request("/Contract/subscribe",{
        code: 1,
        msg: 'success',
        data: JSON.stringify(reqdata),
        count: '',
        exdata: '',
        encryptflag: false,
        Msignature: "",
        Csignature: sign(JSON.stringify(reqdata),sk)
    }).then((res)=>{
        // console.log(res)
        var checksign1 =false
        var spk=undefined
        // console.log(res.data.code)
        if (res.data.code==0){
            // var parse = JSON.parse(res.data.data);
            // console.log(pk,"dfsaddsaf")
            checksign1=checksign(res.data.data, pk, res.data.csignature);
            // spk = parse.publicKey
            console.log("C签名校验结果：",checksign1)
        }
        return {
            "res":res,
            "checksign":checksign1,
            // "key":key,
            // "Spk":spk
        }

    })


}

/*
* 获取链信息服务，公开链的相关信息，包括公钥等，可以以接口或者网站的形式去公布自己的相关信息
* */
const getchain = () => {
    return getallinfo().then((res)=>{
        console.log(res)
        return res
    },(err)=>{
        if (err.chaindata!=undefined){
            return err
        }else {
            throw err
        }
    })
}

/*
* 获取所有已注册的合约信息
* */
const getfunction = () => {

}

/*
* 主动同步的测试接口，由中间件主动同步使用。
* */
const activesync = (reqdata,count=1) => {

    let chaindata=undefined
    console.log("目标链访问db处理总时间",new Date().getTime() - reqdata.TchainStime)
    return Promise.all([getchainconfig(),getCCSCdatawithHash(reqdata.CCSCHash)])
        .then((res)=>{
            chaindata=res[0]
            res=res[1]
            let sk=res.sk
            reqdata.TchainEtime=new Date().getTime()
            console.log("目标链请求处理总时间",new Date().getTime() - reqdata.TchainStime)
            return request("/Invocation/activesync",{
                code: 1,
                msg: 'success',
                data: JSON.stringify(reqdata),
                count: '',
                exdata: '',
                encryptflag: false,
                Msignature: sign(JSON.stringify(reqdata),sk),
                Csignature: sign(JSON.stringify(reqdata),chaindata.sk)
            }).then((res)=>{
                console.log(res.data.msg,"主动同步请求已发送")
                return res.data
            //    这里只管向中间件更新数据，不需要理会返回值
            })
        },(err)=>{
            // console.log(err)
            throw err
        })
}
/*
* 主动同步的测试接口，由中间件主动同步使用。
* */
// {
//     chaindata:chaindata,
//         CCSCdatas: await getactiveCCSC()
// }
const activeSync = (reqdatas,count) => {

    let chaindata=undefined
    var time = new Date().getTime();

    chaindata=reqdatas.chaindata
    res=reqdatas.CCSCdatas
    // console.log(res)
    let reqdata={
        ChainHash:res.ChainHash,
        CCSCHash:res.CCSChash,
        Result: res.Result==undefined?[{ChainHash:"",data:"no result，just test"}]:res.Result,
        TchainStime: res.TchainStime,
        Flag: res.Flag==undefined?"0":res.Flag,
        Status:res.Status==undefined?"0":res.Status,
        Exdata:res.Exdata==undefined?"0":res.Exdata
    }
    // console.log(reqdata.CCSCHash,"数据加载完成")
    let sk=res.sk
    reqdata.TchainEtime=new Date().getTime()
    console.log(reqdata.TchainEtime-reqdata.TchainStime)
    return request("/Invocation/activesync",{
        code: 1,
        msg: 'success',
        data: JSON.stringify(reqdata),
        count: '',
        exdata: '',
        encryptflag: false,
        Msignature: sign(JSON.stringify(reqdata),sk),
        Csignature: sign(JSON.stringify(reqdata),chaindata.sk)
    }).then((res)=>{
        console.log(res.data.msg,"主动同步请求已发送")
        return res.data
        //    这里只管向中间件更新数据，不需要理会返回值
    })
}
//半主动同步接口
const halfactiveSync =(reqdatas) => {

    let chaindata=undefined
    var time = new Date().getTime();

    chaindata=reqdatas.chaindata
    res=reqdatas.CCSCdatas
    // console.log(res)
    let reqdata={
        ChainHash:res.ChainHash,
        CCSCHash:res.CCSChash,
        Result: res.Result==undefined?{msg:"no result，just test"}:res.Result,
        TchainStime: res.TchainStime,
        Flag: res.Flag==undefined?"0":res.Flag,
        Status:res.Status==undefined?"0":res.Status,
        Exdata:res.Exdata==undefined?"0":res.Exdata
    }
    // console.log(reqdata.CCSCHash,"数据加载完成")
    let sk=res.sk
    reqdata.TchainEtime=new Date().getTime()
    console.log(reqdata.TchainEtime-reqdata.TchainStime)
    return request("/Invocation/halfactivesync",{
        code: 1,
        msg: 'success',
        data: JSON.stringify(reqdata),
        count: '',
        exdata: '',
        encryptflag: false,
        Msignature: sign(JSON.stringify(reqdata),sk),
        Csignature: sign(JSON.stringify(reqdata),chaindata.sk)
    }).then((res)=>{
        console.log(res.data.msg,"半主动同步请求已发送")
        return res.data
    })
}
//发起被动更新接口
const passiveaccess =(reqdatas) => {

    let chaindata=undefined
    var time = new Date().getTime();
    // console.log(reqdatas)
    chaindata=reqdatas.chaindata
    res=reqdatas.CCSCdatas
    // console.log(res)
    let reqdata={
        ChainHash:res.ChainHash,
        CCSCHash:res.CCSChash,
        SrcChainHash:chaindata.ChainHash,
        Result: "",
        args: res.args||{},
        SchainStime: chaindata.SchainStime,
        Flag: "2",
        Status:res.Status==undefined?"0":res.Status,
        Exdata:res.Exdata==undefined?"0":res.Exdata
    }
    // console.log(reqdata.CCSCHash,"数据加载完成")
    let sk=res.sk
    reqdata.SchainEtime=new Date().getTime()
    console.log(reqdata.SchainEtime-reqdata.SchainStime)
    return request("/Invocation/passiveaccess",{
        code: 1,
        msg: 'success',
        data: JSON.stringify(reqdata),
        count: '',
        exdata: '',
        encryptflag: false,
        Msignature: "",
        Csignature: sign(JSON.stringify(reqdata),chaindata.sk)
    }).then((res)=>{
        console.log(res.data.msg,"被动访问请求已发送")
        return res.data
    })
}

/*
* 发起合约函数调用，以带参或者不带参形式向中间件发起合约函数调用
* */
const activeinvocation = () => {

}


module.exports = {registerchain,
    registercontract,getchain,
    getfunction,activeinvocation,
    activesync,subcontract,
    activeSync,halfactiveSync,
    passiveaccess}
