import { connect } from "@/dbconnect/dbconnect";
import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, password } = reqBody;

    const existantUser = await User.findOne({ name: name });
    if (existantUser) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 500 }
      );
    } else {
      const newUser = new User({
        name,
        password,
      });

      const savedUser = await newUser.save();

      return NextResponse.json({
        success: true,
        user: savedUser,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
