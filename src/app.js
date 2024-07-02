#!/usr/bin/env node

import { input, output, file, date } from './utils/index.js'
import { cards, validation } from './helpers/index.js'

const main = async () => {
	output.resetConsole()
	await output.splashScreen()

	const params = {
		subject: '',
		cardsCount: input.getExerciseCardsCount(),
	}

	try {
		const decks = await cards.getDecks()
		validation.validateDeckLength(decks)
		const subjects = cards.getSubjects(decks)

		while (!params.subject) {
			const formattedQuestion = cards.formatSubjectListQuestion(subjects)
			const answer = await input.questionUser(formattedQuestion)

			output.resetConsole()

			cards.checkExitCommand(answer)

			params.subject = cards.getSubjectFromAnswer(answer, subjects)
			if (!params.subject)
				output.warnUser(`Subject not found. The answer - ${answer} - is not valid. Try again.`)
		}

		while (!params.cardsCount) {
			const answer = await input.questionUser(
				`How many cards do you want to exercise?\n(type exit to leave)`
			)

			output.resetConsole()

			cards.checkExitCommand(answer)

			params.cardsCount = cards.getCardsCountFromAnswer(answer)
			if (!params.cardsCount) output.warnUser(`The answer: ${answer} is not valid. Try again.`)
		}

		const cardsList = cards.getCardsList(decks, params.subject, params.cardsCount)
		const cardsListLength = cardsList.length

		for (let i = 0; i < cardsListLength; i++) {
			let isValidAnswer = false
			const card = cardsList[i]
			let answer = ''

			while (!isValidAnswer) {
				output.logQuestionNumber(i + 1, cardsListLength)

				answer = await input.questionUser(`🤔 ${card.question}\n(type exit to leave)`)

				cards.checkExitCommand(answer)

				isValidAnswer = validation.validateTruthyAnswer(answer)
				if (!isValidAnswer) {
					output.resetConsole()
					output.warnUser('Answer should not be empty. Try again.\n\n')
				}
			}

			output.logFlashcardAnswer(card.answer)

			if (!card.userAnswers) card.userAnswers = []
			card.userAnswers.push({
				id: card.userAnswers.length,
				content: answer,
				timestamp: date.getCurrentTimestamp(),
				checked: false,
			})

			await input.waitForUser()
			output.resetConsole()
		}

		output.resetConsole()

		const deck = cards.getDeckBySubject(decks, params.subject)
		await output.logResults(deck, cardsList)

		console.log('Bye 👋\n\n')

		await file.writeJsonFile(decks)
	} catch (error) {
		console.log('Error:', error)
	}

	input.closeInput()
}

main()
