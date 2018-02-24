# Weather-App-NodeJS
NodeJS application to retrieve the temperature of any location.

* Google Maps API to get the Latetude and Longitude of your location.
* Dark Sky API to get the forcast weather for the location at any time.

1. Clone the repository to your desktop.
2. Use your Google Maps API and Dark Sky API keys in 'api-connect.js' to retreive data successfully.
3. run command "npm install".

4. run the app using the command "node app.js"
  - address(a): option to set the address. it is not mandatory in case there is a default value.
      ex: node app.js -a '1301 lombard street philadelphia'
  - default: command to set a default address. in this case 'address' option is mandatory.
      ex: node app.js default -a '1301 lombard street philadelphia'
  - unit(u): option to set the unit of the retrieved temprature. 'C', 'F', 'K'.
      ex: node app.js -u K
