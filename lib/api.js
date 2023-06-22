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
