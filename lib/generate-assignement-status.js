const getTemplate = require('avtale-templates')
const readStatusIsSigned = ['LEST', 'SENDT_PRINT']
const readStatusIsException = ['IKKE_LEVERT']

function isExpired (data) {
  const now = new Date().getTime()
  const expires = new Date(data.created)
  expires.setDate(expires.getDate() + parseInt(data.dueDays, 10))
  return now > expires.getTime()
}

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
      if (isExpired(data)) {
        status = 'expired'
      }
    }
  } else {
    if (readStatusIsSigned.includes(data.readStatus)) {
      status = 'signed'
    } else if (readStatusIsException.includes(data.readStatus)) {
      status = 'exception'
    } else if (data.readStatus === 'LEVERT_SDP') {
      if (isExpired(data)) {
        status = 'expired'
      }
    }
  }
  return status
}
