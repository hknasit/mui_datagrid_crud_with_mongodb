import { connect } from "@/dbconnect/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import Todo from "@/models/todoModel";

connect()

/**
 * @name get all todos
 * @returns All the todos from server
 */
export async function GET() {
  try {
    const todos = await Todo.find({});

    return NextResponse.json({
      success: true,
      todos,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * @name post the todo
 * @returns saved todo from server
 */
export async function POST(request: NextRequest) {
  try {
    const { name, discription, compleded, deadline } = await request.json();

    const newTodo = new Todo({
      name,
      discription,
      compleded,
      deadline,
    });

    const savedTodo = await newTodo.save();

    return NextResponse.json({
      success: true,
      todo: savedTodo,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { _id, name, completed, discription, deadline } =
      await request.json();

    const newTodo = await Todo.findById(_id);

    newTodo.name = name;
    newTodo.compleded = completed;
    newTodo.discription = discription;
    newTodo.deadline = deadline;

    const savedTodo = await newTodo.save();

    return NextResponse.json({ success: true, todo: savedTodo });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
