// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {UserEmitEvent} from "src/UserEmitEvent.sol";

contract DeployUserEmitEvent is Script {
    address owner = 0xFB6a372F2F51a002b390D18693075157A459641F;

    function run() external returns (UserEmitEvent) {
        vm.startBroadcast(owner);
        UserEmitEvent userEmitEvent = new UserEmitEvent();
        vm.stopBroadcast();
        return (userEmitEvent);
    }
}
