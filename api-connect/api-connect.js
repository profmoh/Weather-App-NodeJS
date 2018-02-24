const axios = require('axios');

var getWeather = (address) => {
    return new Promise((resolve, reject) => {
        var fullAddress = '';
        var encodedAddress = encodeURIComponent(address);

        const weatherApikey = 'aa08377d670b93ead0eeddffbb7fc821';
        const addressApikey = 'AIzaSyCZ1L3p0ZsMfY6oPFnyFi7AwafPCGRjV0w';

        var addressUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${addressApikey}`;

        axios.get(addressUrl).then((response) => {
            if(response.data.status !== 'OK')
                throw new Error(response.data.status);

            fullAddress = response.data.results[0].formatted_address;

            var latitude = response.data.results[0].geometry.location.lat;
            var longitude = response.data.results[0].geometry.location.lng;
        
            var weatherUrl = `https://api.darksky.net/forecast/${weatherApikey}/${latitude},${longitude}?exclude=minutely hourly daily alerts flags`;
        
            return axios.get(weatherUrl);
        }).then((response) => {
            if(response.statusText !== 'OK')
                throw new Error(response.data.status);

            resolve({
                address: fullAddress,
                temperature: response.data.currently.temperature,
                apparentTemperature: response.data.currently.apparentTemperature
            });
        }).catch((error) => {
            if(error.code)
                reject('Unable to connect to API servers');
            else
                reject(error.message);
        });
    });
};

module.exports = {
    getWeather
};
