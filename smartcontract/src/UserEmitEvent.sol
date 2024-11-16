// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Raffle} from "./Raffle.sol";

contract UserEmitEvent {
    event UserEvent(
        address indexed userWalletAddress,
        address indexed raffle,
        uint256 indexed raffleNftTokenId
    );

    function interactWithCampaign(
        address raffle,
        uint256 raffleNftTokenId
    ) public {
        emit UserEvent(msg.sender, raffle, raffleNftTokenId);
    }
}
