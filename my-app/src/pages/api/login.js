import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // ตรวจสอบผู้ใช้ว่ามีอยู่หรือไม่
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // ตรวจสอบรหัสผ่าน
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }else {
        console.log("Login success")
      }

      // ส่งข้อมูลกลับไปหากการล็อกอินสำเร็จ
      return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Login Error:', error);  // แสดงข้อผิดพลาดใน console
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
