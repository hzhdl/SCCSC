const pbrconfig=require('../config/pbrconfig.js')
const {getresult} =require('../oracle/pbroracle.js')


const onerror=(err)=>{
    console.log("出现错误")
    console.log(err)
}
i=1000000000
let url=''
let add=''
let ABI=[]
let func=''
let promise=[]
const main= async ()=>{
    while(i--){
        promise=[]
        for (let j = 0; j < pbrconfig.length; j++) {
            url=pbrconfig[j].host+':'+pbrconfig[j].port
            add=pbrconfig[j].SCAddr
            func=pbrconfig[j].func
            ABI=pbrconfig[j].ABI
            promise.push(getresult(url,add,ABI,func))
        }
        await Promise.all(promise)
            .then((res)=>{
                console.log(res)
            },onerror)
        console.log("第一次")
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

main()

