import type { NextApiRequest, NextApiResponse } from "next";
import { ethers, Log } from "ethers";
import linked_nft_abi from "../abis/linkednft.json";

// Load your contract ABI and address
const LINKED_NFT_ABI = linked_nft_abi;
const LINKED_NFT_CONTRACT_ADDRESS =
  process.env.LINKED_NFT_CONTRACT_ADDRESS || "";


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
  const { wallet_address } = req.query;
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  const contract = new ethers.Contract(
    LINKED_NFT_CONTRACT_ADDRESS,
    LINKED_NFT_ABI.abi,
    provider
  );

  // Call the s_userMintedOrNot function to check if the user has minted
  const hasMinted = await contract.s_userMintedOrNot(wallet_address);
  
  res.status(200).json({ message: "Hello from Next.js!" });
  // if (!wallet_address) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "User address is required" });
  // }

  // Connect to the blockchain
  //   const provider = new ethers.JsonRpcProvider(RPC_URL);

  //   // Initialize the contract
  //   const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

  //   // Call the `s_userMintedOrNot` mapping
  //   const hasMinted = await contract.s_userMintedOrNot(userAddress);

  //   return res.status(200).json({ success: true, hasMinted });
};
