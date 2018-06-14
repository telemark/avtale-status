const getTemplate = require('avtale-templates')
const readStatusIsSigned = ['LEST', 'SENDT_PRINT']

module.exports = data => {
  let status = 'unsigned'
  const template = getTemplate(data.agreementType)
  if (template.requireDigitalSignature === true) {
    const types = data.signedHistory.map(logg => logg.type)
    if (types.includes('SigneringsoppdragFullfort')) {
      status = 'signed'
    } else if (types.includes('SigneringsoppdragAvvistAvMottaker')) {
      status = 'cancelled'
    } else {
      const now = new Date().getTime()
      const then = new Date(data.created)
      let expires = new Date()
      expires.setDate(then.getDate() + parseInt(data.dueDays, 10))
      if (now > expires.getTime()) {
        status = 'expired'
      }
    }
  } else {
    if (readStatusIsSigned.includes(data.readStatus)) {
      status = 'signed'
    } else if (data.readStatus === 'LEVERT_SDP') {
      const now = new Date().getTime()
      const then = new Date(data.created)
      let expires = new Date()
      expires.setDate(then.getDate() + parseInt(data.dueDays, 10))
      if (now > expires.getTime()) {
        status = 'expired'
      }
    }
  }
  return status
}
