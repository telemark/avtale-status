const uuid = require('./generate-uuid')
const pkg = require('../package.json')
const config = require('../config')
const logger = require('./logger')
const generateAssignmentStatus = require('./generate-assignement-status')

module.exports = agreement => {
  const url = `${config.AGREEMENTS_SERVICE_UPDATE_URL}/${agreement._id}`
  logger('info', ['generate-update-agreement-status-job', 'id', agreement._id])
  return {
    '_id': uuid(),
    system: pkg.name,
    jobId: agreement._id,
    url: url,
    method: 'POST',
    payload: {
      history: agreement.history,
      status: generateAssignmentStatus(agreement.history),
      updated: new Date().getTime()
    }
  }
}
