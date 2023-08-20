const web3 = require('web3');

//eth 实现
const subcribecontract = (url,addr,topics,subcall) => {
    // console.log(url,addr,topics)
    const ethws = new web3(url)
    return ethws.eth.subscribe('logs', {address:addr,topics:topics}, function(error, result){
        if (error)
            console.log(error);
    })
        .on("connected", function(subscriptionId){
            console.log("已订阅：",addr,"\n订阅ID为：",subscriptionId,"\nTopics为：",topics);
        })
        // .on("data", (log) => {
        //     console.log(log)
        //     // activemulti(log,item.CCSChash||"")
        // })
        .on("changed", function(log){
        });
}

module.exports = {subcribecontract}
