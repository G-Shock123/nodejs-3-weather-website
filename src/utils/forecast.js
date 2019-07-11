const request = require('request')


const forecast = (long, lat, callback)=>{
    //1. forecast takes 3 arguments. The longitude, the latitude and a callback function to instanttransmission that shit back

    const url = 'https://api.darksky.net/forecast/2fc5a0ae577b92394a8a061db36a4a6d/' + encodeURIComponent(long) + ',' + encodeURIComponent(lat)+'?lang=en&units=us'
    //2. This is just the link to the api that I'm using

    request({url,json:true },(error, response)=>{
        //3. I call the request function 

        const {error:mistake,daily,currently} = response.body
        if (error) {
            callback('Unable to connect to the weather service. Perhaps no internet');


        } else if (mistake) {
            callback(mistake);

        }
        else {
            callback(undefined, daily.data[0].summary + "It is currently " + currently.temperature + "  There is a " + currently.precipProbability+ " chance of rain");
        }
    })
   

}

module.exports = forecast