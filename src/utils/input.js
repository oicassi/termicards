import readline from 'readline'

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

const questionUser = (question) => {
	return new Promise((resolve, reject) => {
		try {
			rl.question(question, (answer) => {
				resolve(answer)
			})
		} catch (error) {
			const msg = error?.message || 'Unexpected error'
			reject(`Error asking user: ${msg}`)
		}
	})
}

const closeInput = () => {
	rl.close()
}

export { questionUser, closeInput }
