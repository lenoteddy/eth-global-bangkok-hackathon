// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Test, console} from "forge-std/Test.sol";
import {Raffle} from "src/Raffle.sol";
import {DeployRaffle} from "script/DeployRaffle.s.sol";

contract RaffleTest is Test {
    Raffle raffle;
    DeployRaffle deployer;

    address owner = 0xFB6a372F2F51a002b390D18693075157A459641F;
    uint256 timeInterval = 864000000;
    address linkedNft = makeAddr("linkedNft");

    function setUp() public {
        deployer = new DeployRaffle();
        raffle = deployer.run();
        vm.deal(owner, 100e18);
    }

    function testRaffleCreateSuccessfully() public {
        raffle.createRaffle{value: 20000000000000000}(
            "Raffle 1",
            "R1",
            owner,
            timeInterval,
            "des",
            "uri",
            linkedNft
        );

        vm.warp(block.timestamp + 1000000);
        vm.startPrank(owner);
        raffle.updateRaffleStatus(0, true);
        console.log("linkedNft", linkedNft);

        vm.stopPrank();
    }
}
