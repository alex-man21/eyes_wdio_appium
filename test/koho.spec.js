'use strict';
const assert = require('assert');
const {Target} = require('@applitools/eyes-webdriverio');
const { exit } = require('process');

let contexts;

const TEST_TYPE = "webview";


describe('Koho app test', () => {
  async function check(tag, target) {
    await browser.switchContext(contexts[0]);
    await browser.eyesCheck(tag, target);
    await browser.switchContext(contexts[1]);
  }

  before(async() => {
    contexts = await browser.getContexts();
    console.log('contexts: ', contexts);
      /*
      * this throws out an undefined error
      * node_modules/@applitools/eyes-webdriverio5-service/node_modules/@applitools/eyes-api/dist/input/Configuration.js
      * Configuration.js: _spec priv variable isn't instantiated so it's undefined
      * - not sure how to fine tune the eyes object as a service 
      * 
      * TypeError: Cannot read property 'isElement' of undefined
  at utils.guard.custom.name (/Users/alexman/tickets/wdio/39111/node_modules/@applitools/eyes-webdriverio5-service/node_modules/@applitools/eyes-api/dist/input/Configuration.js:779:67)
      */
      // browser.eyesSetScrollRootElement(`spending-page ion-content`);
      // browser.eyesSetScrollRootElement(`#sourceContainer > div > div.ant-tree-list > div > div > div > div.ant-tree-treenode.ant-tree-treenode-switcher-open.ant-tree-treenode-selected.ant-tree-treenode-leaf-last > span.ant-tree-node-content-wrapper.ant-tree-node-content-wrapper-open.ant-tree-node-selected > span > span > b`);

      // let config = await browser.eyesGetConfiguration();
      // console.dir('before', config);
      // console.log(config.getScrollRootElement());
      // config.setScrollRootElement(`spending-page ion-content`);
      // browser.eyesSetConfiguration(config);
      // console.log(config.getScrollRootElement());
      // console.dir(config);
    
    if (TEST_TYPE === "webview") await browser.switchContext(contexts[1]); // switching to webview

    console.log('current context' + await browser.getContext());
  })

  it('testing WebView', async () => {
    let loginButton = $(">>>body > app-root > ion-app > ion-router-outlet > app-landing-page-static > ion-footer > ion-toolbar > ion-button.kds-ion-button.ion-color.ion-color-primary-new.ios.button.button-clear.in-toolbar.ion-activatable.ion-focusable.hydrated");
    console.log('found login button');

    // await check('Koho:landing page', Target.window());

    await browser.switchContext(contexts[0]);
    await browser.eyesCheck(
        'Koho: landing page'
        // Target.window()
      );
    await browser.switchContext(contexts[1]);

    (await loginButton).click();

    await browser.pause(2000);

    await browser.switchContext(contexts[0]);
    await browser.eyesCheck(
      'Koho: login page'
      // Target.window()
    );
    await browser.switchContext(contexts[1]);

    let emailInput = await $(">>>body > app-root > ion-app > ion-router-outlet > page-log-in > ion-content > section > form-log-in > form > kh-text-input:nth-child(1) > div > ion-item > ion-input > input");
    await emailInput.click();
    await emailInput.addValue(email);

    let passwordInput = await $(">>>body > app-root > ion-app > ion-router-outlet > page-log-in > ion-content > section > form-log-in > form > kh-text-input:nth-child(2) > div > ion-item > ion-input > input");
    await passwordInput.click();
    await passwordInput.addValue(password);

    await browser.pause(3000);

    loginButton  = await $(">>>body > app-root > ion-app > ion-router-outlet > page-log-in > ion-content > section > form-log-in > form > ion-button.ion-color.ion-color-primary-new.ios.button.button-block.button-solid.ion-activatable.ion-focusable.hydrated");
    (await loginButton).click();

    await browser.pause(5000);

    await browser.switchContext(contexts[0]);
    await browser.eyesCheck(
      'Koho: passcode page',
      // Target.window()
    );
    await browser.switchContext(contexts[1]);

    // switch to native view as css selectors weren't working
    await browser.switchContext(contexts[0]);
    const selectorPrefix = 'new UiSelector()';

    let zeroSelector = `${selectorPrefix}.text("0").className("android.widget.Button")`;
    let zeroKey = await $(`android=${zeroSelector}`)
    await zeroKey.waitForDisplayed(5000);
    
    let eightSelector = `${selectorPrefix}.text("8 TUV").className("android.widget.Button")`;
    let eightKey = await $(`android=${eightSelector}`);
    await eightKey.waitForDisplayed(5000);


    // not sure why the css selectors aren't working
    // const zeroKey = await $(
    //   // ">>>#ion-overlay-7 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > verify-access-code-modal > ion-content > div > div.pb5.item-keypad > access-code-keypad > ion-grid > ion-row:nth-child(4) > ion-col:nth-child(2) > access-code-button > ion-button"
    //   `>>>#ion-overlay-7 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > verify-access-code-modal > ion-content > div > div.pb5.item-keypad > access-code-keypad > ion-grid > ion-row:nth-child(4) > ion-col:nth-child(2) > access-code-button`
    //   );
    // const eightKey = await $(
    //   // `>>>#ion-overlay-7 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > verify-access-code-modal > ion-content > div > div.pb5.item-keypad > access-code-keypad > ion-grid > ion-row:nth-child(3) > ion-col:nth-child(2) > access-code-button > ion-button`
    //   `>>>#ion-overlay-7 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > verify-access-code-modal > ion-content > div > div.pb5.item-keypad > access-code-keypad > ion-grid > ion-row:nth-child(3) > ion-col:nth-child(2)`
    //   );
    
    await zeroKey.click();
    await browser.pause(1000);
    await zeroKey.click();
    await browser.pause(1000);
    await eightKey.click();
    await browser.pause(1000);
    await zeroKey.click();   

    await browser.switchContext(contexts[1]);
    
    await browser.pause(10000);

    await browser.switchContext(contexts[0]);    
    await browser.eyesCheck(
      'Koho: frontpage',
      // Target
      //   .window()
      //   // .region(scrollElement)
      //   // .scrollRootElement(scrollElement)
      //   // .scrollRootElement(`spending-page ion-content`)
      //   // .scrollRootElement(`#sourceContainer > div > div.ant-tree-list > div > div > div > div.ant-tree-treenode.ant-tree-treenode-switcher-open.ant-tree-treenode-selected.ant-tree-treenode-leaf-last > span.ant-tree-node-content-wrapper.ant-tree-node-content-wrapper-open.ant-tree-node-selected > span > span > b`)
      //   .fully()
    );
    await browser.switchContext(contexts[1]);

    const testResults = await browser.eyesGetTestResults()
    await console.dir(testResults);

    // example for using the testResults -
    // fail the test if visual differences were found
    if (testResults.getStatus() !== 'Passed') {
      const testName = `'${testResults.getName()}' of '${testResults.getAppName()}'`
      throw new Error(`Test ${testName} detected differences! See details at: ${testResults.getUrl()}`)
    }
  })

  xit('testing NativeView', async () => {
    
    const selectorPrefix = 'new UiSelector()';

    let selector = `${selectorPrefix}.text("Log in").className("android.widget.TextView")`;
    let loginButton = await $(`android=${selector}`);
    await loginButton.waitForDisplayed();
    

    await browser.eyesCheck(
        'Koho: landing page'
    );

    await loginButton.click();

    await browser.eyesCheck(
        'Koho: login page'
    );

    selector = `${selectorPrefix}.resourceId("ion-input-0-lbl").`
    const emailEdit = await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View[1]/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]/android.widget.EditText');
    await emailEdit.waitForDisplayed();
    await emailEdit.click();
    await emailEdit.setValue(email);

    const passwordButton = await $(`/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.view.View[1]/android.view.View[2]/android.widget.EditText`);
    await passwordButton.click();
    await passwordButton.setValue(password);

    loginButton = await $(`/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View[2]/android.view.View/android.view.View[4]/android.widget.Button`);
    await loginButton.click();


    await (await $(`/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.app.Dialog/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View[1]`)).waitForDisplayed();

    await browser.pause(6000);

    let zeroSelector = `${selectorPrefix}.text("0").className("android.widget.Button")`;
    let zeroKey = await $(`android=${zeroSelector}`)
    await zeroKey.waitForDisplayed(5000);
    
    let eightSelector = `${selectorPrefix}.text("8 TUV").className("android.widget.Button")`;
    let eightKey = await $(`android=${eightSelector}`);
    await eightKey.waitForDisplayed(5000);

    console.log('zero key');
    console.dir(zeroKey);

    console.log('eight key');
    console.dir(eightKey);


    // await zeroKey.doubleClick();
    await zeroKey.click();
    await browser.pause(1000);
    await zeroKey.click();
    await browser.pause(1000);
    await eightKey.click();
    await browser.pause(1000);
    await zeroKey.click();
    
    // await browser.pause(10000);

    try {
      await ( await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.view.View[3]/android.view.View/android.view.View[1]')).waitForDisplayed(5000);
    } catch ( e ) {
      console.log('error occurred attempting login')
    }

    try {
      // uiautomator api
      // // 11 views from android:id/content
      //   // 2nd child

      // scroll element xpath
      // let scrollElement = await $(`/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]`);

      // scroll element css
      // let scrollElement = await $(`#sourceContainer > div > div.ant-tree-list > div > div > div > div.ant-tree-treenode.ant-tree-treenode-switcher-open.ant-tree-treenode-selected.ant-tree-treenode-leaf-last > span.ant-tree-node-content-wrapper.ant-tree-node-content-wrapper-open.ant-tree-node-selected > span > span > b`);
      // let scrollElement = await $(`spending-page ion-content`);
  
      await browser.switchContext(contexts[1]); // switching to webview
      
      console.log('finding inner scroll element');
      let scrollElement = await $(">>>.inner-scroll");

      await browser.eyesSetScrollRootElement(scrollElement);
      scrollElement.waitForExist(5000);
      scrollElement.waitForDisplayed(5000);
      console.log('done');

      await browser.eyesCheck(
        'Koho: frontpage',
        Target
          .window()
          // .region(scrollElement)
          .scrollRootElement(scrollElement)
          // .scrollRootElement(`spending-page ion-content`)
          // .scrollRootElement(`#sourceContainer > div > div.ant-tree-list > div > div > div > div.ant-tree-treenode.ant-tree-treenode-switcher-open.ant-tree-treenode-selected.ant-tree-treenode-leaf-last > span.ant-tree-node-content-wrapper.ant-tree-node-content-wrapper-open.ant-tree-node-selected > span > span > b`)
          .fully()
      );

      await browser.switchContext(contexts[0]);

    } catch (e) {
      console.log(`failed in attempting to set selector`);
      console.dir(e);
    }


  });

  afterEach(async() => {
  })

  after(async() => {
    browser.removeApp('ca.koho.alpha');
  })
});