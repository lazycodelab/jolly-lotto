'use client'
import RegisterForm from '@/Auth/RegisterForm'
import { useAuth } from 'hooks/auth'
import Head from 'next/head'
import { useRouter } from 'next/navigation'

export default () => {
	const { user } = useAuth()
	const router = useRouter()

	if (user && user.statusCode === 200) {
		router.push('/user/dashboard')
	}

	return <RegisterForm />
}
