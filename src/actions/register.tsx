"use server"

import { IformData } from "@/types/form-data";
import { saltAndHashPassword } from "@/utils/password";
import prisma from "@/utils/prisma";


export async function registerUser(formData:IformData) {
    const {name, email, password, confirmPassword} = formData
    try {
const existingUser = await prisma.user.findFirst({
  where: {
    OR: [
      { email },
      { name }
    ]
  }
});
      if (existingUser) {
        return {error: "User with this email already created"}
      }
      const pwHash = await saltAndHashPassword(password)
      if (password !== confirmPassword) {
        return {error: "Passwords must be equal"}
      }
        const user = await prisma.user.create({
            data:{
              name: name,
              email: email,
              password: pwHash
            }
          })
    } catch (error) {
        // console.log(error);
        return{error: "something went wrong"}
    }
    
}