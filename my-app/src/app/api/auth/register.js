import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, username, password } = req.body;
    console.log('Received data:', req.body);

    try {
      const user = await prisma.user.create({
        data: {
          email,
          username,
          password,
        },
      });
      console.log('User created:', user);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
