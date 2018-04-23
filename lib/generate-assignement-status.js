module.exports = data => {
  let status = 'unsigned'
  const types = data.history.map(logg => logg.type)
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
  return status
}
