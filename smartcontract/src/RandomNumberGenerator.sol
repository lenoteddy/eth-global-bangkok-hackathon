// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {VRFCoordinatorV2Interface} from "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol";
import {VRFConsumerBaseV2} from "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";

contract RandomNumberGenerator is VRFConsumerBaseV2 {
    uint64 s_subscriptionId;
    VRFCoordinatorV2Interface s_vrfCoordinator;
    bytes32 s_keyHash;
    uint32 s_callbackGasLimit;
    uint16 s_requestConfirmations = 3;
    uint32 s_numWords = 1;

    uint256 public s_randomWords;

    constructor(
        uint64 _subscriptionId,
        address _vrfCoordinator,
        bytes32 _keyHash,
        uint32 _callbackGasLimit
    ) VRFConsumerBaseV2(_vrfCoordinator) {
        s_subscriptionId = _subscriptionId;
        s_vrfCoordinator = VRFCoordinatorV2Interface(_vrfCoordinator);
        s_keyHash = _keyHash;
        s_callbackGasLimit = _callbackGasLimit;
    }

    function requestRandomNumber() public {
        s_vrfCoordinator.requestRandomWords(
            s_keyHash,
            s_subscriptionId,
            s_requestConfirmations,
            s_callbackGasLimit,
            s_numWords
        );
    }

    function fulfillRandomWords(
        uint256 /*_requestId*/,
        uint256[] memory _randomWords
    ) internal override {
        s_randomWords = _randomWords[0];
    }

    function getRandomWords() public view returns (uint256) {
        return s_randomWords;
    }
}
