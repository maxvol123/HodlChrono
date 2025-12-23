// app/api/crypto/load-btc-history/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

// Функция для загрузки всей истории (пачками)
async function loadFullBtcHistory() {
  let allData: any[] = [];
  let endTime = Date.now();
  
  console.log('Starting full BTC history download...');
  
  // Загружаем пачками по 1000 дней
  for (let i = 0; i < 6; i++) {
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=1000&endTime=${endTime}`
    );

    if (!response.ok) {
      throw new Error(`Binance API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Batch ${i + 1}: ${data.length} days`);
    
    if (data.length === 0) break;
    
    allData = [...allData, ...data];
    endTime = data[0][0] - 1; // Переходим к предыдущему периоду
    
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  console.log(`Total downloaded: ${allData.length} days`);
  return allData.reverse();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fullHistory = searchParams.get('full') === 'true';
    
    let binanceData;
    
    if (fullHistory) {
      binanceData = await loadFullBtcHistory();
    } else {
      // Только последние 100 дней
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=100`
      );
      binanceData = await response.json();
    }

    console.log('Processing data...');
    
    const btcHistory = binanceData.map((item: any[]) => {
      const [openTime, open, high, low, close, volume] = item;
      return {
        symbol: 'BTC',
        date: new Date(openTime),
        open: parseFloat(open),
        high: parseFloat(high),
        low: parseFloat(low),
        close: parseFloat(close),
        volume: parseFloat(volume)
      };
    });

    console.log('Saving to database...');
    
    const result = await prisma.cryptoHistory.createMany({
      data: btcHistory,
      skipDuplicates: true
    });

    return NextResponse.json({ 
      success: true, 
      message: `Loaded ${btcHistory.length} days of BTC history`,
      saved: result.count,
      fullHistory: fullHistory
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}