const saveFile = require('../save-file')
const logger = require('../logger')
const config = require('../../config')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    const filePath = `${config.DONE_DIRECTORY_PATH}/${data._id}.json`
    logger('info', ['save-done', data._id])
    try {
      await saveFile({filePath: filePath, data: data})
      return resolve(data)
    } catch (error) {
      return reject(error)
    }
  })
}
