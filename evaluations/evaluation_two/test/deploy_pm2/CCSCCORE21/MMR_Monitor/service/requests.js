const axios =require('axios')

const instance =axios.create();

instance.interceptors.response.use(
    (res) => res, // 成功的请求返回处理
    (error) => { // 异常的请求返回处理
        // console.log(error)
        if (error!=undefined&&error.response!=undefined&&error.response.status!=undefined
            &&error.response.status==200){
            console.log(error.response.status)
            return
        }else {
            const data = {
                message: error.cause,
                code: error.code
            }
            throw  data;
        }
    }
)


const request=(url,data)=>{

    let config={
        'url':url,
        'method':"post",
        'data':data,
    }

    return instance(config)

}
module.exports = {request}
