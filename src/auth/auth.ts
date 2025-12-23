import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/schema/zod"
// Your own logic for dealing with plaintext password strings; be careful!
import { getUserFromDb } from "@/utils/user"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/utils/prisma"
import bcryptjs from "bcryptjs"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "Password", type: "password"},
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required")
          }
 
          const { email, password } = await signInSchema.parseAsync(credentials)
  
          // logic to verify if the user exists
          const user = await getUserFromDb(email)
          console.log(user)
 
          if (!user || !user.password) {
            throw new Error("Invalid credentials.")
          }
          
          const isPasswordValid = await bcryptjs.compare(
            password,
            user.password
          )

          if (!isPasswordValid) {
            throw new Error("Wrong credentials")
          }
          return {id: user.id, email: user.email, isAdmin: user.isAdmin}
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 36000,
  },
  secret: process.env.AUTH_SECRET,
    callbacks: {
      async jwt({token, user}) {
        
        if (user) {
          token.id = user.id
          token.isAdmin = user.isAdmin
        }
        return token
      }
      
    }
})