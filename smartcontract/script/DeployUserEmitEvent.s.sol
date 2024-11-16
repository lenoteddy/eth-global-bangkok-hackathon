// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {UserEmitEvent} from "src/UserEmitEvent.sol";

contract DeployUserEmitEvent is Script {
    function run() external returns (UserEmitEvent) {
        vm.startBroadcast();
        UserEmitEvent userEmitEvent = new UserEmitEvent();
        vm.stopBroadcast();
        return (userEmitEvent);
    }
}
