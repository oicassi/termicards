/* eslint-disable max-len */
import * as input from './input.js'

const splashScreen = () => {
	resetConsole()
	return new Promise((resolve) => {
		console.log('................__________                           ')
		console.log('.............../  ______ /__                         ')
		console.log('............../  /  _______/__                       ')
		console.log('............./  /  /         /                       ')
		console.log('............/  /  / Q ----- /                        ')
		console.log('.........../  /  / ------- /       TERMICARDS! 🎴    ')
		console.log('........../  /  /         /                          ')
		console.log('........./__/  / A ----- /														')
		console.log('.........../__/ ------- /                            ')
		console.log('............./_________/                             ')
		console.log('																											')

		setTimeout(() => {
			resolve()
		}, 3000)
	})
}

const resetConsole = (info = '') => {
	console.clear()
	console.log('============================ TERMICARDS ============================\n')
	if (info) {
		console.log(`(${info})\n`)
	}
	console.log('\n')
}

const warnUser = (message) => {
	console.log(`\n🟠 Warn: ${message}\n\n`)
}

const logFlashcardAnswer = (flashcardAnswer) => {
	console.log(`\n✅ flashcard answer: ${flashcardAnswer}\n`)
}

const logQuestionNumber = (current, total) => {
	console.log(`\n# ${current}/${total}\n\n`)
}

const logResults = async (subject, cardsList, results) => {
	const cardsListLength = cardsList.length

	for (let i = 0; i < cardsListLength; i++) {
		console.log('📝 RESULTS SUMMARY\n\n')
		console.log(`📚 Subject: ${subject}\n`)

		const card = cardsList[i]
		const currentAnswer = results[subject][card.question].find((answer) => !answer.checked)
		const checkedAnswers = results[subject][card.question].filter((answer) => answer.checked)

		currentAnswer.checked = true

		logQuestionNumber(i + 1, cardsListLength)

		console.log(`🔸 Question: ${card.question}\n`)
		console.log(`🔷 Card answer: ${card.answer}\n`)
		console.log(`🙂 Your answer: ${currentAnswer.content}\n\n`)

		if (checkedAnswers.length) {
			console.log('⏪ Previous answers -----------------------------------\n\n')
			checkedAnswers.forEach((answer) => {
				console.log('Answer:', answer.content)
				console.log('Timestamp:', answer.timestamp)
				console.log('---\n')
			})
		}

		if (i === cardsListLength - 1) {
			await input.waitForUser('Press ENTER to finish...')
		} else {
			await input.waitForUser('Press ENTER to continue to next question...')
		}
		resetConsole()
	}
}

export { splashScreen, resetConsole, warnUser, logFlashcardAnswer, logQuestionNumber, logResults }
