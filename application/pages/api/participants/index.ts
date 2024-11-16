import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import linked_nft_abi from "../abis/linkednft.json";

// Load your contract ABI and address
const LINKED_NFT_ABI = linked_nft_abi;
const LINKED_NFT_CONTRACT_ADDRESS = process.env.LINKED_NFT_CONTRACT_ADDRESS || "";
const RPC_URL = process.env.POLY_AMOY_RPC_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	try {
		switch (method) {
			case "GET":
				await handleGET(req, res);
				break;
		}
	} catch (error: any) {
		res.status(400).json({
			error: {
				message: error.message,
			},
		});
	}
}

// Get current user
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
	const { tokenId, address } = req.query;
	const provider = new ethers.JsonRpcProvider(RPC_URL);
	const contract = new ethers.Contract(LINKED_NFT_CONTRACT_ADDRESS, LINKED_NFT_ABI.abi, provider);
	let result: null | number | string = null;
	if (tokenId) {
		result = await contract.ownerOf(tokenId);
	} else if (address) {
		result = Number(await contract.balanceOf(address));
	} else {
		result = Number(await contract.getCounter());
	}
	res.status(200).json({ data: result });
};
