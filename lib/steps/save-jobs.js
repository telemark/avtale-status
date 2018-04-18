const uuid = require('uuid/v4')
const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

module.exports = async data => {
  let saved = []
  logger('info', ['save-jobs', data._id, 'agreements', data.agreements.length])
  async function next () {
    if (data.agreements.length > 0) {
      const agreement = data.agreements.pop()
      const filePath = `${config.JOBS_DIRECTORY_PATH}/${uuid()}.json`
      try {
        await saveFile({filePath: filePath, data: agreement.job})
        saved.push(agreement)
        await next()
      } catch (error) {
        throw error
      }
    } else {
      data.agreements = saved
      return data
    }
  }
  await next()
}
