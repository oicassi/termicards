import readline from 'readline'

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

const questionUser = (question) => {
	return new Promise((resolve, reject) => {
		const outputQuestion = `${question}\n\n>> `
		try {
			rl.question(outputQuestion, (answer) => {
				resolve(answer)
			})
		} catch (error) {
			const msg = error?.message || 'Unexpected error'
			reject(`Error asking user: ${msg}`)
		}
	})
}

const waitForUser = (message = 'Press ENTER to continue...') => {
	return new Promise((resolve) => {
		rl.question(message, () => {
			resolve()
		})
	})
}

const closeInput = () => {
	rl.close()
}

const getExerciseCardsCount = () => {
	const input = process.argv[2]
	if (input === undefined || input === null) return 0
	const count = Number(input)
	if (Number.isNaN(count)) return 0
	if (count < 1) return 0
	return count
}

export { questionUser, waitForUser, closeInput, getExerciseCardsCount }
