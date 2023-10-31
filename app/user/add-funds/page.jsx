'use client'
import { useAuth } from 'hooks/auth'
import { useRouter } from 'next/navigation'
import NavSection from '@/dashboard/NavSection'
import AddFunds from '@/AddFunds/AddFunds'
import axios from 'lib/axios'
import ErrorPage from 'next/error'
import { useEffect, useState } from 'react'
import VerifyEmailModal from '@/../components/VerifyEmailModal'

export default () => {
	const router = useRouter()
	const { user } = useAuth()
	const [isFeteched, setIsFeteched] = useState(false);
	const [methods, setMethods] = useState([])
	const [selected, setSelected] = useState();
	const fetchPaymentMethods = () => {
		setIsFeteched(false)
		axios.get('/payment/gateways').then(({ data }) => {
			setMethods(data);
			setSelected(data[0]?.cardHolder);
			setIsFeteched(true)
		})
	}
	
	useEffect(() => {
		if (user === '') {
			router.push('/login')
		} else {
			fetchPaymentMethods()
		}
	}, [])
	
	if (user === '') {
		return <ErrorPage title="Unauthorized" statusCode={401} />
	}

	return (
		<>
			<NavSection selected={'Funds'}/>
			<section className="mx-auto max-w-5xl py-5">
				<h2 className="text-center text-2xl font-bold">
					Add Funds to your Wallet
				</h2>
				<p className="text-center text-base mb-10">
					Funds added to your wallet will be available for placing
					orders.
				</p>
				<AddFunds 
					methods={methods} 
					selected={selected} 
					setSelected={setSelected} 
					isFeteched={isFeteched}
					fetchPaymentMethods={fetchPaymentMethods}
				/>
				<VerifyEmailModal />
			</section>
		</>
	)
}
