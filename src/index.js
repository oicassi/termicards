import { input, output, file } from './utils/index.js'
import { cards, validation } from './helpers/index.js'

const main = async () => {
	output.resetConsole()

	try {
		const decks = await cards.getDecks()
		validation.validateDeckLength(decks)
		const subjects = cards.getSubjects(decks)

		let selectedSubject = ''

		while (!selectedSubject) {
			console.log(
				`Type the subject or the number from the following list:\n(Type exit to leave)\n\n`
			)
			const formattedQuestion = cards.formatSubjectListQuestion(subjects)
			const answer = await input.questionUser(formattedQuestion)
			output.resetConsole()
			selectedSubject = cards.getSubjectFromAnswer(answer, subjects)
			if (!selectedSubject) {
				console.log(`Subject not found. The answer: ${answer} is not valid. Try again.\n\n`)
			}
		}

		if (selectedSubject === 'exit') {
			console.log('Bye!')
			process.exit(0)
		}

		console.log('The Selected Subject is:', selectedSubject)
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
