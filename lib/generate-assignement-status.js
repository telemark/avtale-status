module.exports = data => {
  let status = 'unsigned'
  const types = data.map(logg => logg.type)
  if (types.includes('SigneringsoppdragFullfort')) {
    status = 'signed'
  } else if (types.includes('SigneringsoppdragAvvistAvMottaker')) {
    status = 'cancelled'
  } else if (types.includes('SigneringsoppdragUtlopt')) {
    status = 'expired'
  }
  return status
}
