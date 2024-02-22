import mongoose from "mongoose";

const Schema = mongoose.Schema;

const scheduleSchema = new Schema ({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  // i might add a max length to this key and value field after the frontend is complete
  phone_number:{
    type: String,
    required: true,
  },
  customer_problem:{
    type: String,
    required: true,
  },
  appointment:{
    type: Date,
    required: true,
  }
})

const Schedule = mongoose.model('Schedule', scheduleSchema)

export { Schedule }