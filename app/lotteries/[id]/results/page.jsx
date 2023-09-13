'use client'
import SectionHero from '@/LotteryDetails/SectionHero'
import SectionResults from '@/LotteryDetails/SectionResults'
import Link from 'next/link'

import classNames from 'classnames'
import { getAllProducts, getLotteryResults, getProductByID } from 'lib/api'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const lotteryTypes = {
	CA: {
		logo: '/images/lotteries/CA.png',
		primaryColor: 'bg-[#ffe8e8]',
		secondaryColor: 'bg-[#ffe8e8]/50',
	},
	ES: {
		logo: '/images/lotteries/ES.png',
		primaryColor: 'bg-[#e3f1ff]',
		secondaryColor: 'bg-[#e3f1ff]/50',
	},
	AU: {
		logo: '/images/lotteries/AU.png',
		primaryColor: 'bg-[#fffdde]',
		secondaryColor: 'bg-[#fffdde]/50',
	},
}

export default ({ params }) => {
	const router = useRouter()
	const [activeTab, setActiveTab] = useState('results')

	//if (!router.isFallback) {
	//	return (
	//		<ErrorPage
	//			title="Data not available for this product"
	//			statusCode={404}
	//		/>
	//	)
	//}

	const [details, setDetails] = useState()
	const [results, setResults] = useState('')
	const [lotteryType, setLotteryType] = useState()

	useEffect(() => {
		const fetchProductData = async id => {
			const d = await getProductByID(id)
			const lotteryType = d.lottery.country_code
			setLotteryType(lotteryTypes[lotteryType])
			setDetails(d)

			const results = await getLotteryResults(d.lottery.id)
			setResults(results)
		}

		fetchProductData(params.id)
	}, [])

	return (
		details ? (
			<>
				<SectionHero lotteryType={lotteryType} details={details} />
				<div className={lotteryType.secondaryColor}>
					<div className="container mx-auto flex max-w-6xl items-center">
                        <Link href={`/lotteries/${params.id}`}>
                            <span className='cursor-pointer border-b-2 px-12 py-3 text-center text-base font-semibold text-cyan-900 border-orange-50'>
                                Single Play
                            </span>
                        </Link>
						{details?.type === 5 && (
							<span
								className={classNames(
									'cursor-pointer border-b-2 px-12 py-3 text-center text-base font-semibold text-cyan-900',
									{
										'border-cyan-900':
											activeTab === 'syndicate',
										'border-orange-50':
											activeTab !== 'syndicate',
									},
								)}
								onClick={() => setActiveTab('syndicate')}>
								Syndicate Play
							</span>
						)}
						<span
							className='cursor-pointer border-b-2 px-12 py-3 text-center text-base font-semibold text-cyan-900 border-cyan-900'>
							Results
						</span>
					</div>
				</div>

				{results !== '' ? (
                	<SectionResults results={results} details={details} />
				)  : (
					<div className="container mx-auto flex justify-center max-w-6xl items-center">
						<svg className="animate-spin h-8 w-8 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle className="opacity-10" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
							<path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						<h1 className="text-4xl font-bold text-gray-900 my-40">
							Loading...
						</h1>
					</div>
				)
				}
			</>
		) : (
			<div className="container mx-auto flex justify-center max-w-6xl items-center">
				<svg className="animate-spin h-8 w-8 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle className="opacity-10" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
					<path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				<h1 className="text-4xl font-bold text-gray-900 my-40">
					Loading...
				</h1>
			</div>
		)
	)
}

