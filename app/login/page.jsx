'use client'
import LoginForm from '@/Auth/LoginForm'
import { useAuth } from 'hooks/auth'
import { useRouter } from 'next/navigation'

export default () => {
	const { user } = useAuth()
	const router = useRouter()

	if (user && user.statusCode === 200) {
		router.push('/user/dashboard')
	}

	return <LoginForm />
}
