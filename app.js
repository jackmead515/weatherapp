const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');

const argv = yargs.options({
  address: {
    demand: true,
    alias: 'a',
    describe: 'Address to fetch weather for',
    string: true
  }
}).help().alias('help', 'h').argv;

geocode.getLatLng(argv.address).then(function(data) {
  return geocode.getCurrentWeather(data);
}).then(function(weather) {
  console.log("It is " + weather.temperature + " and " + weather.summary.toLowerCase() + " in " + weather.address);
}).catch(function(err) {
  console.log(err);
});
