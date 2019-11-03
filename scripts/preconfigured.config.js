module.exports = {
  concurrency: 100,
  showLogs: process.env.APPLITOOLS_SHOW_LOGS === 'true',
  appName: process.env.APPLITOOLS_APP_NAME || 'Test storybook',
  batchName: process.env.APPLITOOLS_APP_NAME || 'Test storybook',
  storybookUrl: process.env.APPLITOOLS_STORYBOOK_URL,
  readStoriesTimeout: 300000,
  waitBeforeScreenshots: process.env.APPLITOOLS_WAIT_BEFORE_SCREENSHOTS || 200,
  disableBrowserFetching: true,
  browser: [
    // {width: 1200, height: 800, name: 'chrome'},
    {width: 800, height: 600, name: 'chrome'},
    // {width: 1200, height: 800, name: 'firefox'},
    // {width: 800, height: 600, name: 'firefox'},
    // {deviceName: 'iPhone X'},
    // {width: 1200, height: 800, name: 'ie11'},
    // {width: 800, height: 600, name: 'ie11'},
    // {width: 1200, height: 800, name: 'edge'},
    // {width: 800, height: 600, name: 'edge'},
  ],
  // include: (() => {
  //   let count = 0;
  //   return () =>  ++count <= 500;
  // })(),
  // waitBeforeScreenshots: 6000,
};
