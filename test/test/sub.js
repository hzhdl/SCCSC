const  {request}=require('./request.js')

const sub =(port,data) => {
    return request(port,"/subconstract",{
        password:"123456",
        ChainHash: data.ChainHash,
        Flag:data.Flag||"0",
        CCSCHash: data.CCSCHash,
        Preargs:data.Preargs||[{}]
    })
}
module.exports = {sub};

