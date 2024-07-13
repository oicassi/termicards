import { input, output, date } from '../utils/index.js'
import * as cards from './cards.js'
import * as validation from './validation.js'
import { DEFAULT_EXIT_MESSAGE } from '../constants/messages.js'

const getSubjectFromUser = async (subjects) => {
	let subject = ''
	while (!subject) {
		const formattedQuestion = cards.formatSubjectListQuestion(subjects)
		const answer = await input.questionUser(formattedQuestion)

		output.resetConsole(DEFAULT_EXIT_MESSAGE)

		cards.checkExitCommand(answer)

		subject = cards.getSubjectFromAnswer(answer, subjects)
		if (!subject)
			output.warnUser(`Subject not found. The answer - ${answer} - is not valid. Try again.`)
	}

	return subject
}

const getCardsCountFromUser = async (count = 0) => {
	let cardsCount = count
	while (!cardsCount) {
		const answer = await input.questionUser(`How many cards do you want to exercise?`)

		output.resetConsole(DEFAULT_EXIT_MESSAGE)

		cards.checkExitCommand(answer)

		cardsCount = cards.getCardsCountFromAnswer(answer)
		if (!cardsCount) output.warnUser(`The answer: ${answer} is not valid. Try again.`)
	}
	return cardsCount
}

const addAnswerToResults = (results, subject, card, answer) => {
	if (!results[subject]) results[subject] = {}
	if (!results[subject][card.question]) results[subject][card.question] = []

	results[subject][card.question].push({
		id: results[subject][card.question].length,
		content: answer,
		timestamp: date.getCurrentTimestamp(),
		checked: false,
	})
}

const answerCards = async (cardsList = [], subject = '', results = {}) => {
	const cardsListLength = cardsList.length

	for (let i = 0; i < cardsListLength; i++) {
		const card = cardsList[i]
		let answer = ''

		output.logQuestionNumber(i + 1, cardsListLength)

		answer = await input.questionUser(`🤔 ${card.question}`)

		cards.checkExitCommand(answer)

		if (!validation.validateTruthyAnswer(answer)) answer = '(empty answer)'

		output.logFlashcardAnswer(card.answer)

		addAnswerToResults(results, subject, card, answer)

		await input.waitForUser()

		output.resetConsole(DEFAULT_EXIT_MESSAGE)
	}
}

export { getSubjectFromUser, getCardsCountFromUser, answerCards }
