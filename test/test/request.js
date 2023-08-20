const axios =require('axios')
const instance =axios.create();
const request= (port,url,data)=>{

    let config={
        'url':"http://172.16.0.37:"+port+url,
        'method':"post",
        'data':data,
        'timeout':30000
    }

    return instance(config)

}
const requestpass= (data)=>{

    let config={
        'url':"http://172.16.0.37:3000/testpassive",
        'method':"post",
        'data':data,
        'timeout':30000
    }

    return instance(config)

}
module.exports = {request,requestpass}
