const axios =require('axios')
const crypto =require('crypto')
// const { generateKeyPairSync } = require('crypto');
// const { publicKey, privateKey } = generateKeyPairSync('rsa', {
//     modulusLength: 4096,
//     // publicKeyEncoding: {
//     //     type: 'spki',
//     //     format: 'pem'
//     // },
//     // privateKeyEncoding: {
//     //     type: 'pkcs8',
//     //     format: 'pem',
//     //     cipher: 'aes-256-cbc',
//     //     passphrase: 'top secret'
//     // }
// });

const instance =axios.create();

const request=(url,data)=>{

    let config={
        'url':"http://172.16.0.30:8080"+url,
        'method':"post",
        'data':data,
    }

    return instance(config)

}

// const msg={
//     code: 0,
//     msg: '注册成功',
//     data: {
//         input: {
//             msg: 'success',
//             code: 1,
//             Csignature: '',
//             data: [Object],
//             count: null,
//             encryptflag: false,
//             exdata: '',
//             Msignature: ''
//         },
//         ChainHash: 'e761beebec8a8d26767c118a1fb1881f6855bd10ce73bb1165c9a820c39542dbb326dad124f9a644c3c32446899bd3fc6640ba8babf6906b15395917105d870d',
//         Publickey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjLSIEdihJ+dzcEzH9/n6Op7epIU+WVRlKT9FbcjXaDBsp/seOlCSJrg5Z1A/955qdbBgRzfTX7qGpdkH3EZ9ECTan4dehoLdEbDKgRMXzSPt0rhidKTbFULwZRk5cR7/7OPM8dlikmozCWyV8tSepJJDJNECYybxOwMxoIG23zQIDAQAB',
//         status: '0'
//     },
//     count: '',
//     exdata: '',
//     encryptflag: false,
//     csignature: 'AclRsYCzhVjNJ+pNkE4JM+mp4CUsLMcYiUWesRrO73WVe9a94J3braAIdg20UxiPIFfmuOxd7d6rJpLWTnNk7nqqBs9kg5V+Vjlw/yaJfKrJGI5Co4hQMlq0HuZk/x8edOT+PYB6sMPhHYQ94vfWKrYfp3Fk7Oxvn2i3N6s+KrM=',
//     msignature: '',
//     sk:'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAKMtIgR2KEn53NwTMf3+fo6nt6khT5ZVGUpP0VtyNdoMGyn+x46UJImuDlnUD/3nmp1sGBHN9Nfuoal2QfcRn0QJNqfh16Ggt0RsMqBExfNI+3SuGJ0pNsVQvBlGTlxHv/s48zx2WKSajMJbJXy1J6kkkMk0QJjJvE7AzGggbbfNAgMBAAECgYAaA18trmeAWZKty+qXlwt2cwLatdqB+QmJ2P0jcqrmmrD26izGjFPh1gtoIyA0hkhWCc4xgm+iv+JqSVW9TUQiGxe6Xt6ilnYmAhiFzJC/tWUgxc/y0Ze67ZHDP7oiYrHLLqffmlM3Cp5xTbVkY6AmFaK5RmAJbGeD5/JESQ6SaQJBAOeeFoQnD250YVaCPD1GrXjQIcEHIAOCYUv77J4OLXCzPlWcw2/fIfGLYLbBRZRKskgjeVCE/5CZXcbkS24pUXkCQQC0Wpto5lAlfU8M+j0nPt9WrPoRW5g40mNJ02UxFwWAcjBdgG13oihm2RacUbBTSHQLoWBze8xGwWZlG9Nsv/f1AkAKwSFkg3fI9ihq3uMzKSv21xsqHk2TPCOOZqUm9ZuQhxIW4Y+Fi0PFNmaINdMoPoumo9cHMRW4vhZHnOQPumVpAkBf30J50uSL6T7acTOM5zkmBDGyhHQ40G4DUqKaI9jC3PCk455NWCAN/Byu4CXRP9SgUhrJiOegPTLHULFlP+75AkB6wqGqL6PoOlRKNV+CCDIUr18G0uEoYLmYnNzyrJSkKxDCA+JY5jhBrPXzBgshtdXvopW7AX7i0FDXA93ytxnT'
// }
//
//
// var data=msg
// //
// var pk='-----BEGIN PUBLIC KEY-----\n'+data.data.Publickey+'\n-----END PUBLIC KEY-----'
// var sk='-----BEGIN PRIVATE KEY-----\n'+data.sk+'\n-----END PRIVATE KEY-----'
// // var signa=  Buffer.from(data.csignature,'base64')
// // let vertify=crypto.createVerify('RSA-SHA256');
//
// // var strdata=JSON.stringify(data.data)
// var strdata=JSON.stringify({"input":{"msg":"success","code":1,"Csignature":"","data":{"address":"http://172.36.4.25:10135","ChainName":"ETF","Publickey":"","ChainID":"23"},"encryptflag":false,"exdata":"","Msignature":""},"ChainHash":"c7953e0a44a812d007ac3e438ca8c77bd8ad6d2c7ac3f47be33dadee37f32da66d83c9202b17d000ac2e1b5ce1b1c5890e0768189750b0b25b59d93c3a835f6c","Publickey":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjLSIEdihJ+dzcEzH9/n6Op7epIU+WVRlKT9FbcjXaDBsp/seOlCSJrg5Z1A/955qdbBgRzfTX7qGpdkH3EZ9ECTan4dehoLdEbDKgRMXzSPt0rhidKTbFULwZRk5cR7/7OPM8dlikmozCWyV8tSepJJDJNECYybxOwMxoIG23zQIDAQAB","status":"0"}
// )
// strdata.replaceAll('\"','\'')
//
// // console.log(Buffer.from(strdata));
//
// var signna=crypto.createSign('SHA256')
// signna.update(strdata)
// sk=crypto.createPrivateKey(sk)
// var sign = signna.sign(sk);
// console.log(sign.toString('base64'));
//
// var sig='C3Wpe99vmZ1UO+jspKVrrNEBmi9waJkusprjP8EyNpfjR2hqHbysZjGf9vQFSVotAUdFmD9jHGZYXZ4KGkeC5lzIzAff8sfUmm5m8nBh5iC0iGf/a4NZAdMt4tuMrxQLFgWgXjoIL2D7LTD+Qm5ixYnJDcsvFvJPcDDhtwzt3OM='
// let ve=crypto.createVerify('SHA256')
// ve.update(strdata)
// console.log(typeof strdata)
// console.log(ve.verify(pk, Buffer.from(sig,"base64")));



var ran=new Date().getTime()%65535;

// request("/Chain/register",{
//     code: 1,
//     msg: 'success',
//     data: {
//         Address:"http://172.16.0.13:3000",
//         ChainName:"ETF",
//         ChainID:"24",
//         Publickey:"",
//     },
//     count: '',
//     exdata: '',
//     encryptflag: false,
//     Msignature:'',
//     Csignature: ''
// }).then((res)=>{
//     console.log(res.data)
//     let ve=crypto.createVerify('SHA256')
//     let strdata= JSON.stringify(res.data.data)
//     strdata.replaceAll('\"','\'')
//     ve.update(strdata)
//     let pk='-----BEGIN PUBLIC KEY-----\n'+res.data.data.Publickey+'\n-----END PUBLIC KEY-----'
//     console.log(strdata)
//     console.log(res.data.csignature)
//     console.log(ve.verify(pk, Buffer.from(res.data.csignature,"base64")));
//     // console.log(res.data)
//
// })
// let chainhash="ab2a13ed5a8a680d805358226340e545dd3b5e51a349512ed7ff5344be8a1f5bc6a11e4fef2c8f2f1a2ea502b70c62502eab39678ec74a690d295c800b3596bc"
// request("/Contract/register",{
//     code: 1,
//     msg: 'success',
//     data: {
//         ChainHash:"37e4b44937abde023a296389fd6d7a123b6e388dfb04d1dd92c6b561bc02391ba0c171064a09d6879b68a6b8f7cb45b84984ae23a9567a6a949068cf7cfb890a",
//         Address:"c7953e0a44aa12d077ac3e438",
//         FunctionName:"transfers",
//         Flag:"0",
//         ParamList:{},
//         Publickey:"953e0a44a812d077ac3e"
//     },
//     count: '',
//     exdata: '',
//     encryptflag: false,
//     Msignature:'',
//     Csignature: ''
// }).then((res)=>{
//     if (res.data.code==0){
//         let ve=crypto.createVerify('SHA256')
//         let strdata= JSON.stringify(res.data.data)
//         strdata.replaceAll('\"','\'')
//         ve.update(strdata)
//         let pk='-----BEGIN PUBLIC KEY-----\n'+res.data.data.Publickey+'\n-----END PUBLIC KEY-----'
//         console.log(strdata)
//         console.log(res.data.csignature)
//         console.log(ve.verify(pk, Buffer.from(res.data.csignature,"base64")));
//         console.log(res.data)
//     }else
//         console.log(res.data.msg)
// })

// request("/Contract/subscribe",{
//     code: 1,
//     msg: 'success',
//     data: {
//         ChainHash:"37e4b44937abde023a296389fd6d7a123b6e388dfb04d1dd92c6b561bc02391ba0c171064a09d6879b68a6b8f7cb45b84984ae23a9567a6a949068cf7cfb890a",
//         CCSCHash:"239147683ffc64063a81277f30433b2de5b438c069653d8e742f6261035a7129aa5ceac2b786dc288d064d46ec081718229e293ecbfee28c751a0699b1c009da",
//         SChainHash:"54b9d7f571b558d1593cd6b4f1a29541e13da293e7036b40e83288a22e4f1994872db0c2ec73f6058eeb6b5d2d90b705fc5cea881265a257a9dc9b6d205758c4",
//         Flag:"0",
//         Status:"0",
//         Exdata:"0"
//     },
//     count: '',
//     exdata: '',
//     encryptflag: false,
//     Msignature:'',
//     Csignature: ''
// }).then((res)=>{
//     if (res.data.code==0){
//         // console.log(res.data)
//         // let ve=crypto.createVerify('SHA256')
//         // let strdata= JSON.stringify(res.data.data)
//         // strdata.replaceAll('\"','\'')
//         // ve.update(strdata)
//         // let pk='-----BEGIN PUBLIC KEY-----\n'+res.data.data.Publickey+'\n-----END PUBLIC KEY-----'
//         // console.log(strdata)
//         // console.log(res.data.csignature)
//         // console.log(ve.verify(pk, Buffer.from(res.data.csignature,"base64")));
//         console.log(res.data)
//     }else
//         console.log(res.data.msg)
//
//
// })



/*
* 利用私钥进行签名
* */
const sign = (str,privateKey) => {
    var sk='-----BEGIN PRIVATE KEY-----\n'+privateKey+'\n-----END PRIVATE KEY-----'
    var strdata=str
    // strdata.replaceAll('\'','\"')
    // console.log(str);
    var signna=crypto.createSign('SHA256')
    signna.update(strdata)
    sk=crypto.createPrivateKey(sk)
    var sign = signna.sign(sk);
    // console.log("签名结果为：",sign.toString('base64'));
    return sign.toString('base64');
}

/*
* 公钥签名校验
* */
const checksign = (str,publicKey,sign) => {
    let ve=crypto.createVerify('SHA256')
    // let strdata= JSON.stringify(str)
    // strdata.replaceAll('\"','\'')
    ve.update(str)
    let pk='-----BEGIN PUBLIC KEY-----\n'+publicKey+'\n-----END PUBLIC KEY-----'
    return ve.verify(pk, Buffer.from(sign,"base64"));
}

let reqdata={
    ChainHash:"7f81fe3b03c3f3c356517d2088e0f555676e5c84d5a32c205971d851ebd38841e9181a03a2a333dcd847bfb76e912f323b1aaf3b27d8b0eab482cd89afdbdfb9",
    CCSCHash:"c7791ca72a2fa60634c0eb37e6737c8621cc4dadd4f7f730d590bb3abe79059ff2ddd21acd5960400e260d51009d42899fefaa45e6f52e284a66d19bab8303a5",
    Result:{
        amount:"123"
    },
    Flag:"0",
    Status:"0",
    Exdata:"0"
}

request("/Invocation/activesync",{
    code: 1,
    msg: 'success',
    data: JSON.stringify(reqdata),
    count: '',
    exdata: '',
    encryptflag: false,
    Msignature: sign(JSON.stringify(reqdata),),
    Csignature: ''
}).then((res)=>{
    if (res.data.code==0){
        // console.log(res.data)
        // let ve=crypto.createVerify('SHA256')
        // let strdata= JSON.stringify(res.data.data)
        // strdata.replaceAll('\"','\'')
        // ve.update(strdata)
        // let pk='-----BEGIN PUBLIC KEY-----\n'+res.data.data.Publickey+'\n-----END PUBLIC KEY-----'
        // console.log(strdata)
        // console.log(res.data.csignature)
        // console.log(ve.verify(pk, Buffer.from(res.data.csignature,"base64")));
        console.log(res.data)
    }else
        console.log(res.data)


})
