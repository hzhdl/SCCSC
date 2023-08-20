const  {request}=require('./request.js')

// 初始化两个网关，进行注册
for (let i = 0; i < 5; i++) {
    request("300"+i.toString(),"/registerchain",{password:"123456"}).then((res)=>{
        console.log(res.data)
    })
}




// request("/active",{msg:"hello 1111"}).then((res)=>{
//     console.log("res.data".substring(0,1))
// })


//
// const { generateKeyPairSync } = require('crypto');
// const { publicKey, privateKey } = generateKeyPairSync('rsa', {
//     modulusLength: 4096,
//     publicKeyEncoding: {
//         type: 'spki',
//         format: 'pem'
//     },
//     privateKeyEncoding: {
//         type: 'pkcs8',
//         format: 'pem'
//     }
// });
// var s = publicKey.toString().replaceAll('\n','');
// var s1 = privateKey.toString().replaceAll('\n','');
// // console.log(s.substring(26,s.indexOf("-----END PUBLIC KEY-----")));
// console.log("\n")
// console.log(s1.substring(27,s1.indexOf("-----END PRIVATE KEY-----")));
// console.log(s1.substring());














