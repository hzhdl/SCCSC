const mmr={
    port: "60019"
}
const mmrconfig=[{
    host:"http://127.0.0.1",
    port:"8640",
    SCAddr:"0x5A32f3c0a96cD33b093D26D0B1Aac5a3a3715266",
    func:"getGoldprice",
    topics:[
        "0xbda0553cb8ce83a953f7df7633a4923fac43306af7506421652c9c42dcaf8c42"
    ],
    ABI:"[{\"type\":\"function\",\"name\":\"Goldprice\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"bytes32\"}]},{\"type\":\"function\",\"name\":\"getGoldprice\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"bytes32\",\"name\":\"resgoldprice\"}]},{\"type\":\"function\",\"name\":\"setGoldprice\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"bytes32\",\"name\":\"w\"}],\"outputs\":[]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"SetGoldprice\",\"inputs\":[{\"type\":\"bytes32\",\"indexed\":false}]}]",
},
    {
        host:"http://127.0.0.1",
        port:"8640",
        SCAddr:"0x5A32f3c0a96cD33b093D26D0B1Aac5a3a3715266",
        func:"getbalence",
        topics:[
            "0x3990db2d31862302a685e8086b5755072a6e2b5b780af1ee81ece35ee3cd3345"
        ],
        ABI:"[{\"type\":\"function\",\"name\":\"getbalence\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"receiver\"}],\"outputs\":[{\"type\":\"uint256\",\"name\":\"balence\"}]},{\"type\":\"function\",\"name\":\"issuer\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"address\"}]},{\"type\":\"function\",\"name\":\"balances\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"address\"}],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"issue\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"receiver\"},{\"type\":\"uint256\",\"name\":\"amount\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"send\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"receiver\"},{\"type\":\"uint256\",\"name\":\"amount\"}],\"outputs\":[{\"type\":\"uint256\",\"name\":\"balence\"},{\"type\":\"string\",\"name\":\"result\"}]},{\"type\":\"constructor\",\"payable\":false,\"inputs\":[]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"Sent\",\"inputs\":[{\"type\":\"address\",\"name\":\"from\",\"indexed\":false},{\"type\":\"address\",\"name\":\"to\",\"indexed\":false},{\"type\":\"uint256\",\"name\":\"amount\",\"indexed\":false}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"Change\",\"inputs\":[{\"type\":\"address\",\"name\":\"account\",\"indexed\":false},{\"type\":\"uint256\",\"name\":\"currentamount\",\"indexed\":false}]}]",
    }

]
module.exports = {mmr,mmrconfig}
