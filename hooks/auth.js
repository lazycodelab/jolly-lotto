import useSWR from 'swr'
import axios from '../lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
	const router = useRouter()

	const {
		data: user,
		error,
		mutate,
	} = useSWR('/jolly-user', () =>
		axios
			.get('/jolly-user')
			.then(res => res.data)
			.catch(error => {
				if (error.response.status !== 409) throw error
				router.push('/verify-email')
			}),
	)

	const csrf = () => axios.get('/sanctum/csrf-cookie')

	const register = async ({ setErrors, ...props }) => {
		await csrf()
		setErrors(null)

		const { userData } = props
		await axios
			.post('/register', userData)
			.then(() => mutate())
			.catch(error => {
				if (error.response.status !== 422) throw error

				setErrors(error.response.data.errors)
			})
	}

	const login = async ({ setErrors, ...props }) => {
		await csrf()
		setErrors(null)

		const { userData } = props

		axios
			.post('/login', userData)
			.then(() => mutate())
			.catch(error => {
				console.log(error);
				if (error.response.status !== 422) throw error

				setErrors(error.response.data.errors)
			})
	}

	const updateProfile = async ({ setErrors, setSuccess, ...props }) => {
		await csrf()
		setErrors(null)
		setSuccess(false)

		const { userData } = props

		axios
			.post('/update', userData)
			.then(() => {
				mutate()
				setSuccess(true)
			})
			.catch(error => {
				if (error.response.status !== 422) throw error

				setErrors(error.response.data.errors)
			})
	}

	const forgotPassword = async ({ setErrors, setStatus, email }) => {
		await csrf()

		setErrors([])
		setStatus(null)

		axios
			.post('/forgot-password', { email })
			.then(response => setStatus(response.data.status))
			.catch(error => {
				if (error.response.status !== 422) throw error

				setErrors(error.response.data.errors)
			})
	}

	const resetPassword = async ({ setErrors, setStatus, ...props }) => {
		await csrf()

		setErrors([])
		setStatus(null)

		axios
			.post('/reset-password', { token: router.query.token, ...props })
			.then(response =>
				router.push('/login?reset=' + btoa(response.data.status)),
			)
			.catch(error => {
				if (error.response.status !== 422) throw error

				setErrors(error.response.data.errors)
			})
	}

	const resendEmailVerification = ({ setStatus }) => {
		axios
			.post('/email/verification-notification')
			.then(response => setStatus(response.data.status))
	}

	const logout = async () => {
		if (!error) {
			await axios.post('/logout').then(() => mutate())
		}

		window.location.pathname = '/'
	}

	// @todo: Payment related functions.
	const addFunds = async ({ setErrors, setSuccess, ...props }) => {
		await csrf()
		setErrors(null)
		setSuccess(false)

		const { paymentPayload,setAddingFunds,setWalletBalance } = props
		axios
			.post('/add-funds', paymentPayload)
			.then(res => {
				console.log(res, '  ==> Res')
				mutate()
				if(res.data.status === 'success') {
					setSuccess({PaymentResponse: [res.data.message]})
					setWalletBalance((prevBalance) => Number(prevBalance)+Number(paymentPayload.amount))
				} else {
					console.log(res);
					setErrors({PaymentResponse: [res.data.message]})
				}
				setAddingFunds(false)
			})
			.catch(error => {
				console.log(error, '  ==> Error')
				setAddingFunds(false)
				if (error.response.status !== 422) throw error

				setErrors(error.response.data.errors)
			})
	}

	// @todo: Payment related functions.
	const addMethod = async ({ setErrors, setSuccess, ...props }) => {
		await csrf()
		setErrors(null)
		setSuccess(false)

		const { method , form, setShowCardForm, setAddingNewMethod, fetchPaymentMethods} = props

		axios
			.post('payment/gateways/new', method)
			.then((res) => {
				mutate()
				setSuccess(true)
				if(res.data.status === 'success') {
					form.reset()
					setShowCardForm(false)
					setSuccess({PaymentResponse: [res.data.message]})
					fetchPaymentMethods()
				} else {
					console.log(res);
					setErrors({PaymentResponse: [res.data.message]})
				}
				setAddingNewMethod(false)
			})
			.catch(error => {
				setAddingNewMethod(false)
				if (error.response.status !== 422) throw error

				setErrors(error.response.data.errors)
			})
	}


	const buyLottery = async ({ setErrors,setSuccess , ...props }) => {
		await csrf()
		setErrors(null)
		setSuccess(null)

		const { lotteryData } = props

		axios
			.post('lotteries/checkout', lotteryData)
			.then((res) => {
				mutate()
				// response in axios
				if(res.data.status === 'error') {
					console.log(res.data.message);
					setErrors({lotteryCard: [res.data.message]})
				} else {
					setSuccess({lotteryCard: [res.data.message]})
				}
			})
			.catch(error => {
				// if (error.response.status !== 422) throw error
				console.log(error);
				setErrors(error.response.data.errors)
			})
	}

	useEffect(() => {
		if (middleware === 'guest' && redirectIfAuthenticated && user)
			router.push(redirectIfAuthenticated)
		if (
			window.location.pathname === '/verify-email' &&
			user?.email_verified_at
		)
			router.push(redirectIfAuthenticated)
		if (middleware === 'auth' && error) logout()
	}, [user, error])

	return {
		user,
		addFunds,
		addMethod,
		register,
		login,
		updateProfile,
		forgotPassword,
		resetPassword,
		resendEmailVerification,
		logout,
		buyLottery,
	}
}
