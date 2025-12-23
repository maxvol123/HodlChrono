import { NextResponse } from 'next/server';
import { sendMonthlyBuyAlert } from '@/lib/email';
import prisma from '@/utils/prisma';

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        notificationSettings: {
          monthlyBuyAlerts: true
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
      await sendMonthlyBuyAlert(user);
      sent++;
      if (sent < users.length) await new Promise(resolve => setTimeout(resolve, 2000));
    }

    return NextResponse.json({ success: true, sent });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}