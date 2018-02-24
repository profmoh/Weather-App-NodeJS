const fs = require('fs');
const yargs = require('yargs');

const apiConnect = require('./api-connect/api-connect');

const propFile = './api-connect/property.json';

const argv = yargs
    .command('default', 'Set address to be default.', {
        address: {
            alias: 'a',
            string: true,
            demandOption: true,
            describe: 'Your Address.'
        }
     })
    .options({
        address: {
            alias: 'a',
            string: true,
            describe: 'Your Address.'
        },
        unit: {
            alias: 'u',
            string: true,
            describe: 'Unit C, F, K.',
            default: 'C',
            choices: ['C', 'F', 'K']
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
debugger;
var command = undefined;
var argvAddress = undefined;

if(argv._.length > 0)
    command = argv._[0];

if(command === 'default') {
    if(argv.address !== '') argvAddress = argv.address;
} else if(command === undefined) {
    if(argv.address !== undefined && argv.address !== '')
        argvAddress = argv.address;
    else {
        try {
            var properties = JSON.parse(fs.readFileSync(propFile));
    
            if(properties.address !== undefined && properties.address !== '')
                argvAddress = properties.address;
        } catch (error) { }
    }
}

if(argvAddress === undefined) {
    console.log('Empty Address!!');
    return;
}

apiConnect.getWeather(argvAddress).then((results) => {
    var temperature = results.temperature;
    var apparentTemperature = results.apparentTemperature;

    if(argv.unit !== 'C') {
        temperature = convertUnit(temperature, argv.unit);
        apparentTemperature = convertUnit(apparentTemperature, argv.unit);
    }

    console.log(`In ${results.address}, It's currently ${temperature} ${argv.unit}. It feels like ${apparentTemperature} ${argv.unit}.`);

    if(command === 'default') {
        try {
            var properties = JSON.parse(fs.readFileSync(propFile));

            properties = properties.filter((prop) => prop !== 'address');
            properties.push(`address:${argvAddress}`);

            fs.writeFileSync(propFile, JSON.stringify(properties));
        } catch (e) {
            try {
                fs.writeFileSync(propFile, JSON.stringify({address: argvAddress}));
            } catch (error) { }
        }
    }
}, (errorMessage) => {
    console.log(errorMessage);
});

var convertUnit = (temperature, unit) => {
    if(unit === 'F')
        return temperature * (9 / 5) + 32;
    else if(unit === 'K')
        return temperature + 273.15;
    
    return temperature;
};