const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/d06b1b2704366501837764adebd9bdf4/" + latitude + "," + longitude + "?units=si";
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the weather sevice!", undefined);
        } else if(body.error) {
            callback("Error: " + body.error , undefined);
        } else {
            const {precipProbability, temperature} = body.currently;
            callback(undefined, "It is currently " + temperature + " degrees out. There is a " + precipProbability + "% chance of rain. " + body.daily.data[0].summary);
        }
    });
};

module.exports = forecast;