"use client";

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Wallet, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { injected } from 'wagmi/connectors'

export default function ConnectWallet() {
    const [mounted, setMounted] = useState(false)
    const { address, isConnected } = useAccount()
    const { connect } = useConnect()
    const { disconnect } = useDisconnect()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button className="px-5 py-2.5 bg-btc-500 hover:bg-btc-600 text-black text-sm font-bold rounded-lg transition-all flex items-center gap-2 shadow-btc">
                <Wallet className="w-4 h-4" />
                <span>Connect Wallet</span>
            </button>
        )
    }

    const truncateAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }

    if (isConnected && address) {
        return (
            <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-mono text-neutral-300">{truncateAddress(address)}</span>
                </div>
                <button
                    onClick={() => disconnect()}
                    className="p-2 hover:bg-neutral-900 rounded-lg transition-colors text-neutral-400 hover:text-red-400"
                    title="Disconnect"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        )
    }

    return (
        <button
            onClick={() => connect({ connector: injected() })}
            className="px-5 py-2.5 bg-btc-500 hover:bg-btc-600 text-black text-sm font-bold rounded-lg transition-all flex items-center gap-2 shadow-btc"
        >
            <Wallet className="w-4 h-4" />
            <span>Connect Wallet</span>
        </button>
    )
}
