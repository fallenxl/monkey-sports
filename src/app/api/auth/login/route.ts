import { loginUser } from "@/services/auth.services";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const { email, password } =
      await request.json();
      console.log("Received registration data:", {
        email,
        password,
        });
    if (!email || !password) {
      return NextResponse.json( 
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    const user = await loginUser({
      email,
      password,
    });
    if (!user) {
        return NextResponse.json(
            { error: "Invalid email or password" },
            { status: 401 }
        );
    }
    
    return NextResponse.json({ message: "User logged in successfully", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Ha ocurrido un error al iniciar sesión" },
      { status: 500 }
    );
  }
}