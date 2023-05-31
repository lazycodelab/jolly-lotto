import SectionHero from '@/components/LotteryDetails/SectionHero'
import SectionInfo from '@/components/LotteryDetails/SectionInfo'
import SectionLotteryCards from '@/components/LotteryDetails/SectionLotteryCards'
import SectionResults from '@/components/LotteryDetails/SectionResults'
import { getLotteryResults, getProductByID, getAllProducts } from '@/lib/api'
import classNames from 'classnames'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ErrorPage from 'next/error'
import Layout from '@/components/Layout'
import SectionSyndicate from '@/components/LotteryDetails/SectionSyndicate'

export default ({ details, results }) => {
	const router = useRouter()
	const [activeTab, setActiveTab] = useState('cards')

	if (!router.isFallback && !details?.lottery) {
		return (
			<ErrorPage
				title="Data not available for this product"
				statusCode={404}
			/>
		)
	}

	return (
		<Layout>
			<Head>
				<title>Lottery Details</title>
			</Head>

			<SectionHero details={details} />

			<div className="container mx-auto flex max-w-6xl items-center bg-orange-50">
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
								'border-cyan-900': activeTab === 'syndicate',
								'border-orange-50': activeTab !== 'syndicate',
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
			<SectionInfo />
		</Layout>
	)
}

export const getStaticProps = async ({ params }) => {
	let results = {}
	const details = await getProductByID(params.id)

	results = details?.lottery
		? await getLotteryResults(details?.lottery?.id)
		: results

	return {
		props: { details, results },
	}
}

export const getStaticPaths = async () => {
	//const posts = await getSingleProducts()
	const products = await getAllProducts()

	return {
		paths: products.map(post => `/lotteries/${post.id}`) || [],
		fallback: true,
	}
}
