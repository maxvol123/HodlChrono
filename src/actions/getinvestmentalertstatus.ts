"use server"

import prisma from "@/utils/prisma";

export async function getInvestmentAlertStatus(email: any) {
    try {
        const user = await prisma.user.findFirst({
            where: { email },
            include: { notificationSettings: true }
        });

        const investmentAlert = user?.notificationSettings?.dailyBuyAlerts || 
                               user?.notificationSettings?.weeklyBuyAlerts || 
                               user?.notificationSettings?.monthlyBuyAlerts || 
                               false;

        return {investmentAlert};
    } catch (error) {
        return { error: "Failed to get notification status" };
    }
}