const saveFile = require('./save-file')
const logger = require('./logger')
const config = require('../config')

module.exports = job => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['save-job', job._id])
    const filePath = `${config.JOBS_DIRECTORY_PATH}/${job._id}.json`
    try {
      await saveFile({ filePath: filePath, data: job })
      return resolve(job)
    } catch (error) {
      return reject(error)
    }
  })
}
