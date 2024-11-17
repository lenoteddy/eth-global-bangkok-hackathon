include .env

install:
	@forge install OpenZeppelin/openzeppelin-contracts --no-commit && forge install smartcontractkit/chainlink-brownie-contracts --no-commit

slither :; slither . --config-file slither.config.json

deploy-userEmitEvent:
	@forge script script/DeployUserEmitEvent.s.sol:DeployUserEmitEvent --rpc-url $(POLYGON_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://polygon.blockscout.com/api/? --legacy -vvvv --via-ir

deploy-raffle:
	@forge script script/DeployRaffle.s.sol:DeployRaffle --rpc-url $(POLYGON_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://polygon.blockscout.com/api/? --legacy -vvvv --via-ir

deploy-linkedNft:
	@forge script script/DeployLinkedNft.s.sol:DeployLinkedNft --rpc-url $(POLYGON_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://polygon.blockscout.com/api/? --legacy -vvvv --via-ir

deploy-chainlinkMinter:
	@forge script script/DeployChainlinkMinter.s.sol:DeployChainlinkMinter --rpc-url $(POLYGON_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://polygon.blockscout.com/api/? --legacy -vvvv --via-ir

deploy-randomNumberGenerator:
	@forge script script/DeployRandomNumberGenerator.s.sol:DeployRandomNumberGenerator --rpc-url $(POLYGON_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --verifier blockscout --verifier-url https://polygon.blockscout.com/api/? --legacy -vvvv --via-ir

createRaffle:
	@cast send 0x9Ec3444f435D78b7e1a8AECC34D9CE4d9f0DedE2 "createRaffle(string,string,address,uint256,string,string,address)" "Win Win" "WW" 0xFB6a372F2F51a002b390D18693075157A459641F 36000 "win a share of hackathon prize" "https://eth-global-bangkok-hackathon.vercel.app/logo_win.svg" 0xDe58AaD7b3e4aEBF8Ac42515543ae72BDC09d5fD --value 20000000000000000 --rpc-url $(POLYGON_RPC_URL) --private-key $(PRIVATE_KEY) 

updateRaffleStatus:
	@cast send 0x9Ec3444f435D78b7e1a8AECC34D9CE4d9f0DedE2 "updateRaffleStatus(uint256,bool)" 0 true --rpc-url $(POLYGON_RPC_URL) --private-key $(PRIVATE_KEY)

emitUserEvent:
	@cast send 0x1D9aaBf758452B3F6e7b2184eBE252732a6b4499 "interactWithCampaign(address, address,uint256)" 0xFB6a372F2F51a002b390D18693075157A459641F 0x9Ec3444f435D78b7e1a8AECC34D9CE4d9f0DedE2 0 --rpc-url $(POLYGON_RPC_URL) --private-key $(PRIVATE_KEY)

getWinner:
	@cast call 0x9Ec3444f435D78b7e1a8AECC34D9CE4d9f0DedE2 "getWinner(address,uint256)" 0xFB6a372F2F51a002b390D18693075157A459641F 0 --rpc-url $(POLYGON_RPC_URL) --private-key $(PRIVATE_KEY)

getEndTime:
	@cast call 0x9Ec3444f435D78b7e1a8AECC34D9CE4d9f0DedE2 "getEndTime(address, uint256)" 0xFB6a372F2F51a002b390D18693075157A459641F 0 --rpc-url $(POLYGON_RPC_URL) --private-key $(PRIVATE_KEY)
