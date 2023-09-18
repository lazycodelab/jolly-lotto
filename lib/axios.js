import Axios from 'axios'

const axios = Axios.create({
	// eslint-disable-next-line no-undef
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'Cache-Control': 'no-cache',
	},
	withCredentials: true,
})

export default axios
