/* eslint-disable max-len */
import * as input from './input.js'

const splashScreen = () => {
	resetConsole()
	return new Promise((resolve) => {
		console.log('................_________                            ')
		console.log('.............../  ______/__                          ')
		console.log('............../  /  ______/__                        ')
		console.log('............./  /  /        /                        ')
		console.log('............/  /  / ------ /                         ')
		console.log('.........../  /  / ------ /       TERMICARDS! ✨     ')
		console.log('........../  /  / ------ /                           ')
		console.log('........./__/  / ------ /														')
		console.log('.........../__/ ------ /                             ')
		console.log('............./________/                              ')
		console.log('																											')

		setTimeout(() => {
			resetConsole()
			resolve()
		}, 3000)
	})
}

const resetConsole = () => {
	console.clear()
	console.log('============================ TERMICARDS ============================\n\n')
}

const warnUser = (message) => {
	console.log(`\n🟠 Warn: ${message}\n\n`)
}

const logFlashcardAnswer = (flashcardAnswer) => {
	console.log(`\n✅ flashcard answer: ${flashcardAnswer}\n`)
}

const logQuestionNumber = (current, total) => {
	console.log('+-----------+')
	console.log(`| ${String(current).padStart(4, ' ')}/${String(total).padStart(4, ' ')} |`)
	console.log('+-----------+\n\n')
}

const logResults = async (deck, cardsList) => {
	const cardsListLength = cardsList.length

	for (let i = 0; i < cardsListLength; i++) {
		console.log('📝 RESULTS SUMMARY\n\n')
		console.log(`📚 Subject: ${deck.subject}\n`)

		const card = cardsList[i]
		const currentAnswer = card.userAnswers.find((answer) => !answer.checked)
		const checkedAnswers = card.userAnswers.filter((answer) => answer.checked)

		currentAnswer.checked = true

		logQuestionNumber(i + 1, cardsListLength)

		console.log(`🔸 Question: ${card.question}\n`)
		console.log(`🔹 Your answer: ${currentAnswer.content}\n\n`)

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
