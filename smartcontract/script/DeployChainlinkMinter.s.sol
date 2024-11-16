// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {ChainlinkMinter} from "src/ChainlinkMinter.sol";

contract DeployChainlinkMinter is Script {
    function run() external returns (ChainlinkMinter) {
        vm.startBroadcast();
        ChainlinkMinter chainlinkMinter = new ChainlinkMinter();
        vm.stopBroadcast();
        return (chainlinkMinter);
    }
}
