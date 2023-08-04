'use client'
import SectionHero from '@/LotteryDetails/SectionHero'
import SectionInfo from '@/LotteryDetails/SectionInfo'
import SectionLotteryCards from '@/LotteryDetails/SectionLotteryCards'
import SectionResults from '@/LotteryDetails/SectionResults'
import SectionSyndicate from '@/LotteryDetails/SectionSyndicate'

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
	const [activeTab, setActiveTab] = useState('cards')

	//if (!router.isFallback) {
	//	return (
	//		<ErrorPage
	//			title="Data not available for this product"
	//			statusCode={404}
	//		/>
	//	)
	//}

	const [details, setDetails] = useState()
	const [results, setResults] = useState({})
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

		//results = details?.lottery
		//	? await getLotteryResults(details?.lottery?.id)
		//	: results
	}, [])

	return (
		details && (
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
						<span
							className={classNames(
								'cursor-pointer border-b-2 px-12 py-3 text-center text-base font-semibold text-cyan-900',
								{
									'border-cyan-900': activeTab === 'results',
									'border-orange-50': activeTab !== 'results',
								},
							)}
							onClick={() => setActiveTab('results')}>
							Results
						</span>
					</div>
				</div>

				{activeTab === 'cards' ? (
					<SectionLotteryCards details={details} />
				) : details?.type === 5 &&
					details?.lottery?.syndicate_data &&
					activeTab === 'syndicate' ? (
					<SectionSyndicate
						isSuper={details?.lottery?.syndicate_type}
						data={details?.lottery?.syndicate_data}
					/>
				) : (
					<SectionResults results={results} />
				)}
				<SectionInfo lotteryType={lotteryType} />
			</>
		)
	)
}

//export const getStaticProps = async ({ params }) => {
//	let results = {}
//	const details = await getProductByID(params.id)

//	results = details?.lottery
//		? await getLotteryResults(details?.lottery?.id)
//		: results

//	return {
//		props: { details, results },
//	}
//}

//export const getStaticPaths = async () => {
//	//const posts = await getSingleProducts()
//	const products = await getAllProducts()

//	return {
//		paths: products.map(post => `/lotteries/${post.id}`) || [],
//		fallback: true,
//	}
//}
