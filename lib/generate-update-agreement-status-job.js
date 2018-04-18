const uuid = require('uuid/v4')
const pkg = require('../package.json')
const config = require('../config')
const logger = require('../logger')

module.exports = agreement => {
  const url = `${config.AGREEMENTS_SERVICE_UPDATE_URL}/${agreement.id}`
  logger('info', ['generate-update-agreement-status-job', 'id', agreement._id])
  return {
    '_id': uuid(),
    system: pkg.name,
    jobId: agreement._id,
    url: url,
    method: 'POST',
    payload: {
      history: agreement.history,
      status: 'signed',
      updated: new Date().getTime()
    }
  }
}
