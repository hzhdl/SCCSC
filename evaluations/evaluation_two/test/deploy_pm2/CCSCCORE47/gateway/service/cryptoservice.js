const { generateKeyPairSync } = require('crypto');
const crypto = require('crypto')




/*
* 生成秘钥对
* */
const getKEY = () => {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
    var s = publicKey.toString().replaceAll('\n','');
    var s1 = privateKey.toString().replaceAll('\n','');
    // console.log(s.substring(26,s.indexOf("-----END PUBLIC KEY-----")));
    // console.log("\n")
    // console.log(s1.substring(27,s1.indexOf("-----END PRIVATE KEY-----")));
    // console.log(s1.substring());
    return {
        publicKey: s.substring(26,s.indexOf("-----END PUBLIC KEY-----")),
        privateKey: s1.substring(27,s1.indexOf("-----END PRIVATE KEY-----"))
    }

}

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

module.exports = {
    getKEY,sign,checksign
}

