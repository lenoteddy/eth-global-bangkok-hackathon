// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {RandomNumberGenerator} from "src/RandomNumberGenerator.sol";

contract DeployRandomNumberGenerator is Script {
    address owner = 0xFB6a372F2F51a002b390D18693075157A459641F;
    uint256 subscriptionId =
        56003561226016405806153830093780721658933566768163361981188016113168550918782;
    bytes32 gasLane =
        0x816bedba8a50b294e5cbd47842baf240c2385f2eaf719edbd4f250a137a8c899;
    uint32 callbackGasLimit = 2500000;
    address vrfCoordinatorV2 = 0x343300b5d84D444B2ADc9116FEF1bED02BE49Cf2;

    function run() external returns (RandomNumberGenerator) {
        vm.startBroadcast(owner);
        RandomNumberGenerator randomNumberGenerator = new RandomNumberGenerator(
            subscriptionId,
            gasLane,
            callbackGasLimit,
            vrfCoordinatorV2
        );
        vm.stopBroadcast();
        return (randomNumberGenerator);
    }
}
