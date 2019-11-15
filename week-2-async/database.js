const fs = require('fs')

// FIXME: database-new.json => undefined
const save = function (filename, data) {
	console.log(`DATA:`, data)
	fs.writeFile(filename, JSON.stringify(data), (err, data) => {
		if (err) throw err
		console.log(data)
	})
}

const load = function(filename, handler) {
  fs.readFile(filename, 'utf8', (err, file) => {
    if (err) {
      console.log('there is a read error', err)
      handler(err)
      return
    }

    handler(null, JSON.parse(file));
  })
}

module.exports = { save, load }
