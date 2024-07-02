import { input, file } from './utils/index.js'

const getDecks = async () => {
	try {
		const decks = await file.readJsonFile()
		return decks.map((deck, index) => ({ ...deck, id: index }))
	} catch (error) {
		console.log(error)
		return []
	}
}

const getSubjects = (decks = []) => {
	const subjects = decks.map(({ id, subject }) => ({
		id,
		subject,
	}))
	return subjects
}

const formatSubjectListQuestion = (subjects = []) => {
	const formattedQuestion = subjects.reduce((finalAnswer, { id, subject }) => {
		return `${finalAnswer}${String(id + 1).padStart(2, '0')} - ${subject}\n`
	}, '')
	return formattedQuestion
}

const getSubjectFromAnswer = (answer, subjects = []) => {
	answer = answer.trim()
	if (answer.toLowerCase() === 'exit') return 'exit'
	const regex = /^(.{0,5})( - |- | -|-)/
	answer = answer.replace(regex, '::')
	const answerChunks = answer.split('::')
	const num = Number(answerChunks[0])
	const subjectStr = Number.isNaN(num) ? answerChunks[0] : answerChunks[1]
	let subjectFound = null

	if (!Number.isNaN(num)) {
		subjectFound = subjects.find(({ id }) => id === num - 1)
		if (subjectFound) {
			return subjectFound.subject
		}
	}

	subjectFound = subjects.find(({ subject }) =>
		subject.toLowerCase().includes(subjectStr.toLowerCase())
	)
	if (subjectFound) {
		return subjectFound.subject
	}
	return ''
}

const main = async () => {
	try {
		const decks = await getDecks()
		if (!decks || !decks.length) {
			throw new Error('No cards found')
		}

		const subjects = getSubjects(decks)

		let selectedSubject = ''

		while (!selectedSubject) {
			console.log(
				`Type the subject or the number from the following list:\n(Type exit to leave)\n\n`
			)
			const answer = await input.questionUser(formatSubjectListQuestion(subjects))
			console.clear()
			selectedSubject = getSubjectFromAnswer(answer, subjects)
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
