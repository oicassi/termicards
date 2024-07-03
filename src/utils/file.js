import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DEFAULT_FILE_PATH = path.join(__dirname, '..', 'assets/cards.json')

const readJsonFile = (filePath = DEFAULT_FILE_PATH) => {
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

const writeJsonFile = (data, filePath = DEFAULT_FILE_PATH) => {
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
