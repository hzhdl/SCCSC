const  ethers=require('ethers')

Args= ["0xb2a2b029f219701af9ba1bfd6537bb8db91304b7"]
const getresult = async (url,addr,ABI,func,Flag='0') => {
    let signletime=new Date().getTime()
    return new Promise((async (resolve,reject) => {
        let utils = ethers.utils;
        var defaultProvider = new ethers.getDefaultProvider(url);
        var dsigner = defaultProvider.getSigner();
        var contract = new ethers.Contract(addr,JSON.parse(ABI),dsigner);
        var blockheight = await defaultProvider.getBlockNumber();
        // console.log(blockheight)
        var newVar=null;
        if (Flag==="0"){
            //主动同步认为是不带参情况
            newVar = await contract.functions[func]();
        }
        else if (Flag==="1"){
            //半主动同步认为是带参的不更改访问
            if (typeof Args!== typeof []||Args===[])
                reject( "请检查你的参数，参数不正确！")

            newVar = await contract.functions[func](...Args)
        }else {
            reject( "请检查你的参数，参数不正确！")
        }
        // console.log(typeof newVar)
        var data= newVar

        resolve({
            time: new Date().getTime(),
            costtime: new Date().getTime()-signletime,
            BlockHeight: blockheight===undefined?-1:blockheight,
            ChainHash: "0x163576815367468416341368",
            data: data
        })
    }))
}


module.exports = {
    getresult
}
