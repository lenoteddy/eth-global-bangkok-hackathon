"use client"; // Mark this file as a Client Component

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
	// Set target date for Bangkok time (2024-11-17 23:59:59)
	const targetDateInBangkok = new Date(Date.UTC(2024, 10, 17, 16, 59, 59)).getTime() + (7 * 60 * 60 * 1000);

	const [timeLeft, setTimeLeft] = useState(null);

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

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<h1 className="text-5xl">
					<b>Win a spot on our hackathon team</b>
				</h1>
				<Image
					src="/logo_win.svg"
					alt="Win logo"
					width={373}
					height={222}
					priority
				/>
				<p>Enter the raffle by scanning the NFC chip.</p>
				<button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
					Scan
				</button>
				<p>Time left to enter the raffle:</p>
				<div id="countdown" className="text-xl font-bold ">
					{/* Conditionally render timeLeft once it's calculated */}
					{timeLeft ? timeLeft : "Loading..."}
				</div>
				<p>By scanning your NFC tag, you automatically enter our raffle for a chance to win a share of the prize money. If our team wins a prize in this hackathon, the prize will be divided among six participants, rather than the usual five. This means that, if selected, you could win 1/6 of the total prize pool.</p>
				<p className="text-left">Terms and Conditions:</p>
					<ol className="list-inside list-decimal text-sm ">
						<li className="mb-2">
							<b>Prize Division:</b> Only participants who scan their NFT tag will be eligible for the raffle.
						</li>
						<li className="mb-2">
							<b>Eligibility:</b>  In the event of a win, the prize will be divided equally among six participants.
						</li>
					<li className="mb-2"><b>Raffle Selection</b> Winners will be randomly selected from all eligible entries.</li>
					<li className="mb-2"><b>Prize Distribution</b> If selected, the prize will be distributed to the winner&lsquo;s designated account or wallet.</li>
					<li className="mb-2"><b>No Guarantee</b> Participation in the raffle does not guarantee a prize.</li>
					<li className="mb-2"><b>Event Dates</b> The raffle and prize division are valid only for the duration of the hackathon.</li>
					<li className="mb-2"><b>Changes to Terms</b> We reserve the right to modify these terms at any time during the event.</li>
				</ol>
			</main>
		</div>
	);
}
