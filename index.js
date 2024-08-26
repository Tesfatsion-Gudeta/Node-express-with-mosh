const Joi=require('joi')
const debug=require('debug')('app:debug')
const config=require('config')
const express= require('express')
const logger=require('./middleware/logger')
const autenticate=require('./middleware/autenticate')
const courses=require('./routes/courses')
const home=require('./routes/home')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use('/api/courses',courses)
app.use('/',home)

//configuration
// console.log('Application Name: '+ config.get('name'))
debug('Application Name: '+ config.get('name'))
// console.log('Mail Server: '+config.get('mail.host'))
debug('Mail Server: '+config.get('mail.host'))
// console.log('Mail password: '+config.get('mail.password'))
// debug('Mail password: '+config.get('mail.password'))



app.use(logger)
app.use(autenticate)



const port=process.env.PORT || 3000
app.listen(port,()=>{console.log(`listening to port ${port}...`)})