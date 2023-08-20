pragma solidity ^0.5.2;

contract State {
    address public issuer;
    mapping (bytes20 => bytes) public state;
    mapping (bytes20 => bytes) public sign;

    event Set(bytes20 ccschash, bytes result,bytes sign);

    constructor() public{
        issuer = msg.sender;
    }

    function setstate(bytes20 ccschash, bytes memory result,bytes memory _sign) public {
        state[ccschash]=result;
        sign[ccschash]=_sign;
        emit Set(ccschash,result,_sign);
    }

    function getsign(bytes20 ccschash) public view returns (bytes memory _sign){
        _sign = sign[ccschash];
        return _sign;
    }
    function getstate(bytes20 ccschash) public view returns (bytes memory _state){
        _state = state[ccschash];
        return _state;
    }
}

