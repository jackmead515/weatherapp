const request = require('request');

var getLatLng = function(address) {
  return new Promise(function(resolve, reject) {
    var encode = encodeURIComponent(address);
    request({
      url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encode,
      json: true
    }, function(err, res, body) {
      if (err) {
        reject('Error occured while connecting to Google API');
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address.');
      }
    });
  });
};

var getCurrentWeather = function(data) {
  return new Promise(function(resolve, reject) {
    request({
      url: 'https://api.darksky.net/forecast/8f95d8be66fe2a87d0d765f2e5f44216/' + data.latitude + ',' + data.longitude,
      json: true
    }, function(err, res, body) {
      if (err) {
        reject('Error occured while connection to Darksky API');
      } else if (body.statusCode === 404) {
        reject('Unable to find that address.');
      } else {
        resolve({
          address: data.address,
          summary: body.currently.summary,
          temperature: body.currently.temperature,
          humidity: body.currently.humidity,
          windSpeed: body.currently.windSpeed
        });
      }
    });
  });
};

module.exports = {
  getLatLng: getLatLng,
  getCurrentWeather: getCurrentWeather
};
