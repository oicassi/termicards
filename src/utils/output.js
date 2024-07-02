/* eslint-disable max-len */
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

export { splashScreen, resetConsole, warnUser }
