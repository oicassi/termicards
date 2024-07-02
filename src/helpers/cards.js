import { file } from '../utils/index.js'

const getDecks = async () => {
	try {
		const decks = await file.readJsonFile()
		return decks.map((deck, index) => {
			deck.cards = deck.cards.map((card, i) => ({ ...card, id: i }))

			return {
				...deck,
				id: index,
			}
		})
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
		return `${finalAnswer}\n${String(id + 1).padStart(2, '0')} - ${subject}`
	}, `Type the subject or the number from the following list:\n(Type exit to leave)\n`)
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
		return ''
	}

	subjectFound = subjects.find(({ subject }) =>
		subject.toLowerCase().includes(subjectStr.toLowerCase())
	)
	if (subjectFound) {
		return subjectFound.subject
	}
	return ''
}

const getCardsCountFromAnswer = (answer) => {
	const num = Number(answer.trim())
	if (Number.isNaN(num)) return 0
	if (num < 1) return 0
	return num
}

const getCardsList = (decks, subject, cardsCount) => {
	const subjectDeck = decks.find((deck) => deck.subject === subject)
	if (!subjectDeck) return []

	const taken = []
	const cards = []
	const length = subjectDeck.cards.length
	let i = 0
	const max = cardsCount > length ? length : cardsCount
	while (i < max) {
		const randomIndex = Math.floor(Math.random() * length)
		if (taken.includes(randomIndex)) continue
		taken.push(randomIndex)
		cards.push(subjectDeck.cards[randomIndex])
		i++
	}
	return cards
}

const checkExitCommand = (
	string = '',
	testString = 'exit',
	message = 'Thanks for user termicards. Bye 👋'
) => {
	if (string.trim().toLowerCase() === testString) {
		console.log(message)
		process.exit(0)
	}
	return false
}

export {
	getDecks,
	getSubjects,
	formatSubjectListQuestion,
	getSubjectFromAnswer,
	getCardsCountFromAnswer,
	getCardsList,
	checkExitCommand,
}
