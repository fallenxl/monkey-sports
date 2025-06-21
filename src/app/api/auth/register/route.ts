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
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}