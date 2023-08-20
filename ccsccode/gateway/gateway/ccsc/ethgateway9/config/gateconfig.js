const gatewayconfig={
    //ip默认为本地IP，不建议修改,或修改为对外的IP，例如：192.168.10.1
    ip: "172.16.0.37",
    //端口可任意指定
    port: "3009",
    ChainName: "ETH",
    ChainID: "17",
    //口令校验，无口令则无法进行网关的初始化，以及准备阶段
    password:"123456",

    mongodb:{
        host:"127.0.0.1",
        port: "27017",
        schema: "oraclegate9"
    }
}
module.exports = gatewayconfig
