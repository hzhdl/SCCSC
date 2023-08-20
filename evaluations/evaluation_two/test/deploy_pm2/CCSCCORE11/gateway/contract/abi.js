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
module.exports = abi;
