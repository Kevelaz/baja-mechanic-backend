import { Schedule } from "../models/schedule.js";
import nodemailer from 'nodemailer'

const { BUSINESS_EMAIL, PASSWORD, PERSONAL_EMAIL } = process.env

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: BUSINESS_EMAIL,
    pass: PASSWORD,
  }
})

function submitForm(req,res){
  const { name, email, phone_number, customer_problem, appointment } = req.body

  const newSchedule = new Schedule({
      name,
      email,
      phone_number,
      customer_problem,
      appointment,
    })
// userMailOptions is the message that is sent to the email that the customer entered, it is the confirmation email //
  newSchedule.save()
    .then(() => {
      const userMailOptions = {
        from: BUSINESS_EMAIL,
        to: email,
        subject: 'Appointment for BMM',
        text: `Dear ${name}, \n\ Thank you for choosing BMM, a mechanic will contact you shortly to confirm your appointment.`,
      }
      transporter.sendMail(userMailOptions, (error, info) => {
        if(error) {
          console.log(error)
        } else {
          console.log('Email sent to the user:' + info.response)
        }
      })
// clientMailOptions is the function that handles the email sent to the business email, it relays the customer info, problem, and appointment date //
      const clientMailOptions = {
        from: BUSINESS_EMAIL,
        to: PERSONAL_EMAIL, 
        subject: 'New Appointment Created',
        text: `A new appointment has been scheduled by ${name} for ${appointment},their issue is related to ${customer_problem}.Please call them at ${phone_number}.`
      }
      transporter.sendMail(clientMailOptions, (error, info) => {
        if(error) {
          console.log(error)
        } else {
          console.log("Email sent to client:" + info.response)
        }
      })
      res.status(200).json({message:'Schedule created successfully'})
    })
    .catch((error) => {
      console.error(error)
      res.status(500).json({error: 'Internal Server Error'})
    })
}

export { submitForm }