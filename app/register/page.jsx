'use client'
import RegisterForm from '../../components/Auth/RegisterForm'
import Layout from '../../components/Layout'
import Head from 'next/head'
import { useAuth } from '../../hooks/auth'
import { useRouter } from 'next/navigation'

export default () => {
	const { user } = useAuth()
	const router = useRouter()

	if (user && user.statusCode === 200) {
		router.push('/user/dashboard')
	}

	return <RegisterForm />
}
