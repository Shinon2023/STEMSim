import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from 'crypto';

const prisma = new PrismaClient();

function generatePassword(length = 12) {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
}

export default NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Credentials Provider สำหรับ Email และ Password
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ตรวจสอบผู้ใช้ในฐานข้อมูล
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // ตรวจสอบรหัสผ่าน
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Password is incorrect");
        }

        // ถ้าข้อมูลถูกต้อง ให้ส่งคืนข้อมูลผู้ใช้
        return {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    // ตรวจสอบผู้ใช้เมื่อทำการล็อกอินผ่าน Google หรือ Credential
    async signIn({ user, account, profile }) {
      const password = generatePassword();
      const hashedPassword = await bcrypt.hash(password, 10);
      if (account.provider === "google") {
        const userFromDb = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!userFromDb) {
          // ถ้าไม่เจอผู้ใช้ในฐานข้อมูล ให้สร้างผู้ใช้ใหม่
          await prisma.user.create({
            data: {
              email: user.email,
              username: user.name || "Unnamed",
              password: hashedPassword,
            },
          });
        }
      }

      // อนุญาตให้ล็อกอิน
      return true;
    },
    async session({ session, token }) {
      // เพิ่มข้อมูลของผู้ใช้ใน session
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
