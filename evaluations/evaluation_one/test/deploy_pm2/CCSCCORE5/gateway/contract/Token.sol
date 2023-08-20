pragma solidity 0.5.2;

contract Token {
    address public issuer;
    mapping (address => uint) public balances;

    event Sent(address from, address to, uint amount);
    event Change(address account,uint currentamount);

    constructor() public{
        issuer = msg.sender;
        balances[issuer] = 10000;
    }

    function issue(address receiver, uint amount) public {
        if (msg.sender != issuer) return;
        balances[receiver] += amount;
        emit Change(receiver,amount);
    }

    function getbalence(address receiver) public view returns (uint balence){
        return balances[receiver];
    }

    function send(address receiver, uint amount) public returns (uint balence , string memory result){
        if (balances[msg.sender] < amount) return (0,"failed");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
        return (balances[receiver],"success");
    }
}

