import mongoose from "mongoose";

const studentModel = mongoose.Schema({
  name: {
    type: String,
  },
});



export const Student = mongoose.models.students || mongoose.model('students', studentModel)
