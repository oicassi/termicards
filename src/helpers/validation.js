const validateDeckLength = (
	decks = [],
	options = { errorMsg: 'No decks found', shouldStop: false }
) => {
	if (!decks || !decks.length) {
		if (options.shouldStop) {
			console.error(`Validation Error - validateDeckLength`)
			process.exit(1)
			return
		}
		throw new Error(options.errorMsg)
	}
	return true
}

const validateTruthyAnswer = (answer = '') => {
	return answer.trim().length > 0
}

export { validateDeckLength, validateTruthyAnswer }
