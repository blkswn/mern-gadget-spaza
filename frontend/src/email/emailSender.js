/* import { createTransport } from "nodemailer"
import dotenv from 'dotenv'

dotenv.config()
let transporter = createTransport({

    
    host: process.env.HOST,
    secure: true,
    port: process.env.PORT_MAIL,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }

})

const sendConfirmationEmail = (name, email) => {

const mailOptions = {
    from: process.env.USER,
    to: email,
    subject:"Testing",
    text:"Testing"
}

transporter.sendMail(mailOptions, function(error, success){
if(error){
    console.error('Error sending:', error)
}else{
    console.log("Email Sent Successfully:", success.response)
}
})
}

module.exports = { sendConfirmationEmail } */