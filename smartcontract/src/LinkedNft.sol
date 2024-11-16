// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract LinkedNft is ERC721 {
    uint256 public s_counter;
    mapping(address user => bool minted) public s_userMintedOrNot;

    error LinkedNft__AlreadyMinted();

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        s_counter = 0;
    }

    function mint(address to) external {
        if (s_userMintedOrNot[to]) {
            revert LinkedNft__AlreadyMinted();
        }
        s_userMintedOrNot[to] = true;
        _safeMint(to, s_counter);
        s_counter++;
    }

    function getCounter() external view returns (uint256) {
        return s_counter;
    }
}
