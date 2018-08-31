const axios = require('axios')
const generateSystemToken = require('../generate-system-token')
const config = require('../../config')
const logger = require('../logger')

module.exports = job => {
  return new Promise(async (resolve, reject) => {
    axios.defaults.headers.common['Authorization'] = generateSystemToken(config.STATS_SERVICE_JWT)
    const url = `${config.STATS_SERVICE_URL}`
    const payload = {
      jobId: job._id,
      updated: new Date(),
      checked: job.statsChecked,
      errored: job.statsErrored
    }
    logger('info', ['update-status-stats', job._id, 'url', url])
    try {
      const { data } = await axios.post(url, payload)
      console.log(data)
      logger('info', ['update-status-stats', job._id, 'url', url, 'success', data.length])
      return job
    } catch (error) {
      logger('error', ['update-status-stats', job._id, 'url', url, error])
      return reject(error)
    }
  })
}
