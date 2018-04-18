const getAgreementStatus = require('../get-agreement-status')
const logger = require('../logger')

module.exports = async data => {
  let checked = []
  async function next () {
    if (data.agreements.length > 0) {
      const agreement = data.agreements.pop()
      try {
        const { data } = await getAgreementStatus(agreement.forsendelsesId)
        agreement.history = data
        checked.push(agreement)
        await next()
      } catch (error) {
        throw error
      }
    } else {
      data.agreements = checked
      return data
    }
  }
  logger('info', ['check-agreements-status', data._id, 'agreements', data.agreements.length, 'start'])

  await next()
}
