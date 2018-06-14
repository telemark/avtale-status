const axios = require('axios')
const generateSystemToken = require('./generate-system-token')
const config = require('../config')
const logger = require('./logger')

module.exports = forsendelseId => {
  return new Promise(async (resolve, reject) => {
    axios.defaults.headers.common['Authorization'] = generateSystemToken(config.SVARUT_JWT_SECRET)
    const readUrl = `${config.SVARUT_SERVICE_URL}/retrieveForsendelseStatus/${forsendelseId}`
    const readHistoryUrl = `${config.SVARUT_SERVICE_URL}/retrieveForsendelseHistorikk/${forsendelseId}`
    const signUrl = `${config.SVARUT_SERVICE_URL}/retrieveSigneringshistorikk/${forsendelseId}`
    logger('info', ['get-agreement-status', 'forsendelseId', forsendelseId])
    const jobs = [axios.get(readUrl), axios.get(readHistoryUrl), axios.get(signUrl)]
    try {
      const [readResponse, readHistoryResponse, signResponse] = await Promise.all(jobs)

      logger('info', ['get-agreement-status', 'forsendelseId', forsendelseId, 'success'])
      return resolve({
        read: readResponse.data,
        readHistory: readHistoryResponse.data,
        sign: signResponse.data
      })
    } catch (error) {
      logger('error', ['get-agreement-status', 'forsendelseId', forsendelseId, error])
      return reject(error)
    }
  })
}
