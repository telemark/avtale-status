const getUnsignedAgreements = require('./lib/steps/get-unsigned-agreements')
const checkAgreementsStatus = require('./lib/steps/check-agreements-status')
const generateUpdateJobs = require('./lib/steps/generate-update-jobs')
const saveJobs = require('./lib/steps/save-jobs')
const logger = require('./lib/logger')

logger('info', ['index', 'start'])

getUnsignedAgreements()
  .then(checkAgreementsStatus)
  .then(generateUpdateJobs)
  .then(saveJobs)
  .then(data => {
    logger('info', ['index', data._id, 'finished'])
    process.exit(0)
  })
  .catch(error => {
    logger('error', ['index', 'error', JSON.stringify(error)])
    process.exit(1)
  })
