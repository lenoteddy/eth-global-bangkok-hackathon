// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Script} from "forge-std/Script.sol";
import {RandomNumberGenerator} from "src/RandomNumberGenerator.sol";

contract DeployRandomNumberGenerator is Script {
    address owner = 0xFB6a372F2F51a002b390D18693075157A459641F;
    uint64 _subscriptionId = 9571;
    address _vrfCoordinator = 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625;
    bytes32 _keyHash =
        0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c;
    uint32 _callbackGasLimit = 2500000;

    function run() external returns (RandomNumberGenerator) {
        vm.startBroadcast(owner);
        RandomNumberGenerator randomNumberGenerator = new RandomNumberGenerator(
            _subscriptionId,
            _vrfCoordinator,
            _keyHash,
            _callbackGasLimit
        );
        vm.stopBroadcast();
        return (randomNumberGenerator);
    }
}
