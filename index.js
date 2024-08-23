const Joi=require('joi')
const config=require('config')
const express= require('express')
const logger=require('./logger')
const autenticate=require('./autenticate')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

//configuration
console.log('Application Name: '+ config.get('name'))
console.log('Mail Server: '+config.get('mail.host'))
console.log('Mail password: '+config.get('mail.password'))



app.use(logger)
app.use(autenticate)


const courses=[{id:1,name:'course1'},{id:2,name:'course2'},{id:3,name:'course3'}]

app.get('/',(req,res)=>{
    res.send('hello world!!!')
})


app.get('/api/courses',(req,res)=>{
    res.send(courses)
})

app.get('/api/course/:id',(req,res)=>{
    // res.send(req.params.id)
    // res.send(req.query)

    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course) return res.status(404).send('the course with that specific id is not found')
    res.send(course)
})

app.post('/api/courses', (req,res)=>{

   const {error}=validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)
   
    const course={ id:courses.length+1,
        name:req.body.name}

    courses.push(course)
    res.send(course)

})



//put request: updating courses

app.put('/api/course/:id',(req,res)=>{

    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course) return res.status(404).send('course not found')
 
    const {error}=validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    course.name=req.body
    res.send(course)


})

//delete request:for deleting the courses

app.delete('/api/course/:id',(req,res)=> {
    const course=courses.find(c=>c.id===parseInt(req.params.id))

    if(!course) return res.status(404).send('course not found')

    const index=courses.indexOf(course)
    courses.splice(index,1)

    res.send(course)

})


//input validation
function validateCourse(name){


    const schema=Joi.object({name:Joi.string().min(3).required()})

    return schema.validate(name)



    
}





const port=process.env.PORT || 3000
app.listen(port,()=>{console.log(`listening to port ${port}...`)})