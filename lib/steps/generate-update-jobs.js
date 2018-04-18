const generateUpdateAgreementStatusJob = require('../generate-update-agreement-status-job')
const logger = require('../logger')

module.exports = async data => {
  logger('info', ['generate-update-jobs', data._id, 'agreements', data.agreements.length])
  const jobs = data.agreements.map(agreement => Object.assign({}, agreement, {job: generateUpdateAgreementStatusJob(agreement)}))
  data.agreements = jobs
  return data
}
