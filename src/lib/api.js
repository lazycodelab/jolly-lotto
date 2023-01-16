import axios from './axios'

//export const getAllProducts = async () => {
//	const res = await axios.get('/lotteries')
//	return res.data
//}
export const getAllProducts = async () => {
	const resp = await axios.get('/lotteries')
	return resp.data
}

export const getSingleProducts = async () => {
	// return single type products here.
	const products = await getAllProducts()
	return products.filter(prod => prod.type === 1)
}

export const getProductByID = id => {
	// @todo: do we make this call everytime or cache all prods once and then get it from there?
	return axios.get(`/lotteries/${id}`).then(res => res.data)
}

export const getLotteryResults = async id => {
	const resp = await axios.get(`/lotteries/${id}/results`)
	return resp.data
}

export const handleRegistrationForm = async event => {
	// Stop the form from submitting and refreshing the page.
	event.preventDefault()
	// Get data submitted in request's body.
	//const body = req.body
	// Get data from the form.
	const data = {
		first: event.target.first_name.value,
		last: event.target.last_name.value,
	}
	// Send the data to the server in JSON format.
	const JSONdata = JSON.stringify(data)

	// API endpoint where we send form data.
	const endpoint = '/register'
	// Send the form data to our forms API on Vercel and get a response.
	const response = await axios.post(endpoint)

	// Get the response data from server as JSON.
	// If server returns the name submitted, that means the form works.
	const result = await response.json()
	alert(`Is this your full name: ${result.data}`)
}
