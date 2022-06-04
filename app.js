//Importing modules
const express=require('express');
const app=express();
const path=require('path');
const port = 80;
const bodyparser=require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance');


//Mongoose stuff | Define schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
const contact = mongoose.model('Contact', contactSchema);

//Express stuff
app.use('/static', express.static('static')); //to serve static files in static folder
app.use(express.urlencoded());

//Pug stuff
app.set('view engine', 'pug'); //setting template engine as engine
app.set('views', path.join(__dirname, 'views')); //setting directory to views folder

//Endpoints
app.get('/', (req, res)=>{
    const params={};
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params={};
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData= new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database.")
    }).catch(()=>{
        res.status(400).send("Item not saved.")
    })
})

//Start server
app.listen(port, ()=>{
    console.log(`The app started successfully at port ${port}`);
})