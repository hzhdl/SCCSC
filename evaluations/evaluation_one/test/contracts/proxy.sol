// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract proxy {

    mapping(address=>bytes32) public ccsc;
    event setstate(address a,bytes32 b);
    address private  owner;
    modifier isOwner() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all
        // changes to the state and to Ether balances are reverted.
        // This used to consume all gas in old EVM versions, but not anymore.
        // It is often a good idea to use 'require' to check if functions are called correctly.
        // As a second argument, you can also provide an explanation about what went wrong.
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    constructor(){
        owner=msg.sender;
    }

    function retrieve(address a) public view returns (bytes32) {
        if(ccsc[a].length==0) {
            return bytes32("sdf");
        }
        return ccsc[a];
    }

    function set(address a,bytes32 b) public isOwner() {
        ccsc[a]=b;
        emit setstate(a,b);
    }
}
