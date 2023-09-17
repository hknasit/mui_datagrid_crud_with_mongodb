import { NextResponse, NextRequest } from "next/server";
import { Student } from "@/models/sampleModle";
import { connect } from "@/dbconnect/dbconnect";

connect();

export async function GET() {
  try {
    const response = await Student.find({});
    return NextResponse.json({ success: true, response });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    const newStudent = new Student({ name });

    const savedStudent = await newStudent.save();

    return NextResponse.json({ success: true, savedStudent });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name } = await request.json();
    console.log(id, name);
    const response = await Student.findByIdAndUpdate(id, { name });

    return NextResponse.json({ success: true, response });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    console.log(id);

    const response = await Student.findByIdAndDelete(id);
    return NextResponse.json({ success: true, response });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
