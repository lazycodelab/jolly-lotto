/**
 *
 * @param {number} quantity
 * @param {number} max
 * @returns Set
 */
export const generateRandomNum = (quantity, max) => {
	const set = []
	while (set.length < quantity) {
		const r = Math.floor(Math.random() * max) + 1
		if (set.indexOf(r) === -1) set.push(r)
	}

	return set
}

/**
 *
 * @returns Object
 */
export const getDays = () => {
	let days = []

	for (let i = 1; i <= 31; i++) {
		days[i] = i
	}

	return days
}

/**
 *
 * @returns Object
 */
export const getMonths = () => {
	let months = {}

	for (let i = 1; i <= 12; i++) {
		const date = new Date('2023-' + i + '-' + i)
		const month = date.toLocaleString('default', { month: 'long' })
		months[i] = month
	}

	return months
}

/**
 *
 * @returns Object
 */
export const getYears = () => {
	let years = []

	const currentYear = new Date().getFullYear()
	const endYear = currentYear - 60

	for (let i = endYear; i <= currentYear; i++) {
		years[i] = i
	}

	return years
}


/**
 *
 * @returns Object
 */
export const getNextYears = () => {
	let years = []

	const currentYear = new Date().getFullYear()
	const nextYears = currentYear + 30

	for (let i = currentYear; i <= nextYears; i++) {
		years[i] = i
	}

	return years
}
