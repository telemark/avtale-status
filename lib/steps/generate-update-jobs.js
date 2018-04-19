const generateUpdateAgreementStatusJob = require('../generate-update-agreement-status-job')
const logger = require('../logger')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['generate-update-jobs', data._id, 'agreements', data.agreements.length])
    try {
      const jobs = data.agreements.map(agreement => Object.assign({}, agreement, {job: generateUpdateAgreementStatusJob(agreement)}))
      data.agreements = jobs
      return resolve(data)
    } catch (error) {
      logger('error', ['generate-update-jobs', data._id, 'agreements', data.agreements.length, error])
      return reject(error)
    }
  })
}
