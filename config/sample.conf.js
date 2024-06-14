const argv = require("yargs").argv;
const wdioParallel = require('wdio-cucumber-parallel-execution');
// The below module is used for cucumber html report generation
const reporter = require('cucumber-html-reporter');
const currentTime = new Date().toJSON().replace(/:/g, "-");

const sourceSpecDirectory = `path/to/featureFilesDirectory`;
const parallelExecutionReportDirectory = `path/to/parallelExecutionReportDirectory`;

let featureFilePath = `${sourceSpecDirectory}/*.feature`;

// If parallel execution is set to true, then create the Split the feature files
// And store then in a tmp spec directory (created inside `the source spec directory)
if (argv.parallel === 'true') {
    tmpSpecDirectory = `${sourceSpecDirectory}/tmp`;
    wdioParallel.performSetup({
        sourceSpecDirectory: sourceSpecDirectory,
        tmpSpecDirectory: tmpSpecDirectory,
        cleanTmpSpecDirectory: true
    });
    featureFilePath = `${tmpSpecDirectory}/*.feature`
}

const {config} = require('./base.config')
config.cucumberOpts.tagExpression = "@Sample"
exports.config = {
    ...config,
    specs: [
        './tests/features/**/*.feature'
    ],
    exclude: [
       
    ],
    maxInstances: 15,
    capabilities: [{
        // platformName:'android',
        // "appium:deviceName":'Google Pixel 6',
        // "appium:platformVersion":"12.0",
        // "appium:app": 'bs://60a61737136382e174ea6abdc2037736cbb83084',
        // 'bstack:options' : {
        //     "appiumVersion" : "1.22.0",
        //     "buildName" : `NEW Wdio Browserstack Cucumber - ${new Date().toDateString()}`,  
        //     "projectName":"Browserstack Test"
        // },
        platformName:'ios',
        "appium:deviceName":'iPhone 13',
        "appium:platformVersion":"15",
        "appium:app": 'bs://62d2f4e8f5b521c63c88aaf28cf3ebab4c42f17e',
        'bstack:options' : {
            "appiumVersion" : "1.22.0",
            "buildName" : `NEW Wdio2 Browserstack Cucumber - ${new Date().toDateString()}`,  
            "projectName":"Browserstack Test"
        },
    }],
    afterScenario: async function (world, result, context) {
        console.log("<------------BEFORE RELOAD-------------->");
        await driver.terminateApp("com.browserstack.SimpleAppXamarinV1");
        console.log("<------------=====AFTER TERMINATE====-------------->");
        await driver.removeApp("com.browserstack.SimpleAppXamarinV1")
        await driver.reloadSession();
        console.log("<------------AFTER RELOAD-------------->");
        //await driver.newSession();
        //console.log("<------------AFTER NEW SESSION-------------->");
    },
}