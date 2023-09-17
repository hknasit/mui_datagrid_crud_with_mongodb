import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Name of the todo is required"],
  },
  discription: {
    type: String,
  },
  compleded: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: Date,
    // required: [true, "Deadline of the todo is required"],
  },
});

const Todo = mongoose.models.todos || mongoose.model("todos", todoSchema);
export default Todo;
