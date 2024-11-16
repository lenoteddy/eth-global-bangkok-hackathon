// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {LinkedNft} from "src/LinkedNft.sol";

contract DeployLinkedNft is Script {
    string constant NAME = "LinkedNft";
    string constant SYMBOL = "LNFT";
    address owner = 0xFB6a372F2F51a002b390D18693075157A459641F;

    function run() external returns (LinkedNft) {
        vm.startBroadcast(owner);
        LinkedNft linkedNft = new LinkedNft(NAME, SYMBOL);
        vm.stopBroadcast();
        return (linkedNft);
    }
}
