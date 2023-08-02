'use client'
import LoginForm from '../../components/Auth/LoginForm'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../hooks/auth'

export default () => {
	const { user } = useAuth()
	const router = useRouter()

	if (user && user.statusCode === 200) {
		router.push('/user/dashboard')
	}

	return <LoginForm />
}
