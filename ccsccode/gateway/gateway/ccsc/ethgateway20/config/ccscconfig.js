const ccscconfig={
    default:{
        ip:"172.16.0.37",
        port:"8080",
    },
    //Subargs用来配置订阅，根据flag来生成指定的订阅并配置响应的同步或访问操作，
    Subargs:[
        {
            flag: "0",
            CCSCHash:"652fa047f7d3d995733f20625099ec99fd57c3313530b48cecf04ac8e173a92963cb805d16a0c3377df7e13088046790ab86699d0c83cef64555e5b730b1fa22",
            args:{
                address: '0xADc6CB8d1F87C11aFd23Ee5617431e909b6FD025',
                topics: [
                    '0x440c46490705db9a864dc31bdad678e88117017a67de18172dcb7520872b5dd9'
                ]
            }
        },
        {
            flag: "1",
            CCSCHash:"50fc77002c4117830b128670a499eebcfb30dbc78f3034c8d638e3898ba425dbe4de94bd665f7c45a59bc96b24f859eba55600005dab125838eec9da2a5d332a",
            args:{
                address: '0x05D077f1cAc4Bc1FFfa769F0bf2D78701769C468',
                topics: [
                    '0x440c46490705db9a864dc31bdad678e88117017a67de18172dcb7520872b5dd9'
                ]
            }
        },
        {
            flag: "2",
            CCSCHash:"8b5ee4ef15ab0745c08dacad418966773157e783af23569769f8dad25682c92e2c60d3407f391dca97d0456819bf58b54293d4044c896ad5f22708cdcdb2a423",
            args:{
                address: '0x9356613adFf3a08975c6338b7a7f9D622b094ef3',
                topics: [
                    '0x440c46490705db9a864dc31bdad678e88117017a67de18172dcb7520872b5dd9'
                ]
            }
        },
    ],
    CCSC:{
        //topic，作为索引，保留要访问的数据信息
        "440c46490705db9a864dc31bdad678e88117017a67de18172dcb7520872b5dd9":[{
            "ChainHash": "31ef84c645ac4ec721f756ab9f922ccc8e1ac03478896b3e29c2827da1adf55bf8b4b7480cfadb90f87a95844393850a8cff5fdbef855efb3251bfd1cc279e4c",
            "CCSChash": "8b5ee4ef15ab0745c08dacad418966773157e783af23569769f8dad25682c92e2c60d3407f391dca97d0456819bf58b54293d4044c896ad5f22708cdcdb2a423",
            "Address": "0x9356613adFf3a08975c6338b7a7f9D622b094ef3",
            "FunctionName": "set",
            "Flag": "2",
            "args":{
                a:"123",
                b:"456"
            },
            "ParamList": [
                {
                    "name": "a",
                    "type": "address",
                    "indexed": null,
                    "components": null,
                    "arrayLength": null,
                    "arrayChildren": null,
                    "baseType": "address",
                    "_isParamType": true
                },
                {
                    "name": "b",
                    "type": "bytes32",
                    "indexed": null,
                    "components": null,
                    "arrayLength": null,
                    "arrayChildren": null,
                    "baseType": "bytes32",
                    "_isParamType": true
                }
            ],
            "pk": "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmq27WA7gUhD2nRfgwZgA+igPIgQEcjOFaWPT0q5+xYG/kBqL8lme20piQgieEM4SHm2jEZCqVyXmpOYoITLS+j8iyNXnVriSu6oKJVpKfwHJURVR5+IhEtxsGoE1eQA5WJPpzmZxd/MlzUU2GYZ1fcGpQPl7PkD8TZDcHeXC5fl6LYmdgmqiloR9a61egS1fFMeEtUw5mh3aWdmoKv7bFbqQL+O/Wa2M74fY3Lh1byAo3yd9oC1tVf5v9AzKSTHIJFrzgAcZ+Su9+GNg5XmU7LIaHqR0LO3gvhBoDiB4FMhgLCUzLkXlX+lzF9YWuVL2puKLWLG/AybJaNZmdPlyRH7wGCr1kVR6+16TX1XxGI0fmKy+/XYibubFZrO4n6AUiz218TY2jg0SrdiXrxX+jObGf9HToXC+oMs2dFNrgxEKpeiWMngEKzd0L+0LB3yY0Ete2yxZaFMiHO6f87fKy/MxbFt6zeI1Xkm9BU3aPWtC9tVlQR2qbyb5j+7eF5iD+r0CfBJhkwzbEKoZiqUafv4wXbXBR21qfVgbeR+WjkOeTe5reWnxHlql+BoEwdEdNgm4AglDmVMnsLFHT1TOxkQUNlaeFsmlLWLUR+pGA3BkAuj9RChdUEQgY/flXvwZZCmZo9PKZeivigtI87ReSM5NydaGtQAniQLQkBdtw+kCAwEAAQ==",
        }]
    }
}
module.exports=ccscconfig
