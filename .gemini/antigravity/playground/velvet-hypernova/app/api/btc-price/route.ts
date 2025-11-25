// API route for fetching Bitcoin price data
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true',
            { next: { revalidate: 60 } } // Cache for 60 seconds
        );

        if (!response.ok) {
            throw new Error('Failed to fetch Bitcoin price');
        }

        const data = await response.json();
        const btcData = data.bitcoin;

        return NextResponse.json({
            price: btcData.usd,
            change24h: btcData.usd_24h_change,
            marketCap: btcData.usd_market_cap,
            volume24h: btcData.usd_24h_vol,
        });
    } catch (error) {
        console.error('Bitcoin price fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Bitcoin price' },
            { status: 500 }
        );
    }
}
