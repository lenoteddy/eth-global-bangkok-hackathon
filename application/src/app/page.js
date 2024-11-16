"use client"; // Mark this file as a Client Component

import { useState, useEffect } from "react";
import Image from "next/image";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";
import { useLogin } from "@privy-io/react-auth";
import axios from "axios";

export default function Home() {
	// Set target date for Bangkok time (2024-11-17 23:59:59)
	const targetDateInBangkok = new Date(Date.UTC(2024, 10, 17, 16, 59, 59)).getTime() + 7 * 60 * 60 * 1000;
	const [timeLeft, setTimeLeft] = useState(null);
	const [walletStatus, setWalletStatus] = useState(null);
	const [walletAddress, setWalletAddress] = useState(null);
	// smart contract data
	const [participantNumber, setParticipantNumber] = useState(null);
	const [participants, setParticipants] = useState([]);
	// button function
	const connectARX = async () => {
		try {
			// --- request NFC command execution ---
			const command = {
				name: "sign",
				keyNo: 1,
				message: "",
			};
			const res = await execHaloCmdWeb(command, {
				statusCallback: (cause) => {
					if (cause === "init") {
						setWalletStatus("Please tap the tag to the back of your smartphone and hold it...");
					} else if (cause === "retry") {
						setWalletStatus("Something went wrong, please try to tap the tag again...");
					} else if (cause === "scanned") {
						setWalletStatus("Tag scanned successfully, post-processing the result...");
					} else {
						setWalletStatus(cause);
					}
				},
			});
			// the command has succeeded, display the result to the user
			setWalletAddress(res.etherAddress);
			setWalletStatus("");
			console.log(res);
		} catch (e) {
			// the command has failed, display error to the user
			setWalletStatus("Error: " + String(e));
			setWalletStatus("Scanning failed, click on the button again to retry. Details: " + String(e));
			console.log(e);
		}
	};
	const { login } = useLogin({
		onComplete: async (user) => {
			setWalletAddress(user.wallet.address);
		},
		onError: (error) => {
			setWalletStatus(error);
		},
	});

	useEffect(() => {
		const interval = setInterval(() => {
			const currentTime = new Date().getTime();
			const remainingTime = targetDateInBangkok - currentTime;
			if (remainingTime <= 0) {
				setTimeLeft("Time's up!");
				clearInterval(interval); // Stop the countdown when it's done
			} else {
				const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
				const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
				setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
			}
		}, 1000);
		return () => clearInterval(interval); // Cleanup the interval on component unmount
	}, [targetDateInBangkok]);

	useEffect(() => {
		const interval = setInterval(() => {
			const currentTime = new Date().getTime();
			const remainingTime = targetDateInBangkok - currentTime;
			if (remainingTime <= 0) {
				setTimeLeft("Time's up!");
				clearInterval(interval); // Stop the countdown when it's done
			} else {
				const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
				const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
				setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
			}
		}, 1000);
		return () => clearInterval(interval); // Cleanup the interval on component unmount
	}, [targetDateInBangkok]);

	useEffect(() => {
		(async () => {
			try {
				// get number of participants
				const res = await axios.get("/api/participants");
				setParticipantNumber(res.data.data);
				// get wallet address of participants
				setParticipants([]);
				for (let i = 0; i < res.data.data; i++) {
					const res = await axios.get("/api/participants?tokenId=" + i);
					setParticipants((prevItems) => [...prevItems, res.data.data]);
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	return (
		<div className="grid grid-rows-[20px_1fr_20px]   min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2  sm:items-start">
				<h1 className="text-5xl font-bold tracking-tighter">Win a spot on our hackathon team</h1>
				<Image src="/logo_win.svg" alt="Win logo" width={373} height={222} priority />
				{!walletAddress && (
					<div>
						<p className="mb-1">Enter the raffle by scanning the NFC chip.</p>
						<button
							className="text-bold w-full rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
							onClick={connectARX}
						>
							Scan
						</button>
						<div className="mt-2">
							Or{" "}
							<a className="text-bold text-sm sm:text-base underline cursor-pointer" onClick={() => login({ loginMethods: ["email", "wallet"] })}>
								use other method
							</a>
						</div>
					</div>
				)}
				{walletStatus && <div className="font-bold italic">{walletStatus}</div>}
				{!walletStatus && (
					<div className="italic">
						{walletAddress && (
							<div>
								<div className="pb-2">
									<p className="text-left font-bold ">Successfully entered the raffle:</p>
								</div>
								<div className="bg-lightgreen py-2 px-3 rounded-lg mb-2  w-72 border-2 border-green">
									<p className="truncate overflow-hidden whitespace-nowrap">{walletAddress}</p>
								</div>
							</div>
						)}
					</div>
				)}
				{/* show this when we have a  WINNER */}
				<h1 className="text-5xl font-bold tracking-tighter">We have a WINNER</h1>
				<div className="bg-green py-2 px-3 rounded-lg mb-2  w-72 ">
					<b className="text-xs ">WINNER WINNER WINNER </b>
					<p className="truncate overflow-hidden whitespace-nowrap ">0xa36337cf4848f8145E0Fa7214DD51B5D5652EAad</p>
				</div>
				<div>
					<p>Time left to enter the raffle:</p>
					<div id="countdown" className="text-4xl font-bold ">
						{timeLeft ? timeLeft : "Loading..."}
					</div>
				</div>
				<p>
					By scanning your NFC tag, you automatically enter our raffle for a chance to win a share of the prize money. If our team wins a prize in this hackathon, the prize will be divided
					among six participants, rather than the usual five. This means that, if selected, you could win 1/6 of the total prize pool.
				</p>
				{participantNumber > 0 && (
					<div>
						<div className="pb-2">
							<p className="text-left font-bold ">{participantNumber} participants in the raffle:</p>
						</div>
						{participants.map((val, key) => {
							return (
								<div className="bg-lightgreen py-2 px-3 rounded-lg mb-2 w-72" key={key}>
									<p className="truncate overflow-hidden whitespace-nowrap">{val}</p>
								</div>
							);
						})}
					</div>
				)}
				<div>
					<div className="pb-2">
						<p className="text-left font-bold ">Terms and Conditions:</p>
					</div>
					<ol className="list-inside list-decimal text-sm ">
						<li className="mb-2">
							<b>Prize Division:</b> Only participants who scan their NFT tag will be eligible for the raffle.
						</li>
						<li className="mb-2">
							<b>Eligibility:</b> In the event of a win, the prize will be divided equally among six participants.
						</li>
						<li className="mb-2">
							<b>Raffle Selection</b> Winners will be randomly selected from all eligible entries.
						</li>
						<li className="mb-2">
							<b>Prize Distribution</b> If selected, the prize will be distributed to the winner&lsquo;s designated account or wallet.
						</li>
						<li className="mb-2">
							<b>No Guarantee</b> Participation in the raffle does not guarantee a prize.
						</li>
						<li className="mb-2">
							<b>Event Dates</b> The raffle and prize division are valid only for the duration of the hackathon.
						</li>
						<li className="mb-2">
							<b>Changes to Terms</b> We reserve the right to modify these terms at any time during the event.
						</li>
					</ol>
				</div>
			</main>
		</div>
	);
}
