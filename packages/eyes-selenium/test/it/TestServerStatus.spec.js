'use strict';

require('chromedriver');
const assertRejects = require('assert-rejects');
const { Builder, Capabilities } = require('selenium-webdriver');
const { Options: ChromeOptions } = require('selenium-webdriver/chrome');
const { RectangleSize, GeneralUtils, NewTestError, DiffsFoundError } = require('@applitools/eyes-sdk-core');

const { Eyes, Target } = require('../../index');

let /** @type {WebDriver} */ driver, /** @type {Eyes} */ eyes;
describe('TestServerStatus', function () {
  this.timeout(5 * 60 * 1000);

  before(async function () {
    const chromeOptions = new ChromeOptions();
    chromeOptions.addArguments('disable-infobars');
    chromeOptions.headless();
    driver = await new Builder()
      .withCapabilities(Capabilities.chrome())
      .setChromeOptions(chromeOptions)
      .build();

    eyes = new Eyes();
    eyes.setSaveNewTests(false);
  });

  it('TestSessionSummary_Status_Failed', async function () {
    driver = await eyes.open(driver, this.test.parent.title, this.test.title, new RectangleSize(800, 599));

    await driver.get('https://applitools.com/helloworld');

    await eyes.check('TestSessionSummary_Status_Failed', Target.window());

    await assertRejects(eyes.close(), DiffsFoundError, 'Expected DiffsFoundError');
  });

  it('TestSessionSummary_Status_New', async function () {
    const uuid = GeneralUtils.guid();
    driver = await eyes.open(driver, this.test.parent.title, this.test.title + uuid, new RectangleSize(800, 599));

    await driver.get('https://applitools.com/helloworld');

    await eyes.check('TestSessionSummary_Status_New', Target.window());

    await assertRejects(eyes.close(), NewTestError, 'Expected NewTestError');
  });

  afterEach(async function () {
    await eyes.abortIfNotClosed();
  });

  after(async function () {
    await driver.quit();
  });
});
