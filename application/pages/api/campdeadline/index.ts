import type { NextApiRequest, NextApiResponse } from "next";
import { ethers, Log } from "ethers";
import linked_nft_abi from "../abis/campdeadline.json";

// Load your contract ABI and address
const CAMP_DEADLINE_ABI = linked_nft_abi;

const RAFFLE_CONTRACT_ADDRESS = process.env.RAFFLE_CONTRACT_ADDRESS || "";

const RPC_URL = process.env.POLY_AMOY_RPC_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  const { creator_wallet_address } = req.query;
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  const contract = new ethers.Contract(
    RAFFLE_CONTRACT_ADDRESS,
    CAMP_DEADLINE_ABI.abi,
    provider
  );

  console.log("a");
  // console.log(creator_wallet_address);
  const raffleInfo = await contract.s_creatorsToRaffles(
    "0x76967Ce1457D65703445FbE024Dd487A151ad993",
    0
  );
  const timeInterval = raffleInfo.timeInterval;
  res
    .status(200)
    .json({ data: timeInterval.toString(), message: "Time Interval" });
};
