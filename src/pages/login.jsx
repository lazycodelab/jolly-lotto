import React from 'react'
import Layout from '@/components/Layout'
import Head from 'next/head'
import LoginForm from '@/components/Auth/LoginForm'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/auth'

export default () => {
	const { user } = useAuth()
	const router = useRouter()

	if (user && user.statusCode === 200) {
		router.push('/user/dashboard')
	}

	return (
		<Layout className={'flex bg-teal-50'}>
			<Head>
				<title>Login</title>
			</Head>
			<LoginForm />
		</Layout>
	)
}
