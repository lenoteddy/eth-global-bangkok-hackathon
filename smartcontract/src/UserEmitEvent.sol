// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Raffle} from "./Raffle.sol";

contract UserEmitEvent {
    event UserEvent(address indexed userWalletAddress, address indexed raffle);

    function interactWithCampaign(address raffle) public {
        emit UserEvent(msg.sender, raffle);
    }
}
