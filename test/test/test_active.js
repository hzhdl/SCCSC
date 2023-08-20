const  {request,request1}=require('./request.js')
const axios =require('axios')

const test_active = (redata) => {
    if (redata.count===null||redata.count===undefined){
        return request1("/active", {
            ChainHash:redata.ChainHash,
            CCSCHash:redata.CCSCHash,
            Result: redata.Result
        })
    }else {
        reqbody=[]
        for (let i = 0; i < redata.count; i++) {
            reqbody.push(request1("/active", {
                ChainHash:redata.ChainHash,
                CCSCHash:redata.CCSCHash,
                Result: redata.Result
            }))
        }
        return axios.all(reqbody)
    }

}
const test_halfactive = (redata) => {
    if (redata.count===null||redata.count===undefined){
        return request1("/halfactive", {
            ChainHash:redata.ChainHash,
            CCSCHash:redata.CCSCHash,
            Result: redata.Result
        })
    }else {
        reqbody=[]
        for (let i = 0; i < redata.count; i++) {
            reqbody.push(request1("/halfactive", {
                ChainHash:redata.ChainHash,
                CCSCHash:redata.CCSCHash,
                Result: redata.Result
            }))
        }
        return axios.all(reqbody)
    }

}

module.exports={test_active,test_halfactive}
