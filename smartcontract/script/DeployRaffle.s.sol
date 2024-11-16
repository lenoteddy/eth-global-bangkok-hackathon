// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {Raffle} from "src/Raffle.sol";

contract DeployRaffle is Script {
    function run() external returns (Raffle) {
        vm.startBroadcast();
        Raffle raffle = new Raffle();
        vm.stopBroadcast();
        return (raffle);
    }
}
