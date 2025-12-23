import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { sendDailyBuyAlert } from '@/lib/email';


export async function POST(request: Request) {
  // Security check
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        notificationSettings: {
          dailyBuyAlerts: true
        }
      },
      select: { 
        id: true, 
        email: true, 
        name: true 
      }
    });

    let sent = 0;
    for (const user of users) {
      await sendDailyBuyAlert(user);
      sent++;
      if (sent < users.length) await new Promise(resolve => setTimeout(resolve, 2000));
    }

    return NextResponse.json({ success: true, sent });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}