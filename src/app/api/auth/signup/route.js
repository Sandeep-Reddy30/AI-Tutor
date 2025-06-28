import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, studentId } = body;

    if (!name || !email || !password || !studentId) {
      return Response.json({
        success: false,
        message: "All fields are required"
      }, { status: 400 });
    }

    // Check if user already exists
    const existingUsers = await query(
      'SELECT * FROM users WHERE email = ? OR student_id = ?',
      [email, studentId]
    );

    if (existingUsers.length > 0) {
      const existingUser = existingUsers[0];
      if (existingUser.email === email) {
        return Response.json({
          success: false,
          message: "Email already registered. Please login instead."
        }, { status: 409 });
      } else {
        return Response.json({
          success: false,
          message: "Student ID already registered."
        }, { status: 409 });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await query(
      'INSERT INTO users (name, email, password, student_id, department, year) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, studentId, 'Computer Science', '1st Year']
    );

    // Get the created user
    const newUsers = await query(
      'SELECT id, name, email, student_id, department, year, created_at FROM users WHERE id = ?',
      [result.insertId]
    );

    const newUser = newUsers[0];

    return Response.json({
      success: true,
      user: newUser,
      message: "Registration successful"
    });

  } catch (error) {
    console.error('Signup error:', error);
    return Response.json({
      success: false,
      message: "Server error. Please try again."
    }, { status: 500 });
  }
} 