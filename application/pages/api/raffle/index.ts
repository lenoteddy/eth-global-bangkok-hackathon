import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import abi from "../abis/raffle.json";

// Load your contract ABI and address
const RAFFLE_CONTRACT_ABI = abi;
const RAFFLE_CONTRACT_ADDRESS = process.env.RAFFLE_CONTRACT_ADDRESS || "";
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
	const { method, raffle_owner, raffle_id } = req.query;
	const provider = new ethers.JsonRpcProvider(RPC_URL);
	const contract = new ethers.Contract(RAFFLE_CONTRACT_ADDRESS, RAFFLE_CONTRACT_ABI, provider);
	if (method === "winner") {
		try {
			const result = await contract.getWinner(raffle_owner, raffle_id);
			res.status(200).json({ data: result });
		} catch (error: any) {
			res.status(200).json({ data: null, message: error });
		}
	} else if (method === "deadline") {
		const result = String(await contract.getEndTime(raffle_owner, raffle_id));
		res.status(200).json({ data: result });
	}
};
