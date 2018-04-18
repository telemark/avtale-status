const axios = require('axios')
const uuid = require('../generate-uuid')
const generateSystemToken = require('../generate-system-token')
const config = require('../../config')
const logger = require('../logger')

module.exports = async () => {
  axios.defaults.headers.common['Authorization'] = generateSystemToken(config.AGREEMENTS_JWT_SECRET)
  const url = `${config.AGREEMENTS_SERVICE_SEARCH_URL}`
  const jobId = uuid()
  logger('info', ['get-unsigned-agreements', jobId, 'url', url])
  try {
    const { data } = await axios.post(url, {status: 'unsigned'})
    logger('info', ['get-unsigned-agreements', jobId, 'url', url, 'success', data.length])
    if (data.length > 0) {
      return {
        '_id': jobId,
        agreements: data
      }
    } else {
      logger('info', ['get-unsigned-agreements', jobId, 'no assignements to update', 'finished'])
      process.exit(0)
    }
  } catch (error) {
    logger('error', ['get-unsigned-agreements', 'url', url, error])
    throw error
  }
}
