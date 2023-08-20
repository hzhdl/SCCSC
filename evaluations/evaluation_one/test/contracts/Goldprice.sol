pragma solidity ^0.5.2;

/**
 * 无参数示例合约
 */
contract Goldprice {

    // 入口地址
    bytes32 public Goldprice;

    ///////////////
    //// Event
    ///////////////

    event SetGoldprice(bytes32);

    ///////////////
    //// Functions
    ///////////////

    // 设置入口
    function setGoldprice(bytes32 w) external {
        Goldprice=w;
        emit SetGoldprice(Goldprice);
    }

    // 设置入口
    function getGoldprice() external view returns (bytes32 resgoldprice){
        resgoldprice=Goldprice;
    }

}
