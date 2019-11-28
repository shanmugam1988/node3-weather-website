const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/9845c6b126ac1a7f2e74b69c5e79d2c8/' + latitude + ',' + longitude

    request({url, json:true}, (error, {body}) => {
        if(error)
        {
            callback('Unable to connect to servc=ice !', undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location.', undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.'
            )
        }
    })

}

module.exports = forecast