const express = require('express');
const mongoose = require('mongoose')
const app = express();
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
});

const path = require('path')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    res.render('home')
})
app.get('/makecampground', async (req, res) => { /*example data*/ 
    const camp = new Campground({title: 'My Backyard', description: 'cheamo camping'})
    await camp.save();
    res.send(camp)
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})