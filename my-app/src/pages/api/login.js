import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "uigo1BMBQ5URJpn7n7tH7uuihKuobCKAT/I8Znl5hcQ";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.lockUntil && user.lockUntil > new Date()) {
        return res.status(403).json({
          message: `Account is locked. Try again after ${user.lockUntil}`,
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        const attempts = user.loginAttempts + 1;

        if (attempts >= 5) {
          const lockTime = new Date();
          lockTime.setMinutes(lockTime.getMinutes() + 15);

          await prisma.user.update({
            where: { email: user.email },
            data: {
              loginAttempts: attempts,
              lockUntil: lockTime,
            },
          });

          return res.status(403).json({
            message: 'Too many failed login attempts. Please try again later.',
          });
        } else {
          await prisma.user.update({
            where: { email: user.email },
            data: { loginAttempts: attempts },
          });

          return res.status(401).json({ message: 'Invalid password' });
        }
      }

      await prisma.user.update({
        where: { email: user.email },
        data: { loginAttempts: 0, lockUntil: null },
      });

      // สร้าง JWT และส่งกลับไปให้ฝั่ง client
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h', // Token มีอายุ 1 ชั่วโมง
      });

      return res.status(200).json({ message: 'Login successful', token }); // ส่ง token กลับไปให้ฝั่ง client
    } catch (error) {
      console.error('Login Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
