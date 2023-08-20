const axios =require('axios')
const instance =axios.create();
const request= (url,data)=>{

    let config={
        'url':"http://localhost:3000"+url,
        'method':"post",
        'data':data,
        'timeout':30000
    }

    return instance(config)

}
// const a1 = (a,c) => {
//   return new Promise(((resolve, reject) =>{
//       setTimeout(()=>{
//           console.log(a,c)
//       },1000)
//       resolve(a+"dsfasd")
//   }))
// }
// const b1 = () => {
//   return new Promise(((resolve, reject) =>{
//       setTimeout(()=>{
//           console.log("45465")
//       },500)
//       resolve("45465")
//   }))
// }
//
// b1().then((res) => a1(res,"111111111"))

// request("/registerchain",{msg:"hello"}).then((res)=>{
//     console.log(res.data)
// })

// request("/subconstract",{msg:"hello 1111"}).then((res)=>{
//     console.log(res.data)
// })

// request("/active",{msg:"hello 1111"}).then((res)=>{
//     console.log("res.data".substring(0,1))
// })

// request("/registerconstract",{address:"0x153468976sdf46546",
//     functionname:"transfer",
//     paramlist:{
//         address:{type:"string"},
//         amount:{type:"int"}
//     }
// }).then((res)=>{
//     console.log(res.data)
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


//
const Web3=require('web3')

const hlink="http://172.16.0.37:8645"
const abi=[
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "a",
                "type": "address"
            }
        ],
        "name": "retrieve",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bool",
                        "name": "flag",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "blockheight",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes32[3]",
                        "name": "values",
                        "type": "bytes32[3]"
                    }
                ],
                "internalType": "struct Storage.data",
                "name": "rea",
                "type": "tuple"
            },
            {
                "internalType": "bool",
                "name": "reb",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "a",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "f",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "t",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "b",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "v1",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "v2",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "v3",
                "type": "bytes32"
            }
        ],
        "name": "set",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

/*
* 数据分析并上链
* */
var web3http = new Web3(hlink)
web3http.eth.getAccounts().then((res)=>{
    console.log(res)
})
var contract = new web3http.eth.Contract(abi,'0xCE87e748B6Cd96de96534478C213584fC839A610');
contract.methods.retrieve("0xE2612d75e9BEBe8924d1d3e92a0003876eF113fa").call().then((res)=>{
    console.log(res)
})











