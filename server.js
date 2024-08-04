const express = require('express')
const app = express()
const PORT = 4194
app.use(express.json())
const axios = require('axios')
const cron = require('node-cron')
const db = require('./config/db')
const cors = require("cors")
const router = require('./routers/userRouter')

app.use(cors({origin:"*"}));
app.use(router)


// Cron job to ping the website twice every hour (at the start and at the 30-minute mark)
cron.schedule('0,30 * * * *', async () => {
    try {
        await axios.get('https://equity-reloaded.onrender.com');
        console.log('Pinged website to keep it awake');

        // // Prepare and send the wake-up email
        // const subject = "Wake up website";
        // const html = wakeUpMail();
        // const regEmailData = {
        //     email: process.env.WAKE_UP_EMAIL, // Use the environment variable
        //     subject,
        //     html
        // };
        // await sendEmail(regEmailData);
    } catch (error) {
        console.error('Error in cron job:', error.message);
    }
});


app.listen(PORT, ()=>{
    console.log(`app is listening to ${PORT}`)
})