"use server"

import prisma from "@/utils/prisma";

export async function updateNotificationSettings(email: string, settings: any) {
    try {
        const { interval, importingUpdates } = settings;

        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            return { error: "User not found" }
        }

        const alertSettings = {
            dailyBuyAlerts: interval === "daily",
            weeklyBuyAlerts: interval === "weekly", 
            monthlyBuyAlerts: interval === "monthly",
            updatesAlerts: importingUpdates
        };

        const updatedSettings = await prisma.notificationSettings.upsert({
            where: { userId: user.id },
            update: alertSettings,
            create: {
                userId: user.id,
                ...alertSettings
            }
        });

        return { success: true, settings: updatedSettings }
    } catch (error) {
        return { error: "Failed to update notification settings" }
    }
}