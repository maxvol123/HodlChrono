// actions/crypto-data.ts
"use server"

import prisma from "@/utils/prisma";

export async function getCryptoHistory(params: {
  symbol?: string;
  startDate: Date;
  endDate: Date;
}) {
  const { symbol = 'BTC', startDate, endDate } = params;

  console.log('🔍 getCryptoHistory called with:', {
    symbol,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString()
  });

  try {
    const data = await prisma.cryptoHistory.findMany({
      where: {
        symbol,
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: { date: 'asc' },
      select: {
        date: true,
        open: true,
        high: true,
        low: true,
        close: true,
        volume: true
      }
    });

    console.log('📊 Found records:', data.length);
    
    if (data.length === 0) {
      console.log('❌ No data found in database for this period');
    }

    return { 
      success: true, 
      data: data 
    };
  } catch (error) {
    console.error('❌ Database error:', error);
    return { 
      success: false, 
      error: 'Failed to fetch data from database' 
    };
  }
}