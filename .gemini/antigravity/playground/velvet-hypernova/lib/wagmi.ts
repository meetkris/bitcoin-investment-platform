import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'viem/chains'
import { injected } from 'wagmi/connectors'

// Simplified config without WalletConnect to avoid build issues
// WalletConnect can be added later with proper Turbopack configuration
export const config = createConfig({
    chains: [mainnet, sepolia],
    connectors: [
        injected(), // MetaMask and other injected wallets
    ],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
})

