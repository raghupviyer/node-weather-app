const request = require('postman-request')

const geocode = (location, callback) => {
    const accessToken = "pk.eyJ1IjoicmFnaHVwdml5ZXIiLCJhIjoiY2tlOG9keWw0MXlpeDMxcGR4eXN3ZTYxOSJ9.BVw7nCgn6J01aBV3JG3KhQ"
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${accessToken}&limit=1`

    if (address.length === 0) {
        return ('Please Enter Location')
    }
    request({ url, json: true }, (err, res) => {
        if (err) {
            callback('unable to find web service', undefined)
        }
        else if (res.body.features.length === 0) {
            callback('Location not Found', undefined)
        }
        else {
            callback(undefined,{
                lattitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode