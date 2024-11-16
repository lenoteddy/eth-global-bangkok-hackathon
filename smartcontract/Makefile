include .env

install:
	@forge install OpenZeppelin/openzeppelin-contracts --no-commit && forge install smartcontractkit/chainlink-brownie-contracts --no-commit

slither :; slither . --config-file slither.config.json

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
	@cast send 0x61f5eF92ECB0A97dE29b62d6d12364aF77815C89 "createRaffle(string,string,address,uint256,string,string,address)" "Win Win" "WW" 0xFB6a372F2F51a002b390D18693075157A459641F 599  "win a share of hackathon prize" "https://eth-global-bangkok-hackathon.vercel.app/logo_win.svg" 0x2Eb896dfAe90a782df796584A4a9285f850C23de --value 20000000000000000 --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) 

updateRaffleStatus:
	@cast send 0x61f5eF92ECB0A97dE29b62d6d12364aF77815C89 "updateRaffleStatus(uint256,bool)" 0 true --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY)

emitUserEvent:
	@cast send 0x1D9aaBf758452B3F6e7b2184eBE252732a6b4499 "interactWithCampaign(address, address,uint256)" 0xFB6a372F2F51a002b390D18693075157A459641F 0x61f5eF92ECB0A97dE29b62d6d12364aF77815C89 0 --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY)

getWinner:
	@cast call 0x61f5eF92ECB0A97dE29b62d6d12364aF77815C89 "getWinner(address,uint256)" 0xFB6a372F2F51a002b390D18693075157A459641F 0 --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY)

getEndTime:
	@cast call 0x61f5eF92ECB0A97dE29b62d6d12364aF77815C89 "getEndTime(address, uint256)" 0xFB6a372F2F51a002b390D18693075157A459641F 0 --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY)
