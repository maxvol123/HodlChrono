// actions/admin-actions.ts
"use server"

import prisma from "@/utils/prisma"

export async function addReview(date:string, title:string, imageurl:string, prediction:string, author:string) {
    try {
        await prisma.cryptoReviews.create({
            data:{
                title: title,
                date: date,
                imageurl: imageurl,
                prediction: prediction,
                author: author 
            }
        })
    } catch (error) {
        console.log("error while creating review");
        
    }
}