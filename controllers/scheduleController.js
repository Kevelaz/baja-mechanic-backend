import { Schedule } from "../models/schedule.js";

function submitForm(req,res){
  const { name, email, phone_number, customer_problem, appointment } = req.body


    console.log(req.body)


  const newSchedule = new Schedule({
      name,
      email,
      phone_number,
      customer_problem,
      appointment,
    })
  newSchedule.save()
    .then(() => {
      res.status(200).json({message: 'Schedule created successfully'})
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json({error: 'Internal Server Error'})
    })
}

export { submitForm }