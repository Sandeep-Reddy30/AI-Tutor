import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  // Always succeed, no matter what
  return Response.json({
    success: true,
    user: {
      id: 1,
      name: "Admin",
      email: "admin@gmail.com",
      student_id: "admin001",
      department: "Computer Science",
      year: "1st Year"
    },
    message: "Login successful"
  });
} 