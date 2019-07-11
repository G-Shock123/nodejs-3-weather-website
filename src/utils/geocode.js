const request = require('request')

const geocode = (address, callback) => {

    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3Nob2NrIiwiYSI6ImNqeHFwZGNzajAwa28zaG50YjJ4N2x0MzUifQ.hXV8-rvMZB5ve463h6sHjw&limit=1'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect to location services')
        } else if (body.features.length === 0) {
            callback('There is no place by this name')
        } else {
            callback(undefined, {
                long: body.features[0].center[1],
                lat: body.features[0].center[0],
                location: body.features[0].place_name


            })
        }

    })

}

module.exports= geocode
