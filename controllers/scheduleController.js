import { Schedule } from "../models/schedule";

const submitForm = async (req, res) => {
  try {
    const { name, email, phone_number, customer_problem, appointment } = req.body

    const newSchedule = new Schedule({
      name,
      email,
      phone_number,
      customer_problem,
      appointment
    })
    await newSchedule.save()
    res.status(200).json({message:'Schedule created successfully'})
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error'})
  }
}

export { submitForm }