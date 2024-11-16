// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract LinkedNft is ERC721, Ownable {
    address public s_raffle;
    uint256 public s_raffleNftTokenId;
    uint256 public s_counter;
    bool public s_initialized;
    mapping(address user => bool minted) public s_userMintedOrNot;

    error LinkedNft__AlreadyInitialized();
    error LinkedNft__AlreadyMinted();

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) Ownable(msg.sender) {
        s_counter = 0;
        s_initialized = false;
    }

    function mint(address to) external {
        if (s_userMintedOrNot[to]) {
            revert LinkedNft__AlreadyMinted();
        }
        s_userMintedOrNot[to] = true;
        _safeMint(to, s_counter);
        s_counter++;
    }

    function initialize(
        address _raffle,
        uint256 _raffleNftTokenId
    ) public onlyOwner {
        if (s_initialized) {
            revert LinkedNft__AlreadyInitialized();
        }
        s_raffle = _raffle;
        s_raffleNftTokenId = _raffleNftTokenId;
        s_initialized = true;
    }
}
