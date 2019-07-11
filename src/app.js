const express = require('express')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')


const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000 

//Right here all i'm going is defining the paths for express. It's just easier to store it in a variable but it could have gone
//striaght into app.set() and app.us if i reallywanted it to
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath =path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs') //Here I am setting up the handle bars engine
app.set('views', viewsPath) //I'm telling handlebars to go to this path to find the files
hbs.registerPartials(partialsPath)

//I'm setting up the static directory to serve. So I'm telling the program that i want the public directory to be serv ed
app.use(express.static( publicDirectoryPath))



app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather ',
        name: 'Konrad'


    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
         title:'What this is about',
         name:'Konrad H'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: "For all your concerns",
        title: 'The FAQs',
        name:'KRMH'
    })
})

app.get('/products',(req,res)=>{

    if (!req.query.search){
        return res.send({ error: 'You forgot the search term' })
      
    }
    
        
        
    console.log(req.query.search);
    
    res.send({
        products:[]
       
        
    })
    
})


app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error: 'We did not receive an address. Thus error.'
        })
    }
    const address = req.query.address
    
 

    geocode(address, (error, { long, lat, location }={}) => {
       
        if (error) {
            return res.send({
                error:error
            })
        }

        forecast(long, lat, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                location ,
                data: forecastData,
                address
            })

        })

    })

})  

//this is a 404 but for things after help.
app.get('/help/*', (req, res) => {

    res.render('404', {
        message: "This help page hasn't been found",
        title: 'Help 404',
        name: 'Kon'
    })

})

//the asterics allows you to make a 404 page. app listens in order so it has to be last
app.get('*',(req,res)=>{
    res.render('404', {
        message: "Not sure how you got here",
        title: 'Main 404',
        name:'Kon'
     
    })
})

app.listen(port,()=>{
    console.log('The server is up on port 3000');
    
})