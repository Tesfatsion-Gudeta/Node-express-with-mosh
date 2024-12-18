const express=require('express')
const router=express.Router()

const courses=[{id:1,name:'course1'},{id:2,name:'course2'},{id:3,name:'course3'}]


router.get('/',(req,res)=>{
    res.send(courses)
})

router.get('/:id',(req,res)=>{
    // res.send(req.params.id)
    // res.send(req.query)

    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course) return res.status(404).send('the course with that specific id is not found')
    res.send(course)
})

router.post('', (req,res)=>{

   const {error}=validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)
   
    const course={ id:courses.length+1,
        name:req.body.name}

    courses.push(course)
    res.send(course)

})

//put request: updating courses

router.put('/:id',(req,res)=>{

    const course=courses.find(c=>c.id===parseInt(req.params.id))
    if(!course) return res.status(404).send('course not found')
 
    const {error}=validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    course.name=req.body
    res.send(course)


})

//delete request:for deleting the courses

router.delete('/:id',(req,res)=> {
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

module.exports=router