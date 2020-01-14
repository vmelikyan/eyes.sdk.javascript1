'use strict'
const axios = require('axios')
const {expect} = require('chai')

const RegionType = ['ignore', 'strict', 'content', 'layout', 'floating', 'accessibility']

async function getTestResults(testSummary) {
  let testResultContainer = await testSummary.getAllResults()
  return testResultContainer[0].getTestResults()
}

async function getApiData(url, token) {
  let response = await axios.get(
    `${url}?format=json&AccessToken=${token}&apiKey=${process.env.APPLITOOLS_API_KEY}`,
  )
  return response.data
}

function assertProperties(actual, expected) {
  for (let property in expected) {
    if (!Array.isArray(expected[property]) && expected.hasOwnProperty(property)) {
      expect(actual[property]).to.be.eql(expected[property])
    }
  }
}

async function assertImage(testSummary, expected) {
  let results = await getTestResults(testSummary)
  let data = await getApiData(results.getApiUrls().getSession(), results.getSecretToken())
  let image = data.actualAppOutput[0].image
  assertProperties(image, expected)
}

async function assertImageMatchSettings(testSummary, expected) {
  let results = await getTestResults(testSummary)
  let data = await getApiData(results.getApiUrls().getSession(), results.getSecretToken())
  let imageMatchSettings = data.actualAppOutput[0].imageMatchSettings // can be reconsidered but in the DotNet suite only first one is used for assertions
  assertProperties(imageMatchSettings, expected)
  assertRegions()

  function assertRegions() {
    RegionType.forEach(type => {
      if (expected[type]) expect(imageMatchSettings[type]).include.deep.members(expected[type])
    })
  }
}

module.exports.assertImageMatchSettings = assertImageMatchSettings
module.exports.assertImage = assertImage
