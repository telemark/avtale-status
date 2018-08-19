const axios = require('axios')
const uuid = require('../generate-uuid')
const generateSystemToken = require('../generate-system-token')
const config = require('../../config')
const logger = require('../logger')

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    axios.defaults.headers.common['Authorization'] = generateSystemToken(config.AGREEMENTS_JWT_SECRET)
    const url = `${config.AGREEMENTS_LOG_SEARCH_URL}`
    const jobId = uuid()
    const query = {
      agreementType: 'elevpc',
      status: 'unsigned'
    }
    logger('info', ['get-unsigned-agreements', jobId, 'url', url])
    try {
      const { data } = await axios.post(url, query)
      logger('info', ['get-unsigned-agreements', jobId, 'url', url, 'success', data.length])
      if (data.length > 0) {
        return resolve({
          '_id': jobId,
          agreements: data
        })
      } else {
        logger('info', ['get-unsigned-agreements', jobId, 'no agreements to update', 'finished'])
        process.exit(0)
      }
    } catch (error) {
      logger('error', ['get-unsigned-agreements', 'url', url, error])
      return reject(error)
    }
  })
}
