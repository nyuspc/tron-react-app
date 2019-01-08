pragma solidity ^0.4.23;

contract MemoPad {
    constructor() public {
        title = "First Memo";
        memo = "Hello TRON!";
        author = msg.sender;
    }

    string public title;
    string public memo;
    address public author;

    function Post(string _title, string _memo) public returns (bool) {
        title = _title;
        memo = _memo;
        author = msg.sender;
        return true;
    }
}
