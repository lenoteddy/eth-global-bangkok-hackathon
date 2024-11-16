// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract UserEmitEvent {
    event UserEvent(
        address indexed userWalletAddress,
        address indexed raffle,
        uint256 indexed raffleNftTokenId
    );

    function interactWithCampaign(
        address to,
        address raffle,
        uint256 raffleNftTokenId
    ) public {
        emit UserEvent(to, raffle, raffleNftTokenId);
    }
}
