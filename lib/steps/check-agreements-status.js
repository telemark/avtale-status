const arrify = require('arrify')
const getAgreementStatus = require('../get-agreement-status')
const generateUpdateAgreementStatusJob = require('../generate-update-agreement-status-job')
const postUpdate = require('../post-update')
const logger = require('../logger')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    let checked = 0
    let errored = []
    async function next () {
      if (data.agreements.length > 0) {
        const agreement = data.agreements.pop()
        try {
          const status = await getAgreementStatus(agreement.partId)
          agreement.signedHistory = arrify(status.sign.logg)
          agreement.readStatus = status.read
          const job = generateUpdateAgreementStatusJob(agreement)
          await postUpdate(job)
          checked += 1
        } catch (error) {
          logger('error', ['check-agreements-status', data._id, error])
          errored.push(agreement.partId)
        }
        await next()
      } else {
        logger('info', ['check-agreements-status', data._id, 'checked', checked, 'success'])
        logger('info', ['check-agreements-status', data._id, 'errored', errored.length, errored])
        return resolve(data)
      }
    }
    logger('info', ['check-agreements-status', data._id, 'agreements', data.agreements.length, 'start'])
    try {
      await next()
    } catch (error) {
      return reject(error)
    }
  })
}
