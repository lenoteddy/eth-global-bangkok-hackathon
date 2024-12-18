// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {Raffle} from "src/Raffle.sol";

contract DeployRaffle is Script {
    address owner = 0xFB6a372F2F51a002b390D18693075157A459641F;
    address randomNumberGeneration = 0xCAD005517380E4c3e3841F78746c17f05e266c5D
    ;

    function run() external returns (Raffle) {
        vm.startBroadcast(owner);
        Raffle raffle = new Raffle(randomNumberGeneration);
        vm.stopBroadcast();
        return (raffle);
    }
}
