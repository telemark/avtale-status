const axios = require('axios')
const generateSystemToken = require('./generate-system-token')
const { AGREEMENTS_JWT_SECRET } = require('../config')
const logger = require('./logger')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    logger('info', ['post-update', data._id, 'jobId', data.jobId, 'system', data.system, 'start'])
    axios.defaults.headers.common['Authorization'] = generateSystemToken(AGREEMENTS_JWT_SECRET)

    logger('info', ['post-update', data._id, 'jobId', data.jobId, 'system', data.system, 'url', data.url, 'method', data.method])

    try {
      const method = data.method || 'POST'
      let options = {
        url: data.url,
        method: method.toLowerCase(),
        data: data.payload
      }
      const result = await axios(options)
      logger('info', ['post-update', data._id, 'jobId', data.jobId, 'system', data.system, 'finished'])
      data.response = result.data
    } catch (error) {
      logger('error', ['post-update', data._id, 'jobId', data.jobId, 'system', data.system, error])
    }
    resolve(data)
  })
}
