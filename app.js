const express = require('express')
const path = require('path')
const ejs = require('ejs')
const app = express()
const PORT = process.env.PORT || 3000;


const admittedStudents = []

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}))



app.get('/',(req,res)=>{
    res.send('its working')
})

//GETTING DATA FORM FRONTEND FORM
app.post('/submit-admission',(req,res)=>{

    //DESTRUCTURING OF DATA FORM FRONTEND
    const {fullName, email, phone, course} = req.body

    const data = {
        name:fullName,
        email : email,
        phone:phone,
        course : course,
    }

    //STORING DATA INTO TEMPORARY STORAGE -ARRAY
    admittedStudents.push(data)

    // res.send(`Thank you, ${fullName}! You've successfully applied for the ${course} program `)
    // res.send(`name:${fullName} , email: ${email} , phone:${phone} , course:${course}`)


    //RENDERING CONFIRMATION MESSAGE IN NEW ROUTE
    res.render('confirmation',{studentName:fullName,courseName:course})
     
})

//DISPLAYING STATIC PAGE AT /admission
app.get('/admission',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html')) 
})


//RUNNING FILE ON LOCAL HOST
app.listen(PORT,()=>{
    console.log(`server is running of port ${PORT}`)
})