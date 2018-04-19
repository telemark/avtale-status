const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    let saved = []
    logger('info', ['save-jobs', data._id, 'agreements', data.agreements.length])
    async function next () {
      if (data.agreements.length > 0) {
        const agreement = data.agreements.pop()
        const filePath = `${config.JOBS_DIRECTORY_PATH}/${agreement.job._id}.json`
        try {
          await saveFile({filePath: filePath, data: agreement.job})
          saved.push(agreement)
          await next()
        } catch (error) {
          return reject(error)
        }
      } else {
        data.agreements = saved
        return resolve(data)
      }
    }
    await next()
  })
}
