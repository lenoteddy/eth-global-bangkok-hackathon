// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract Raffle is ERC721URIStorage, Ownable {
    using Strings for uint256;
    /*//////////////////////////////////////////////////////////////
                                STRUCTS
    //////////////////////////////////////////////////////////////*/

    struct RaffleInfo {
        uint256 timeInterval; // time interval for the raffle
        uint256 startTime; // start time of the raffle
        uint256 nftCount; // number of NFTs to be distributed
        string description; // reference to IPFS link
        string imageURI; // image for the raffle
        uint256 rewardParticipants; // number of participants to be rewarded,
        uint256 rewardAmount; // total reward amount
        string tokenURI; // token URI
        RaffleStatus active; // if the campaign is active
    }

    enum RaffleStatus {
        ACTIVE,
        INACTIVE,
        COMPLETED
    }

    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    uint256 private s_tokenId;
    uint256 private s_minimalRewardAmount;
    uint256 private constant MINIMAL_TIME_INTERVAL = 1 days;
    // uint256 private constant TIME_BEFORE_START = 1 days;
    uint256 private constant TIME_BEFORE_START = 1 seconds;
    mapping(address raffleOwner => RaffleInfo[]) private s_creatorsToRaffles;

    /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/

    error Raffle__timeIntervalTooShort();
    error Raffle__rewardAmountTooLow();
    error Raffle__rewardParticipantsGreaterThanNftCount();
    error Raffle__NotEnoughTimePassed();
    error Raffle__TransferFailed();
    error Raffle__AlreadyCompleted();

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/

    event RaffleCreated(
        address to,
        uint256 timeInterval,
        uint256 startTime,
        uint256 nftCount,
        string description,
        string imageURI,
        uint256 rewardParticipants,
        uint256 rewardAmount,
        string tokenURI
    );

    /*//////////////////////////////////////////////////////////////
                               MODIFIERS
    //////////////////////////////////////////////////////////////*/

    modifier timeIntervalEnough(uint256 timeInterval) {
        if (timeInterval < MINIMAL_TIME_INTERVAL) {
            revert Raffle__timeIntervalTooShort();
        }
        _;
    }

    modifier rewardAmountEnough(uint256 rewardAmount) {
        if (rewardAmount < s_minimalRewardAmount) {
            revert Raffle__rewardAmountTooLow();
        }
        _;
    }

    modifier participantsLessThanNftCount(
        uint256 nftCount,
        uint256 rewardParticipants
    ) {
        if (rewardParticipants > nftCount) {
            revert Raffle__rewardParticipantsGreaterThanNftCount();
        }
        _;
    }

    modifier enoughTimePassedBeforeStart(uint256 startTime) {
        if (block.timestamp < startTime) {
            revert Raffle__NotEnoughTimePassed();
        }
        _;
    }

    modifier raffleNotCompleted(RaffleStatus active) {
        if (active == RaffleStatus.COMPLETED) {
            revert Raffle__AlreadyCompleted();
        }
        _;
    }

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTORS
    //////////////////////////////////////////////////////////////*/

    constructor() ERC721("RaffleNft", "RN") Ownable(msg.sender) {
        s_tokenId = 0;
        // s_minimalRewardAmount = 1e17; // 0.1 ETH
        s_minimalRewardAmount = 0.01 ether;
    }

    /*//////////////////////////////////////////////////////////////
                           EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    // This will create a campaign and when time passes, creator can activate the campaign or revert it
    function createRaffle(
        address to,
        uint256 timeInterval,
        uint256 nftCount,
        string memory description,
        string memory imageURI,
        uint256 rewardParticipants
    )
        external
        payable
        timeIntervalEnough(timeInterval)
        rewardAmountEnough(msg.value)
        participantsLessThanNftCount(nftCount, rewardParticipants)
    {
        string memory json = string(
            abi.encodePacked(
                "{",
                '"timeInterval": "',
                (block.timestamp + TIME_BEFORE_START).toString(),
                '", ',
                '"startTime": "',
                block.timestamp.toString(),
                '", ',
                '"nftCount": "',
                nftCount.toString(),
                '", ',
                '"description": "',
                description,
                '", ',
                '"imageURI": "',
                imageURI,
                '", ',
                '"rewardParticipants": "',
                rewardParticipants.toString(),
                '", ',
                '"rewardAmount": "',
                msg.value.toString(),
                '"',
                "}"
            )
        );

        string memory tokenURI = string(
            abi.encodePacked(_baseURI(), Base64.encode(bytes(json)))
        );

        s_creatorsToRaffles[to].push(
            RaffleInfo(
                timeInterval,
                block.timestamp + TIME_BEFORE_START,
                nftCount,
                description,
                imageURI,
                rewardParticipants,
                msg.value,
                tokenURI,
                RaffleStatus.INACTIVE
            )
        );

        emit RaffleCreated(
            to,
            timeInterval,
            block.timestamp + TIME_BEFORE_START,
            nftCount,
            description,
            imageURI,
            rewardParticipants,
            msg.value,
            tokenURI
        );
    }

    // only the 1 day constant time passed can determine if the campaign is active
    // to prevent the creator from wrongly activating the campaign or stick too much reward
    function updateRaffleStatus(
        uint256 index,
        bool active
    )
        external
        enoughTimePassedBeforeStart(
            s_creatorsToRaffles[msg.sender][index].startTime
        )
        raffleNotCompleted(s_creatorsToRaffles[msg.sender][index].active)
    {
        // if the campaign is active, mint the NFT
        if (active == true) {
            s_creatorsToRaffles[msg.sender][index].active = RaffleStatus.ACTIVE;
            _safeMint(msg.sender, s_tokenId);
            _setTokenURI(
                s_tokenId,
                s_creatorsToRaffles[msg.sender][index].tokenURI
            );
            s_tokenId++;
        } else {
            // if the campaign is not active, return the reward
            // mark the campaign as completed so that the creator can't claim the reward again
            uint256 rewardAmount = s_creatorsToRaffles[msg.sender][index]
                .rewardAmount;
            s_creatorsToRaffles[msg.sender][index].active = RaffleStatus
                .COMPLETED;
            (bool success, ) = msg.sender.call{value: rewardAmount}("");
            if (!success) {
                revert Raffle__TransferFailed();
            }
        }
    }

    /*//////////////////////////////////////////////////////////////
                            OWNER FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function setMinimalRewardAmount(
        uint256 minimalRewardAmount
    ) external onlyOwner {
        s_minimalRewardAmount = minimalRewardAmount;
    }

    /*//////////////////////////////////////////////////////////////
                           INTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    /*//////////////////////////////////////////////////////////////
                                GETTERS
    //////////////////////////////////////////////////////////////*/

    function getTokenId() external view returns (uint256) {
        return s_tokenId;
    }

    function getMinimalRewardAmount() external view returns (uint256) {
        return s_minimalRewardAmount;
    }
}
