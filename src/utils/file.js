import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const filePathParser = {
	cards: path.join(__dirname, '..', 'assets/cards.json'),
	results: path.join(__dirname, '..', 'assets/results.json'),
}

const readJsonFile = (file = 'cards', forceCreate = false) => {
	const filePath = filePathParser[file]

	if (forceCreate) {
		if (!fs.existsSync(filePath)) {
			fs.writeFileSync(filePath, JSON.stringify({}), 'utf8')
		}
	}

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

const writeJsonFile = (data, file = 'results') => {
	if (!data) {
		return Promise.reject('No data provided')
	}
	const filePath = filePathParser[file]
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
