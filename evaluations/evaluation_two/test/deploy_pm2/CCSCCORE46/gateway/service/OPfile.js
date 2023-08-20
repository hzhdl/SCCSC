const fs =require('fs')
const path = require('path')
const gateconfig = require('../config/gateconfig.js')
/*
* 数据存储方法，覆盖式存储
* */
const storageconfig = (p,data) => {
  fs.writeFile(p,data,"utf8",function (err, data1) {
    if(err){
      console.error(err);
    }
    else{
      console.log(p,"保存成功")
      // res.send(JSON.stringify(data1));
    }
  })
}
/*
* 数据存储，主要用来存储CCSCHash数据
* */
const storageccscconfig = (p,data) => {
  fs.appendFile(p,data+"\n","utf8",function (err, data1) {
    if(err){
      console.error(err);
    }
    else{
      // 保存成功
      console.log("保存成功")
      //   console.log(res.privatekey,typeof res.privatekey)
    }
  })
}

/*
* 数据读取，读取chain数据，直接返回相应的数据
* */
const getchainconfig = () => {
  return new Promise((resolve, reject) => {
    var chainpem = path.resolve(__dirname,"../config/chain/chain.pem");
    let chaindata=undefined
    //读取chain的详细数据
    fs.readFile(chainpem, 'utf8', (error, data) =>{
      if (error) {
        console.log(error)
        reject("文件读取失败，请检查文件是否权限以及是否存在")
      } else {
        chaindata=JSON.parse(data)
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
  return new Promise((resolve, reject) => {
    let chaindata=undefined
    //读取chain的详细数据
    var CCSCdata = path.resolve(__dirname,"../config/contractstate/"+ CCSChash +".data");
    fs.readFile(CCSCdata, 'utf8', (error, data) =>{
      if (error) {
        console.log(error)
      } else {
        chaindata=JSON.parse(data)
        // console.log(chainhash)
        //校验数据是否正确读取
        if (chaindata==undefined){
          reject("请检查您的合约hash是否被注册，配置是否正确！")
        }
        else
          resolve(chaindata)
      }
    })
  })
}

module.exports = {
  storageconfig, storageccscconfig, getchainconfig,  getCCSCdatawithHash, getallinfo
}
