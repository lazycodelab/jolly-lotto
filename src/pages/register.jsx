import React from 'react'
import RegisterForm from '@/components/Auth/RegisterForm'
import Layout from '@/components/Layout'
import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'

export default () => {
	const { user } = useAuth()
	const router = useRouter()

	if (user && user.statusCode === 200) {
		router.push('/user/dashboard')
	}

	return (
		<Layout className={'flex bg-teal-50'}>
			<Head>
				<title>Register With Us</title>
			</Head>
			<RegisterForm />
		</Layout>
	)
}
