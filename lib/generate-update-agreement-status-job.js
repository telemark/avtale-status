const pkg = require('../package.json')
const config = require('../config')
const logger = require('./logger')
const generateAssignmentStatus = require('./generate-assignement-status')

module.exports = agreement => {
  const url = `${config.AGREEMENTS_LOG_UPDATE_URL}/${agreement._id}`
  logger('info', ['generate-update-agreement-status-job', 'id', agreement._id])
  return {
    '_id': agreement._id,
    system: pkg.name,
    jobId: agreement._id,
    url: url,
    method: 'POST',
    payload: {
      signedHistory: agreement.signedHistory,
      readStatus: agreement.readStatus,
      status: generateAssignmentStatus(agreement),
      updated: new Date().getTime()
    }
  }
}
