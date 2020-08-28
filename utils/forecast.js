const request = require('postman-request')

const forecast = (lattitude, longitude, callback) => {
    const WS_API_KEY = '7f99730d72ee1afc12631f67e23c4eca';
    const unit = 'f';
    const url = `http://api.weatherstack.com/current?access_key=${WS_API_KEY}&query=${lattitude},${longitude}&units=${unit}`;

    if (address.length === 0) {
        callback('Please Enter Location', undefined)
    }
    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('unable to find web service', undefined)
        }
        else if (res.body.err) {
            callback('Location not Found', undefined)
        }
        else {
            callback(undefined, {
                description: res.body.current.weather_descriptions[0],
                ObservationTime: res.body.current.observation_time,
                temp: res.body.current.temperature, 
                precipitation: res.body.current.precip,
                lat: lattitude,
                long: longitude,
                windSpeed: res.body.current.wind_speed,
                windDegree: res.body.current.wind_degree,
                windDir: res.body.current.wind_dir,
                pressure: res.body.current.pressure,
                humidity: res.body.current.humidity,
                visibility: res.body.current.visibility
            })
        }
    })
}

module.exports = forecast