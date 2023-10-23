'use client'
import SectionHero from '@/LotteryDetails/SectionHero'
import SectionInfo from '@/LotteryDetails/SectionInfo'
import SectionLotteryCards from '@/LotteryDetails/SectionLotteryCards'
import SectionSyndicate from '@/LotteryDetails/SectionSyndicate'

import Link from 'next/link'
import classNames from 'classnames'
import axios from 'lib/axios'
import { getProductByID } from 'lib/api'
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
	const [activeTab, setActiveTab] = useState('cards')
	const [details, setDetails] = useState()
	const [savedDetails , setSavedDetails] = useState()
	const [fetching, setFetching] = useState(true)
	const [lotteryType, setLotteryType] = useState()

	useEffect(() => {
		const fetchProductData = async id => {
			const d = await getProductByID(id)
			const lotteryType = d.lottery.country_code
			setLotteryType(lotteryTypes[lotteryType])
			// Removing bonus ball from the data for 6/49
			if (d.id === 2) delete d.lottery.balls.bonus;
			setDetails(d)
			fetchSavedProductDetails()
		}

		const fetchSavedProductDetails = async () => {
			axios.get('/getSavedProductDetails').then((res) => {
				if (res.data) {
					setSavedDetails(res.data[params.id])
				}
				setFetching(false);
			}).catch((err) => console.log(err));
		}

		fetchProductData(params.id)
	}, [])

	return (
		!fetching ? (
			<>
				<SectionHero lotteryType={lotteryType} details={details} />
				<div className={lotteryType.secondaryColor}>
					<div className="container mx-auto flex max-w-6xl items-center">
						<span
							className={classNames(
								'cursor-pointer border-b-2 px-12 py-3 text-center text-base font-semibold text-cyan-900',
								{
									'border-cyan-900': activeTab === 'cards',
									'border-orange-50': activeTab !== 'cards',
								},
							)}
							onClick={() => setActiveTab('cards')}>
							Single Play
						</span>
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
						<Link href={`/lotteries/${params.id}/results`}>
							<span className='cursor-pointer border-b-2 px-12 py-3 text-center text-base font-semibold text-cyan-900 border-orange-50'>
								Results
							</span>
						</Link>			
					</div>
				</div>

				{activeTab === 'cards' ? (
					<SectionLotteryCards details={details} savedDetails={savedDetails} />
				) : details?.type === 5 &&
					details?.lottery?.syndicate_data &&
					activeTab === 'syndicate' ? (
					<SectionSyndicate
						isSuper={details?.lottery?.syndicate_type}
						data={details?.lottery?.syndicate_data}
					/>
				) : null}

				<SectionInfo lotteryType={lotteryType} details={details}/>
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