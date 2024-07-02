import fs from 'fs'

const readJsonFile = (path = `${process.cwd()}/src/assets/cards.json`) => {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', (error, data) => {
			if (error) {
				const msg = error?.message || 'Unexpected error'
				reject(`Error reading file: ${msg}`)
				return
			}
			resolve(JSON.parse(data))
		})
	})
}

const writeJsonFile = (path = `${process.cwd()}/src/assets/cards.json`, data) => {
	return new Promise((resolve, reject) => {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, JSON.stringify(data, null, 2), 'utf8', (error) => {
				if (error) {
					const msg = error?.message || 'Unexpected error'
					reject(`Error writing file: ${msg}`)
					return
				}
				resolve()
			})
		})
	})
}

export { readJsonFile, writeJsonFile }
