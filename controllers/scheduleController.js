import { error, info } from "console";
import { Schedule } from "../models/schedule.js";
import nodemailer from 'nodemailer'

const { CLIENT_EMAIL, PASSWORD } = process.env

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: CLIENT_EMAIL,
    pass: PASSWORD,
  }
})
// console.log(transporter)

function submitForm(req,res){
  const { name, email, phone_number, customer_problem, appointment } = req.body

  const newSchedule = new Schedule({
      name,
      email,
      phone_number,
      customer_problem,
      appointment,
    })

  newSchedule.save()
    .then(() => {
      const userMailOptions = {
        from: CLIENT_EMAIL,
        to: email,
        subject: 'Appointment for BMM',
        text: `Dear ${name}, \n\ thank you for choosing BMM, a mechanic will contact you shortly to confirm your appointment.`,
      }
      transporter.sendMail(userMailOptions, (error, info) => {
        if(error) {
          console.log(error)
        } else {
          console.log('Email sent to the user:' + info.response)
        }
      })
      const clientMailOptions = {
        from: CLIENT_EMAIL,
        // to: 'kevsgrouch@gmail.com',
        subject: 'New Appointment Created',
        text: `A new appointment has been scheduled by ${name} for ${appointment}, their issue is related to ${customer_problem}.Please call them at ${phone_number}.`
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