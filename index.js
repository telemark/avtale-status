const getUnsignedAgreements = require('./lib/steps/get-unsigned-agreements')
const checkAgreementsStatus = require('./lib/steps/check-agreements-status')
const logger = require('./lib/logger')

logger('info', ['index', 'start'])

getUnsignedAgreements()
  .then(checkAgreementsStatus)
  .then(data => {
    logger('info', ['index', data._id, 'finished'])
    process.exit(0)
  })
  .catch(error => {
    logger('error', ['index', 'error', JSON.stringify(error)])
    process.exit(1)
  })
