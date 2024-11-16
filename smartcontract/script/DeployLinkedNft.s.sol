// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {LinkedNft} from "src/LinkedNft.sol";

contract DeployLinkedNft is Script {
    string constant NAME = "LinkedNft";
    string constant SYMBOL = "LNFT";

    function run() external returns (LinkedNft) {
        vm.startBroadcast();
        LinkedNft linkedNft = new LinkedNft(NAME, SYMBOL);
        vm.stopBroadcast();
        return (linkedNft);
    }
}
