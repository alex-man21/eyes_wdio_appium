exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: "local",
    port: 4723,
    path: "/wd/hub",
    enableEyesLogs: true,
    showLogs: true,
    //
    // Override default path ("/wd/hub") for chromedriver service.
    // path: "/",
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        "./test/koho.spec.js"
    ],
    // Patterns to exclude.
    exclude: [
        // "path/to/excluded/files"
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let"s
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    capabilities: [
      {
        "platformName": "Android", 
        "deviceName": "Pixel 2", 
        "platformVersion": "11", 
        "automationName": "UIAutomator2", 
        "app": "/Users/alexman/tickets/wdio/wdio_template/apks/koho-92289.apk",
      },
    ],
    appium: { command: "appium" },
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: "trace",
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner, @wdio/lambda-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: "info",
    //     "@wdio/applitools-service": "info"
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don"t bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl: "http://localhost",
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 18000000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn"t send response
    connectionRetryTimeout: 1800000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don"t want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don"t add new
    // commands. Instead, they hook themselves up into the test process.
    services: [
      // "appium",
      ["@applitools/eyes-webdriverio5-service", {
        appName: 'Koho',
        apiKey: process.env.APPLITOOLS_API_KEY,
        concurrency: 5,
        ignoreDisplacements: true,
        dontCloseBatches: true,
        enableEyesLogs: true,
        // scrollRootElement: 'spending-page ion-content'
      }

      // // user's configuration
      // // Extends browser object methods to call the Applitools Eyes SDK
      //   [
      //       '@applitools/eyes-webdriverio5-service',
      //       // The npm project for eyes-webdriverio5-service is missing documentation.
      //       // For more configuration options, see @applitools/eyes-api/types/input/Configuration
      //       // or https://github.com/applitools/eyes.sdk.javascript1/blob/master/packages/eyes-api/src/input/Configuration.ts
      //       // for type information.
      //       {
      //           batch: {
      //               notifyOnCompletion: true,
      //               name: 'Visual Regression suite',
      //           },
      //           dontCloseBatches: true,
      //           appName: 'KOHO',
      //       },
      //   ],
    //   [
    //     EyesService, 
    //     {
    //       matchTimeout: 0,
    //       batch: {name: "Koho app"}
    //     }
      ]
    ],
    // // wdio 5 eyes service configuration
    // eyes: {
    //     batch: {name: "Koho app"}
    // },
    
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: "mocha",
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Test reporter for stdout.
    // The only one supported by default is "dot"
    // see also: https://webdriver.io/docs/dot-reporter.html
    reporters: ["spec"],
  
    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: "bdd",
        timeout: 600000000
    }
  }
  