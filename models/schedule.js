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
  phone_number:{
    type: String,
  },
  customer_problem:{
    type: String,
  },
  appointment:{
    type: Date,
  }
})

const Schedule = mongoose.model('Schedule', scheduleSchema)

export { Schedule }