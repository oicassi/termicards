#!/usr/bin/env node

import { input, output, file } from './utils/index.js'
import { cards, flow, validation } from './helpers/index.js'
import { DEFAULT_EXIT_MESSAGE } from './constants/messages.js'

const main = async () => {
	await output.splashScreen()

	output.resetConsole(DEFAULT_EXIT_MESSAGE)

	const params = {
		subject: '',
		cardsCount: input.getExerciseCardsCount(),
	}

	try {
		const decks = await cards.getDecks()
		const results = await cards.getResults()

		validation.validateDeckLength(decks)
		const subjects = cards.getSubjects(decks)

		params.subject = await flow.getSubjectFromUser(subjects)
		params.cardsCount = await flow.getCardsCountFromUser(params.cardsCount)

		const cardsList = cards.getCardsList(decks, params.subject, params.cardsCount)

		await flow.answerCards(cardsList, params.subject, results)

		output.resetConsole()

		await output.logResults(params.subject, cardsList, results)

		console.log('Bye 👋\n\n')

		await file.writeJsonFile(results)
	} catch (error) {
		console.log('Error:', error)
	}

	input.closeInput()
}

main()
