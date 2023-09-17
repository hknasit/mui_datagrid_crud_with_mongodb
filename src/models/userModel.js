import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the user is need"],
  },
  password: {
    type: String,
    required: [true, "Passward for the user signup is nessary"],
  },
});

export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
