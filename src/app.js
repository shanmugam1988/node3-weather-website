const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectory = path.join(__dirname, '../public')
const viewDirectory = path.join(__dirname, '../templates/views')
const partialDirectory = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewDirectory)
hbs.registerPartials(partialDirectory)

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Shanmugam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Shanmugam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message : 'Sample help message.',
        title: 'help page',
        name: 'Shanmugam'
    })
})


app.get('/weather', (req, res) => {

    if(!req.query.address)
    {
        return res.send({
            error: 'Please provide address query string.'
        })
    }
    else
    {
        geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
            if(error)
            {
                return res.send(error)
            }
        
            forecast(latitude,longitude, (error, forecastData) => {
                if(error)
                {
                    return res.send(error)
                }

                res.send({
                    forecast:forecastData,
                    location:location,
                    address: req.query.address
                })
            })
        })
    }

   
})

app.get('/products', (req, res) => {

    if(!req.query.search)
    {
        return res.send({
            error: 'you must provide a search term.'
        })
    }


    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shanmugam',
        errorMessage : 'help artical not found'
    })
    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shanmugam',
        errorMessage : 'page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000.')
})