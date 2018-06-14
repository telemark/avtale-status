const arrify = require('arrify')
const getAgreementStatus = require('../get-agreement-status')
const logger = require('../logger')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    let checked = []
    async function next () {
      if (data.agreements.length > 0) {
        const agreement = data.agreements.pop()
        try {
          const status = await getAgreementStatus(agreement.partId)
          agreement.signedHistory = arrify(status.sign.logg)
          agreement.readStatus = status.read
          checked.push(agreement)
          await next()
        } catch (error) {
          return reject(error)
        }
      } else {
        logger('info', ['check-agreements-status', data._id, 'checked', checked.length, 'success'])
        data.agreements = checked
        return resolve(data)
      }
    }
    logger('info', ['check-agreements-status', data._id, 'agreements', data.agreements.length, 'start'])

    await next()
  })
}
