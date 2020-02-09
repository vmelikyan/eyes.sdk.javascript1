'use strict'

class EyesRunner {
  constructor() {
    /** @type {Eyes[]} */
    this._eyesInstances = []
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @abstract
   * @param {boolean} [shouldThrowException=true]
   * @return {Promise<TestResultSummary>}
   */
  // eslint-disable-next-line no-unused-vars
  async getAllTestResults(shouldThrowException) {
    throw new TypeError('The method is not implemented!')
  }

  /**
   * @protected
   * @return {Promise<void>}
   */
  async _closeAllBatches() {
    if (this._eyesInstances.length > 0) {
      const promises = []
      const batchIds = new Set()
      for (const eyesInstance of this._eyesInstances) {
        const batchId = eyesInstance.getBatch().getId()
        if (!batchIds.has(batchId)) {
          batchIds.add(batchId)
          promises.push(eyesInstance.closeBatch())
        }
      }

      await Promise.all(promises)
    }
  }
}

exports.EyesRunner = EyesRunner