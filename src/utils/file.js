import fs from 'fs'
import path from 'path'

const readJsonFile = (filePath = path.resolve(process.cwd(), 'src/assets/cards.json')) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf8', (error, data) => {
			if (error) {
				const msg = error?.message ?? 'Unexpected error'
				return reject(`Error reading file: ${msg}`)
			}
			resolve(JSON.parse(data))
		})
	})
}

const writeJsonFile = (data, filePath = path.resolve(process.cwd(), 'src/assets/cards.json')) => {
	if (!data) {
		return Promise.reject('No data provided')
	}

	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (error) => {
			if (error) {
				const msg = error?.message || 'Unexpected error'
				reject(`Error writing file: ${msg}`)
				return
			}
			resolve()
		})
	})
}

export { readJsonFile, writeJsonFile }
