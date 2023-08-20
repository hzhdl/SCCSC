const gateconfig = require('../config/gateconfig.js')
const {mongoose,Chain,CCSC}=require('./mongoop.js')


// const instance=new MyModel()
//
// instance.set('name',"sdfadsfdsafsda")
// instance.set('data',{a:4567,b:123})
//
// console.log(instance);
//
// instance.save((error)=>{
//     if (error!=null)
//         console.log(error)
// })
// MyModel.find({data:{a:4567,b:123}},(err,docs)=>{
//     console.log(docs)
// })
/*
* 数据存储方法，覆盖式存储
* */
const storageChainconfig =  (data,json) => {
    return new Promise(((resolve, reject) => {
        let instance=new Chain()
        Chain.find({},async (err,docs)=>{
            if (docs.length>0){
                instance=docs[0]
            }
            instance.set(data)
            instance.set('data',json)

            // console.log(data)
            // console.log(instance);

            await instance.save((error)=>{
                if (error!=null){
                    console.log(error)
                    reject("保存失败")
                }
                console.log("保存链信息成功")
                resolve("保存链信息成功")
            })
        })
    }))

}
/*
* 数据存储，主要用来存储CCSCHash数据
* */
const storageccscconfig = (data,json) => {
    return new Promise((resolve, reject) => {
        let instance=new CCSC()
        CCSC.find({"CCSChash":data.CCSChash},async (err,docs)=>{
            if (docs.length==1){
                instance=docs[0]
            }
            instance.set(data)
            instance.set('data',json)

            // console.log(instance);

            await instance.save((error)=>{
                if (error!=null){
                    console.log(error)
                    reject("保存失败")
                }
                console.log("保存跨链合约接口信息成功")
                resolve("保存跨链合约接口信息成功")
            })
        })
    })

}

/*
* 数据读取，读取chain数据，直接返回相应的数据
* */
const getchainconfig = () => {

    return new Promise((resolve, reject) => {
        var time = new Date().getTime();
        let chaindata=undefined
        //读取chain的详细数据
        Chain.find({},(err,docs)=>{
            console.log("查询链1耗时",new Date().getTime()-time)
            if (docs.length==0||docs==undefined){
                reject("链数据不存在，请检查相关数据或配置")
            }else {
                chaindata=docs[0]
                // console.log(docs)
                chaindata.data=null
                // console.log(chainhash)
                //校验数据是否正确读取

                if (chaindata==undefined){
                    reject("链数据读取失败，请检查相关数据或配置")
                }
                else
                    resolve(chaindata)
            }

        })



    })
}
/*
* 链注册数据和公开合约数据，综合获取
* */
const getallinfo = () => {
    return new Promise((resolve, reject) => {
        var chainpem = path.resolve(__dirname,"../config/chain/chain.pem");
        var CCSCsummary = path.resolve(__dirname,"../config/contractstate.json");

        let chaindata=undefined
        let CCSCdata=undefined
        //判断文件是否存在
        fs.exists( chainpem,function(exists){
            if(!exists){
                reject("请检查链是否注册，配置文件是否损坏");
                return
            }else{
                //读取chain的详细数据
                fs.readFile(chainpem, 'utf8', (error, data) =>{
                    if (error) {
                        console.log(error)
                        reject("链数据读取失败，请检查文件是否权限以及是否存在")
                        return
                    } else {
                        chaindata=JSON.parse(data)
                        // console.log(chainhash)
                        //校验数据是否正确读取
                        if (chaindata==undefined){
                            reject("链数据读取失败，请检查相关数据或配置")
                            return
                        }
                        else{
                            fs.exists( CCSCsummary,function(exists){
                                if(!exists){
                                    // console.log("dsf4654sd")
                                    resolve({
                                        chaindata:chaindata,
                                        CCSCdata:[],
                                        // msg:"文件不存在"
                                    });
                                }else {
                                    //读取CCSC数据
                                    fs.readFile(CCSCsummary, 'utf8', (error, data) =>{
                                        if (error) {
                                            console.log(error)
                                            resolve({
                                                chaindata:chaindata,
                                                CCSCdata:[],
                                                msg:"合约函数接口数据读取失败，请检查文件是否权限以及是否存在"
                                            })
                                        } else {
                                            CCSCdata=JSON.parse(data)
                                            // console.log(chainhash)
                                            //校验数据是否正确读取
                                            if (CCSCdata==undefined){
                                                resolve(
                                                    {
                                                        chaindata:chaindata,
                                                        CCSCdata:[],
                                                        msg:"链数据读取失败，请检查相关数据或配置"
                                                    })
                                            }
                                            else
                                                resolve({
                                                    chaindata:chaindata,
                                                    CCSCdata:CCSCdata
                                                })
                                        }
                                    })
                                }
                            });

                        }
                    }
                })
            }
        });
    })
}

/*
* 数据读取，根据Hash读取相应的注册数据,同时返回chain数据
* */
const getCCSCdatawithHash = (CCSChash) => {
    var time = new Date().getTime();
    return new Promise((resolve, reject) => {
        let chaindata=undefined
        //读取CCSC的详细数据
        CCSC.find({"CCSChash":CCSChash},(err,docs)=>{
            if (docs.length!=1||docs==undefined){
                reject("合约接口数据不存在，请检查相关数据或配置")
            }else {
                chaindata=docs[0]
                chaindata.data=null
                // console.log(chainhash)
                //校验数据是否正确读取
                console.log("查询CCSC耗时",new Date().getTime()-time)
                if (chaindata==undefined){
                    reject("请检查您的合约hash是否被注册，配置是否正确！")
                }
                else
                    resolve(chaindata)
            }
        })
    })
}

/*
* 获取要进行主动更新的跨链合约接口
* */
const getactiveCCSC = (args) => {
    //以下代码仅做测试使用，获取Flag为1的合约接口
    return new Promise((resolve, reject) => {
        let chaindata=undefined

        var time = new Date().getTime();
        //读取CCSC的详细数据
        CCSC.find({},{data:0}).then((docs)=>{
            // console.log(docs)
            if (docs==undefined){
                reject("合约接口数据不存在，请检查相关数据或配置")
            }else {
                chaindata=docs
                //校验数据是否正确读取
                console.log("查询CCSC耗时",new Date().getTime()-time)
                resolve(chaindata)
            }
        })
    })

}

module.exports = {
    storageChainconfig, storageccscconfig, getchainconfig,  getCCSCdatawithHash, getallinfo,
    getactiveCCSC
}
