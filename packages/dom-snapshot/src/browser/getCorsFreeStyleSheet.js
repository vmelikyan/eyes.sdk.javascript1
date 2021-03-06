'use strict';
const createTempStyleSheet = require('./createTempStyleSheet');
const noop = require('./noop');

function getCorsFreeStyleSheet(cssArrayBuffer, styleSheet, log = noop) {
  let corsFreeStyleSheet;
  if (styleSheet) {
    try {
      styleSheet.cssRules;
      corsFreeStyleSheet = styleSheet;
    } catch (e) {
      log(
        `[dom-snapshot] could not access cssRules for ${styleSheet.href} ${e}\ncreating temp style for access.`,
      );
      corsFreeStyleSheet = createTempStyleSheet(cssArrayBuffer);
    }
  } else {
    corsFreeStyleSheet = createTempStyleSheet(cssArrayBuffer);
  }

  return {corsFreeStyleSheet, cleanStyleSheet};

  function cleanStyleSheet() {
    if (corsFreeStyleSheet !== styleSheet) {
      corsFreeStyleSheet.ownerNode.parentNode.removeChild(corsFreeStyleSheet.ownerNode);
    }
  }
}

module.exports = getCorsFreeStyleSheet;
