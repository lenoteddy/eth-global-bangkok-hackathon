// components/providers.tsx
"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function Providers({ children }) {
	return (
		<PrivyProvider
			appId="cm3k8jtxh006r3x2qbmtt2gy3"
			config={{
				loginMethods: ["email", "wallet"],
			}}
		>
			{children}
		</PrivyProvider>
	);
}
