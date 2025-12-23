// app/api/cron/update-crypto/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function GET() {
  try {
    console.log('Starting daily crypto update...');
    
    const symbols = ['BTC']; // Добавь другие монеты если нужно
    
    for (const symbol of symbols) {
      // Получаем последнюю дату в базе
      const lastRecord = await prisma.cryptoHistory.findFirst({
        where: { symbol },
        orderBy: { date: 'desc' }
      });

      const lastDate = lastRecord ? lastRecord.date : new Date('2017-08-17');
      const startTime = lastDate.getTime() + (24 * 60 * 60 * 1000); // +1 день
      const endTime = Date.now();

      if (startTime >= endTime) {
        console.log(`No new data for ${symbol}`);
        continue;
      }

      // Качаем новые данные с Binance
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=1d&startTime=${startTime}&endTime=${endTime}`
      );

      const data = await response.json();
      
      const newData = data.map((item: any[]) => ({
        symbol,
        date: new Date(item[0]),
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
        volume: parseFloat(item[5])
      }));

      await prisma.cryptoHistory.createMany({
        data: newData,
        skipDuplicates: true
      });

      console.log(`Added ${newData.length} days for ${symbol}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}