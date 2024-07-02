import { input, output, file } from './utils/index.js'
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
		console.log(cardsList)
	} catch (error) {
		console.log('Error:', error)
	}

	try {
		const data = await file.readJsonFile()
		console.log('file data:', data)
	} catch (error) {
		console.log(error)
	}

	input.closeInput()
}

main()
