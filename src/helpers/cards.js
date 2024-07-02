import { file } from "../utils/index.js"

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

export { getDecks, getSubjects, formatSubjectListQuestion, getSubjectFromAnswer }
