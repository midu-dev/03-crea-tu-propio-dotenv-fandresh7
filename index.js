// reference: https://www.npmjs.com/package/dotenv
const fs = require('node:fs')

function config (options = {}) {
  const path = options.path ?? '.env'
  let fileContent = null

  try {
    fileContent = fs.readFileSync(path)
  } catch (err) {
    return
  }

  const data = fileContent.toString()
  if (!data) return

  const separatedVariables = data.split('\n')

  separatedVariables.forEach(item => {
    const [name, value] = item.split('=')
    const cleanValue = value.trim().replace(/["'\r]/g, '')

    process.env[name] = cleanValue
  })
}

module.exports = { config }
