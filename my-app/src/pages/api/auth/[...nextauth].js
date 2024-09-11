import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // ตรวจสอบว่าผู้ใช้มี email ในฐานข้อมูลหรือไม่
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      // ถ้าไม่มีผู้ใช้ในฐานข้อมูล ให้สร้างผู้ใช้ใหม่
      if (!existingUser) {
        const generatedUsername = user.name?.replace(/\s+/g, "").toLowerCase();  // สร้าง username จากชื่อ

        await prisma.user.create({
          data: {
            email: user.email,
            username: generatedUsername || "defaultUsername", // ใช้ชื่อที่สร้างหรือค่าเริ่มต้นถ้าไม่มี
            password: "", // คุณอาจใช้ค่า "" หรือ hash password จาก provider
          },
        });
      }

      // คืนค่าผลลัพธ์ว่า sign-in สำเร็จ
      return true;
    },
    async session({ session, token }) {
      // เพิ่มข้อมูลที่ต้องการลงใน session
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      // เพิ่ม user.id ลงใน token (ถ้ามี)
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
