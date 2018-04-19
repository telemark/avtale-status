const axios = require('axios')
const generateSystemToken = require('./generate-system-token')
const config = require('../config')
const logger = require('./logger')

module.exports = forsendelseId => {
  return new Promise(async (resolve, reject) => {
    axios.defaults.headers.common['Authorization'] = generateSystemToken(config.SVARUT_JWT_SECRET)
    const url = `${config.SVARUT_SERVICE_URL}/${forsendelseId}`
    logger('info', ['get-agreement-status', 'forsendelseId', forsendelseId])
    try {
      const { data } = await axios.get(url)
      logger('info', ['get-agreement-status', 'forsendelseId', forsendelseId, 'success'])
      return resolve(data)
    } catch (error) {
      logger('error', ['get-agreement-status', 'forsendelseId', forsendelseId, error])
      return reject(error)
    }
  })
}
