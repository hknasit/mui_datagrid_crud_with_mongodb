import { connect } from "@/dbconnect/dbconnect";
import { User } from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import Jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, password } = reqBody;

    const existingUser = await User.findOne({ name: name });

    if (existingUser) {
      if (password == existingUser.password) {
        const cookieData = {
          name,
          password,
        };

        const cookie = Jwt.sign(cookieData, process.env.COOKIE_PASSWORD!, {
          expiresIn: "1h",
        });

        const response = NextResponse.json({
          success: true,
          message: "User login succussfull",
        });

        response.cookies.set("token", cookie);
        return response;
      } else {
        return NextResponse.json({
          success: false,
          message: "User password is incorrect",
        });
      }
    } else {
      return NextResponse.json({ success: false, message: "User not found" });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
