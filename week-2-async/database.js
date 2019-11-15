const fs = require('fs')

// ! FIXME: TypeError [ERR_INVALID_CALLBACK]: Callback must be a function. Received undefined
const save = function(filename, data) {
  fs.writeFile(filename, JSON.stringify(data))
}

const load = function(filename, data) {
  fs.readFile(filename, JSON.stringify(data), (err, file) => {
		if (err) throw err;
		console.log(`Loading file...`, JSON.parse(file))
  })
}

module.exports = { save, load }
