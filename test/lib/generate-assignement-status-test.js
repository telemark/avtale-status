const test = require('ava')
const generateStatus = require('../../lib/generate-assignement-status')

test('it returns signed for LEST if no signature required', t => {
  const data = require('../data/no-signature-read.json')
  t.deepEqual(generateStatus(data), 'signed', 'signed OK')
})
