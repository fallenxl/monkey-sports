import { registerUser } from "@/services/auth.services";
import { checkUsernameExists } from "@/services/user.services";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const { email, password, username, confirmPassword } =
      await request.json();
      console.log("Received registration data:", {
        email,
        password,
        username,
        confirmPassword,
        });
    if (!email || !password || !username || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }
    // Check if the username already exists
    const usernameExists = await checkUsernameExists(username);
    if (usernameExists) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }
    const user = await registerUser({
      email,
        password,
        username,
    });
    return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "El registro ha fallado, puede que el usuario ya exista" },
      { status: 500 }
    );
  }
}