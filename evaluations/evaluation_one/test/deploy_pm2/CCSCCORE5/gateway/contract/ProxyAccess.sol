pragma solidity ^0.5.2;

contract ProxyAccess {

    address public owner;
    address public StateC;
    event Set(bytes20 ccschash, bytes result,bytes sign);
    event Getsign(bytes20 ccschash, bytes sign);
    event Getstate(bytes20 ccschash, bytes result);

    constructor() public{
        owner = msg.sender;
    }

    function setStateC(address _StateC) public {
        require(msg.sender==owner,"you can't do this");
        StateC = _StateC;
    }


    function callsetstate(bytes20 ccschash, bytes memory result,bytes memory sign) public {
        (bool success,) = StateC.call(abi.encodeWithSignature("setstate(bytes20,bytes,bytes)",ccschash,result,sign));
        require(success, "call failed");
        emit Set(ccschash,result,sign);
        return ;
    }
    function callgetsign(bytes20 ccschash) public returns (bytes memory sign) {
        bool success;
        (success, sign) = StateC.call(abi.encodeWithSignature("getsign(bytes20)",ccschash));
        require(success, "call failed");
        emit Getsign(ccschash,abi.decode(sign,(bytes)));
        return abi.decode(
            sign,(bytes));
    }
    function callgetstate(bytes20 ccschash) public returns (bytes memory state) {
        bool success;
        (success, state) = StateC.call(abi.encodeWithSignature("getstate(bytes20)",ccschash));
        require(success, "call failed");
        emit Getstate(ccschash,abi.decode(state,(bytes)));
        return abi.decode(state,(bytes));
    }
}
