import request from "request"

const forecast = (lat,lon,callback) => {
    const APIkey = "808b9907c2c2ebbeffa334c2e57f0536"
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
    request({url, json: true},(error,{body}) => {
    if(error){
        callback('Unable to connect to weather service!',undefined);
    } else if(body.message){
        callback('Unable to find location!',undefined);
    } else{
        callback(undefined,`It's currently: ${body.main.temp - 273} degree celcius`)
    }
    })
}

export default{
    forecast
}