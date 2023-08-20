const axios =require('axios')
const instance =axios.create();
const request= (port,url,data)=>{

    let config={
        'url':"http://172.16.0.13:"+port+url,
        'method':"post",
        'data':data,
        'timeout':30000
    }

    return instance(config)

}
//获取合约地址列表
const requestcontract= (port,url,data)=>{

    let config={
        'url':"http://172.16.0.13:"+port+url,
        'method':"post",
        'data':data,
        'timeout':30000
    }

    return instance(config)

}
module.exports = {request,requestcontract}
