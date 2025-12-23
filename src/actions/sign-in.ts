"use server"

import { signIn } from "@/auth/auth";

export async function signInWithCred(email:string, password: string) {
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false
        })
    } catch (error) {
        console.error("error auth ", error)
        throw error
    }
}