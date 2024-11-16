import type { NextApiRequest, NextApiResponse } from "next";
import { ethers, Log } from "ethers";
import send_wallet_abi from "../abis/sendwallettosc.json";

// Load your contract ABI and address
const SEND_WALLET_CONTRACT_ABI = send_wallet_abi;
const RAFFLE_CONTRACT_ADDRESS = process.env.RAFFLE_CONTRACT_ADDRESS || "";
const USER_EVENT_CONTRACT_ADDRESS = process.env.USER_EVENT_CONTRACT_ADDRESS || "";
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
	try {
		const { user_wallet_address, raffle_nft_token_id } = req.query;
		const provider = new ethers.JsonRpcProvider(RPC_URL);
		const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
		const contract = new ethers.Contract(USER_EVENT_CONTRACT_ADDRESS, SEND_WALLET_CONTRACT_ABI.abi, wallet);
		await contract.interactWithCampaign(user_wallet_address, RAFFLE_CONTRACT_ADDRESS, raffle_nft_token_id);
		res.status(200).json({ data: "success", message: "Send wallet to SC" });
	} catch (error: any) {
		res.status(400).json({
			error: {
				message: error.message,
			},
		});
	}
};
