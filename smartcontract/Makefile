include .env

install:
	@forge install OpenZeppelin/openzeppelin-contracts --no-commit && forge install smartcontractkit/chainlink-brownie-contracts --no-commit

slither :; slither . --config-file slither.config.json

deploy : deploy-userEmitEvent deploy-raffle deploy-linkedNft deploy-chainlinkMinter

deploy-userEmitEvent:
	@forge script script/DeployUserEmitEvent.s.sol:DeployUserEmitEvent --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://eth-sepolia.blockscout.com/api/? --legacy -vvvv --via-ir

deploy-raffle:
	@forge script script/DeployRaffle.s.sol:DeployRaffle --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://eth-sepolia.blockscout.com/api/? --legacy -vvvv --via-ir

deploy-linkedNft:
	@forge script script/DeployLinkedNft.s.sol:DeployLinkedNft --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://eth-sepolia.blockscout.com/api/? --legacy -vvvv --via-ir

deploy-chainlinkMinter:
	@forge script script/DeployChainlinkMinter.s.sol:DeployChainlinkMinter --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://eth-sepolia.blockscout.com/api/? --legacy -vvvv --via-ir

deploy-randomNumberGenerator:
	@forge script script/DeployRandomNumberGenerator.s.sol:DeployRandomNumberGenerator --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://eth-sepolia.blockscout.com/api/? --legacy -vvvv --via-ir

createRaffle:
	@cast send 0xc9B4aC9c17006B9220b9A5F33a97CD169fd208e3 "createRaffle(string,string,address,uint256,string,string,address)" "Raffle" "RF" 0xFB6a372F2F51a002b390D18693075157A459641F 864000000  "description" "imageurl" 0xe58191c60e828a957EC02Bf267A1AaA257190F51 --value 20000000000000000 --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) 

updateRaffleStatus:
	@cast send 0xc9B4aC9c17006B9220b9A5F33a97CD169fd208e3 "updateRaffleStatus(uint256,bool)" 0 true --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY)

emitUserEvent:
	@cast send 0xa8278866B090180D2737c07dbBdbaf660c47D017 "interactWithCampaign(address,uint256)" 0xc9B4aC9c17006B9220b9A5F33a97CD169fd208e3 0 --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY)

requestRandomNumber:
	@cast send 0xCc67861552Bf06688eaB9A0F9bc3c43b906Cba2c "requestRandomNumber()" --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY)

getRandomWords:
	@cast call 0xCc67861552Bf06688eaB9A0F9bc3c43b906Cba2c "getRandomWords()" --rpc-url $(SEPOLIA_RPC_URL) 