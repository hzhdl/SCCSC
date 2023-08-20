const  {request}=require('./request.js')


const pub =(port,data) => {
    // console.log(data.Flag||"0")
    return request(port,"/registerconstract",{
        address: data.address,
        functionname: data.functionname,
        paramlist: data.paramlist,
        abi:data.abi,
        ENFlag: data.ENFlag,
        Topic: data.Topic,
        Flag:data.Flag||"0",
        password:"123456"
    })
}
const newpub =(port,contract,Function,Event,Flag,password) => {
    // console.log(data.Flag||"0")
    var topics=[];
    if(typeof Event===typeof []&&(Flag==="0"||Event!==[])){
        Event.forEach((item)=>{
            topics.push(contract.interface.getEventTopic(item))
        })
        return request(port,"/registerconstract",{
            address: contract.address,
            functionname: contract.interface.getFunction(Function).name,
            paramlist: contract.interface.getFunction(Function).inputs,
            abi:contract.interface.format('json'),
            ENFlag: "0",
            Topic: topics,
            EventName:Event,
            Flag: Flag||"0",
            password:password
        })
    }else{
        return new Promise(((resolve, reject) => {
            reject("请确认你的Flag与Event参数相匹配！")
        }))
    }
}
const fiscopub =(port,contract,Function,Event,Flag,password) => {
    // console.log(data.Flag||"0")
    var topics=[];
    if(typeof Event===typeof []&&(Flag==="0"||Event!==[])){
        return request(port,"/registerconstract",{
            address: contract.address,
            functionname: contract.$getFunctionABIOf(Function).name,
            paramlist: contract.$getFunctionABIOf(Function).inputs,
            abi:JSON.stringify(contract.abi),
            ENFlag: "0",
            Topic: Event,
            EventName:Event,
            Flag: Flag||"0",
            password:password
        })
    }else{
        return new Promise(((resolve, reject) => {
            reject("请确认你的Flag与Event参数相匹配！")
        }))
    }
}
const SetOC =(port,contract,SetFunctionName,GetFunctionName,Event,password,Flag="0",extadata={}) => {
    // console.log(data.Flag||"0")
    var topics=[];
    if(true){
        Event.forEach((item)=>{
            topics.push(contract.interface.getEventTopic(item))
        })
        return request(port,"/SetOC",{
            Address: contract.address,
            SetFunctionName: SetFunctionName,
            GetFunctionName: GetFunctionName,
            Flag: Flag,
            Topic: topics,
            ABI: contract.interface.format('json'),
            data: extadata,
            password:password
        })
    }else{
        return new Promise(((resolve, reject) => {
            reject("请确认你的参数正确！")
        }))
    }
}
const SetfiscoOC =(port,contract,SetFunctionName,GetFunctionName,Event,password,Flag="0",extadata={}) => {
    // console.log(data.Flag||"0")
    var topics=[];
    if(true){
        return request(port,"/SetOC",{
            Address: contract.address,
            SetFunctionName: SetFunctionName,
            GetFunctionName: GetFunctionName,
            Flag: Flag,
            Topic: Event,
            EventName:Event,
            ABI: JSON.stringify(contract.abi),
            data: extadata,
            password:password
        })
    }else{
        return new Promise(((resolve, reject) => {
            reject("请确认你的参数正确！")
        }))
    }
}



module.exports = {pub,newpub,SetOC,fiscopub,SetfiscoOC}

