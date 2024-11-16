// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {ChainlinkMinter} from "src/ChainlinkMinter.sol";

contract DeployChainlinkMinter is Script {
    address owner = 0xFB6a372F2F51a002b390D18693075157A459641F;

    function run() external returns (ChainlinkMinter) {
        vm.startBroadcast(owner);
        ChainlinkMinter chainlinkMinter = new ChainlinkMinter();
        vm.stopBroadcast();
        return (chainlinkMinter);
    }
}
