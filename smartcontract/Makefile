include .env

install:
	@forge install OpenZeppelin/openzeppelin-contracts --no-commit && forge install smartcontractkit/chainlink-brownie-contracts --no-commit

slither :; slither . --config-file slither.config.json

deploy : deploy-userEmitEvent deploy-raffle deploy-linkedNft deploy-chainlinkMinter

deploy-userEmitEvent:
	@forge script script/DeployUserEmitEvent.s.sol:DeployUserEmitEvent --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://polygon.blockscout.com/api/? --legacy -vvvv --via-ir

deploy-raffle:
	@forge script script/DeployRaffle.s.sol:DeployRaffle --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://polygon.blockscout.com/api/? --legacy -vvvv --via-ir

deploy-linkedNft:
	@forge script script/DeployLinkedNft.s.sol:DeployLinkedNft --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://polygon.blockscout.com/api/? --legacy -vvvv --via-ir

deploy-chainlinkMinter:
	@forge script script/DeployChainlinkMinter.s.sol:DeployChainlinkMinter --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://polygon.blockscout.com/api/? --legacy -vvvv --via-ir

deploy-randomNumberGenerator:
	@forge script script/DeployRandomNumberGenerator.s.sol:DeployRandomNumberGenerator --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://polygon.blockscout.com/api/? --legacy -vvvv --via-ir

createRaffle:
	@cast send 0xA646b852242a1593c78B30E08fdB6557E3fDca9a "createRaffle(string,string,address,uint256,string,string,address)" "Raffle" "RF" 0xFB6a372F2F51a002b390D18693075157A459641F 864000000  "description" "imageurl" 0x6F9c71817Bfa4A3E6466672143F57decea4457aF --value 20000000000000000 --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) 

updateRaffleStatus:
	@cast send 0xA646b852242a1593c78B30E08fdB6557E3fDca9a "updateRaffleStatus(uint256,bool)" 0 true --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY)

emitUserEvent:
	@cast send 0xeb6421483320405DD5378518f3F16468af9C6e9b "interactWithCampaign(address, address,uint256)" 0xFB6a372F2F51a002b390D18693075157A459641F 0xA646b852242a1593c78B30E08fdB6557E3fDca9a 0 --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY)

requestRandomNumber:
	@cast send 0x4dD01797126924A50a48CA43EAEaD277d3E57aA5 "requestRandomNumber()" --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY)

getRandomWords:
	@cast call 0x4dD01797126924A50a48CA43EAEaD277d3E57aA5 "getRandomWords()" --rpc-url $(SEPOLIA_RPC_URL) 