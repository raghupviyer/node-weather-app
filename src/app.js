const hbs = require('hbs')
const path = require('path')
const express = require('express')
const app = express()

const port = process.env.PORT || 7000

require('dotenv').config()

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

//paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Raghuprasaad Iyer'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Raghuprasaad Iyer'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "address required"
        })
    }
    geocode(req.query.address, (error, { lattitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(lattitude, longitude, (err, data) => {
            if (err) {
                return res.send({
                    error: err
                })
            }
            res.send(data)
        })
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: "Raghuprasaad Iyer",
        errorMessage: 'Not Found,\n But Jesus found you, He loves you and hence you are looking at this ... \n the Bible says the wages of sin is death and The Bible also says no human is good, everyone is a sinner. \nWe have all done things we know we shouldnt have done ... But God still Loves you ... Come to Christ ... repent for your sins ... turn from your wicked ways ... only then will you receive salvation from hell to Heaven ... before it is too late ...'
    })
})

app.listen(port, () => {
    console.log("listening at port "+ port)
})