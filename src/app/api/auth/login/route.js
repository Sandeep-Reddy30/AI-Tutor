import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json({
        success: false,
        message: "Email and password are required"
      }, { status: 400 });
    }

    // Check if user exists
    const users = await query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return Response.json({
        success: false,
        message: "User not found. Please sign up first."
      }, { status: 404 });
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return Response.json({
        success: false,
        message: "Invalid password"
      }, { status: 401 });
    }

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    return Response.json({
      success: true,
      user: userWithoutPassword,
      message: "Login successful"
    });

  } catch (error) {
    console.error('Login error:', error);
    return Response.json({
      success: false,
      message: "Server error. Please try again."
    }, { status: 500 });
  }
} 