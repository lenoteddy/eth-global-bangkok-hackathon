import localFont from "next/font/local";
import Providers from "../components/providers";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});
export const metadata = {
	title: "Win-Win",
	description:
		"Win a share of whatever the team wins in the hackathon! By scanning your NFT tag, you automatically enter a raffle. If the team wins a prize, it will be divided among six participants, with each having a chance to win 1/6 of the total prize money.",
};
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
