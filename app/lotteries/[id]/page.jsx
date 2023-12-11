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
		logo: '/images/lotteries/CA_S.png',
		primaryColor: 'bg-[#ffe8e8]',
		secondaryColor: 'bg-[#ffe8e8]/50',
		experience: {
			heading:
				"Experience the Canadian Lotto 6/49 - Canada's Favourite Lottery",
			description:
				"Step into the Canadian Lotto 6/49 Experience. Join the ranks of hopefuls in Canada's beloved Lotto 6/49. With a starting jackpot of CAD $5 million and draws twice a week, this is where dreams have the chance to become reality.",
			points: [
				{
					heading: 'Draws Every Wednesday and Saturday',
					content:
						'Experience the thrill twice a week, with draws on Wednesday and Saturday. Be part of a national pastime that unites hopefuls from coast to coast in anticipation.',
				},
				{
					heading: 'Improved Odds of Winning',
					content:
						'The Canadian Lotto 6/49 is designed to give players better odds of winning the jackpot compared to many other lotteries, making it a popular choice for lottery enthusiasts.',
				},
				{
					heading: 'Record-Breaking Jackpots',
					content:
						'The Lotto 6/49 is no stranger to record jackpots, with the largest in its history reaching a monumental CAD $64 million, and more recently, a staggering CAD $68 million',
				},
			],
		},
		facts: [
			'<p><strong>Record Jackpot:</strong> CAD $68 million​​​​.</p>',
			'<p><strong>Prize Allocation:</strong> Multiple prize levels from matching just 2 numbers, up to the jackpot for matching all 6.</p>',
			'<p><strong>Draw Format:</strong> Choose 6 numbers from a pool of 1-49. The bonus number can turn a smaller win into a big prize.</p>',
			'<p><strong>Ticket Purchase Deadline:</strong> Get your tickets before the draw to secure your chance at winning.</p>',
		],
		prize: '<table><caption>Canadian 6/49 Lottery Draw Results</caption><thead><tr><th>Matched Numbers</th><th>Prize Category</th><th>Winners</th><th>Prize Per Winner</th></tr></thead><tbody><tr><td>6</td><td>Jackpot</td><td>1</td><td>Jackpot: CAD $5 Million</td></tr><tr><td>5 + Bonus</td><td>Second Prize</td><td>2</td><td>CAD $100,000</td></tr><tr><td>5</td><td>Third Prize</td><td>10</td><td>CAD $2,000</td></tr><tr><td>4</td><td>Fourth Prize</td><td>200</td><td>CAD $100</td></tr><tr><td>3</td><td>Fifth Prize</td><td>2,000</td><td>CAD $10</td></tr><tr><td>2 + Bonus</td><td>Sixth Prize</td><td>20,000</td><td>CAD $5</td></tr><tr><td>2</td><td>Free Play</td><td>100,000</td><td>One Free Play</td></tr></tbody><tfoot><tr><td colspan="4" class="note">*These figures are hypothetical and are provided for illustrative purposes only.</td></tr></tfoot></table>',
		'why-choose': [
			"<p><strong>A Legacy of Winning</strong><br />The Canadian Lotto 6/49, with its rich history dating back to its first draw, offers more than just a chance to win; it's a piece of Canadian heritage.</p>",

			'<p><strong>Bi-Weekly Draw Excitement</strong><br />The suspense peaks every Wednesday and Saturday as the country awaits the announcement of the winning numbers, hoping to match all six for the grand jackpot.</p>',

			"<p><strong>Favorable Chances</strong><br />Offering some of the best odds among national lotteries, the Canadian Lotto 6/49 makes winning feel within reach, whether it's the jackpot or one of the many prizes.</p>",

			"<p><strong>A Fortune to Be Had</strong><br />With record jackpots like the CAD $68 million prize, the Lotto 6/49 has the power to change lives in an instant. It's more than a lottery; it's a gateway to new possibilities</p>",
		],
	},
	ES: {
		logo: '/images/lotteries/ES_S.png',
		primaryColor: 'bg-[#e3f1ff]',
		secondaryColor: 'bg-[#e3f1ff]/50',
		experience: {
			heading: 'Experience EuroMillions',
			description:
				'Step into the world of EuroMillions, where massive jackpots meet accessible winning chances. Select 5 winning numbers and 2 ‘Lucky Stars’ for a shot at claiming up to €230 Million in prizes!',
			points: [
				{
					heading: 'Dual Weekly Draws',
					content:
						'Get swept up in the EuroMillions excitement with opportunities to win every Tuesday and Friday, adding a spark of anticipation to your week.',
				},
				{
					heading: 'Favorable Chances to Win',
					content:
						'With winning odds better than 1 in 13, every entry is a hopeful journey towards a prize.',
				},
				{
					heading: 'Rising Jackpots',
					content:
						'Observe as the jackpots ascend, regularly reaching beyond the €100 Million threshold, igniting dreams of fortune.',
				},
			],
		},
		facts: [
			'<p><strong>Peak EuroMillions Jackpot:</strong> As high as €230 Million</p>',
			'<p><strong>Prize Allocation:</strong> 13 rewarding prize categories</p>',
			'<p><strong>Selection Process:</strong> Choose 5 primary numbers from a set of 1 - 50, and 2 ‘Lucky Stars’ from a pool of 1 - 12. Don’t miss the separate raffle draw with its own €1 Million prize</p>',
			'<p><strong>Draw Moments:</strong> Draws happening live every Tuesday and Friday in Paris, France at 21:00 CET</p>',
			'<p><strong>Purchase Cut - Off:</strong> Ensure your participation by getting your ticket 6 hours before the draw.</p>',
		],
		prize: '<table><caption>EuroMillions Draw Results</caption><thead><tr><th>Matched Numbers</th><th>Prize Category</th><th>Winners</th><th>Prize Per Winner</th></tr></thead><tbody><tr><td>5 + 2 Lucky Stars</td><td>Jackpot</td><td>1</td><td>Jackpot: €89 Million</td></tr><tr><td>5 + 1 Lucky Star</td><td>Second Prize</td><td>2</td><td>€500,000</td></tr><tr><td>5</td><td>Third Prize</td><td>5</td><td>€100,000</td></tr><tr><td>4 + 2 Lucky Stars</td><td>Fourth Prize</td><td>20</td><td>€2,500</td></tr><tr><td>4 + 1 Lucky Star</td><td>Fifth Prize</td><td>100</td><td>€150</td></tr><tr><td>4</td><td>Sixth Prize</td><td>200</td><td>€100</td></tr><tr><td>3 + 2 Lucky Stars</td><td>Seventh Prize</td><td>1,000</td><td>€50</td></tr><tr><td>3 + 1 Lucky Star</td><td>Eighth Prize</td><td>2,500</td><td>€20</td></tr><tr><td>3</td><td>Ninth Prize</td><td>5,000</td><td>€15</td></tr><tr><td>2 + 2 Lucky Stars</td><td>Tenth Prize</td><td>10,000</td><td>€10</td></tr><tr><td>2 + 1 Lucky Star</td><td>Eleventh Prize</td><td>20,000</td><td>€8</td></tr><tr><td>2</td><td>Twelfth Prize</td><td>50,000</td><td>€4</td></tr><tr><td>1 + 2 Lucky Stars</td><td>Thirteenth Prize</td><td>100,000</td><td>€2</td></tr></tbody><tfoot><tr><td colspan="4" class="note">*These figures are hypothetical and are provided for illustrative purposes only.</td></tr></tfoot></table>',
		'why-choose': [
			"<p><strong>Immerse Yourself in the EuroMillions Legacy</strong><br />EuroMillions has established itself as a prestigious lottery since its inception, captivating players across the continent. Select 5 main numbers from a range of 1-50 and 2 'Lucky Stars' from 1-12, and be in the running for grand prizes that can rise to an astonishing €230 Million!</p>",

			'<p><strong>Bi-Weekly Draw Excitement</strong><br /> Feel the exhilaration as EuroMillions draws unfold every Tuesday and Friday night. Matching all 5 main numbers along with the 2 "Lucky Stars" could see you walking away with a life-altering jackpot.</p>',

			'<p><strong>Superior Odds for the Jackpot</strong><br /> The design of EuroMillions enhances your chances of winning the jackpot, with odds now standing at 1 in 139,838,160 for the top prize. While these odds reflect the challenge in securing the jackpot, the overall odds of winning any prize with EuroMillions are a reassuring 1 in 13, offering plenty of chances for a win.</p>',

			"<p><strong>Your Gateway to Fortune</strong><br /> We're committed to providing you with an enjoyable and potentially lucrative lottery experience. As you venture into the game, remember that every ticket holds the possibility of changing your life. Best of luck!</p>",
		],
	},
	AU: {
		logo: '/images/lotteries/AU_S.png',
		primaryColor: 'bg-[#fffdde]',
		secondaryColor: 'bg-[#fffdde]/50',
		experience: {
			heading: 'Experience AUSTRALIAN LOTTO 6/45 Oldest National Lottery',
			description:
				"Step into the world of AUSTRALIAN LOTTO 6/45's oldest national lottery with a unique twist! Select 6 numbers from 1-45 and unlock the potential to win incredible jackpots of up to $0.39 million!",
			points: [
				{
					heading: 'Drawn in Melbourne Every Saturday at 8:30PM AEST',
					content:
						'Mark your calendars for the thrilling draws held in Melbourne every Saturday at 8:30 PM AEST. Remember, your presence in the game is the key to winning it all! Enjoy Increased Chances of Winning the Jackpot',
				},
				{
					heading: 'Enjoy Increased Chances of Winning the Jackpot',
					content:
						"Unlike standard 6/49 lotteries, AUSTRALIAN LOTTO 6/45 offers a smaller range of numbers, making it 42% easier to hit the jackpot. Don't miss this opportunity to boost your odds and claim your share of the prize!",
				},
				{
					heading: 'Jackpots Starting at $0.39 Million',
					content:
						'Embark on an exciting journey towards wealth with jackpots starting at $0.39 million. The best part? All winnings are completely tax-free in Australia! Good luck as you seize the chance to transform your life!',
				},
			],
		},
		facts: [
			'<p><strong>Jackpot Record:</strong> $0.39 Million</p>',
			'<p><strong>Prize Allocation:</strong> Discover a Wealth of Rewards Across 6 Lucrative Prize Categories Draw</p>',
			'<p><strong>Info:</strong> A Combination of 6 main numbers and 2 supplementary numbers drawn from a range of 1 to 45 Days Drawn: Every Saturday 8:30pm AEST Ticket Purchase Deadline: Get your tickets 2 hours before the draw</p>',
		],
		prize: '<table><caption>AUSTRALIAN LOTTO 6/45 Draw Results</caption><thead><tr><th>Matched Numbers</th><th>Prize Category</th><th>Winners</th><th>Prize Per Winner</th></tr></thead><tbody><tr><td>5 + 2 Lucky Stars</td><td>Jackpot</td><td>1</td><td>Jackpot: €89 Million</td></tr><tr><td>5 + 1 Lucky Star</td><td>Second Prize</td><td>2</td><td>€500,000</td></tr><tr><td>5</td><td>Third Prize</td><td>5</td><td>€100,000</td></tr><tr><td>4 + 2 Lucky Stars</td><td>Fourth Prize</td><td>20</td><td>€2,500</td></tr><tr><td>4 + 1 Lucky Star</td><td>Fifth Prize</td><td>100</td><td>€150</td></tr><tr><td>4</td><td>Sixth Prize</td><td>200</td><td>€100</td></tr><tr><td>3 + 2 Lucky Stars</td><td>Seventh Prize</td><td>1,000</td><td>€50</td></tr><tr><td>3 + 1 Lucky Star</td><td>Eighth Prize</td><td>2,500</td><td>€20</td></tr><tr><td>3</td><td>Ninth Prize</td><td>5,000</td><td>€15</td></tr><tr><td>2 + 2 Lucky Stars</td><td>Tenth Prize</td><td>10,000</td><td>€10</td></tr><tr><td>2 + 1 Lucky Star</td><td>Eleventh Prize</td><td>20,000</td><td>€8</td></tr><tr><td>2</td><td>Twelfth Prize</td><td>50,000</td><td>€4</td></tr><tr><td>1 + 2 Lucky Stars</td><td>Thirteenth Prize</td><td>100,000</td><td>€2</td></tr></tbody><tfoot><tr><td colspan="4" class="note">*These figures are hypothetical and are provided for illustrative purposes only.</td></tr></tfoot></table>',
		'why-choose': [
			'<p><strong>Step into the World of AUSTRALIAN LOTTO 6/45</strong><br />With a rich history dating back to 1972, AUSTRALIAN LOTTO 6/45 became a nationwide sensation in 2013. Select 6 numbers from a smaller pool of 45 (instead of the more common 49) and open the door to winning prizes of up to $0.39 Million!</p>',

			"<p><strong>Saturday Night Draws</strong><br /> The thrill unfolds every Saturday night as the winning numbers are revealed. Match the six main numbers, and you'll secure the coveted jackpot prize. Best of all, all winnings are tax-free in Australia!</p>",

			'<p><strong>Enhanced Jackpot Odds Experience</strong><br /> Improved Chances for the Jackpot The odds of hitting the 6/45 jackpot stand at an enticing one in 8,145,060, surpassing the odds of 1 in 13,983,816 in 6/49 lotteries. The overall odds of winning any prize are a promising 1 in 42.</p>',

			"<p>Best of Luck! We're here to guide you towards the opportunity of winning life-changing prizes. Good luck as you embark on this exhilarating journey!</p>",
		],
	},
}

export default ({ params }) => {
	const [activeTab, setActiveTab] = useState('cards')
	const [details, setDetails] = useState()
	const [savedDetails, setSavedDetails] = useState()
	const [fetching, setFetching] = useState(true)
	const [lotteryType, setLotteryType] = useState()

	useEffect(() => {
		const fetchProductData = async id => {
			const d = await getProductByID(id)
			const lotteryType = d.lottery.country_code
			setLotteryType(lotteryTypes[lotteryType])
			// Removing bonus ball from the data for 6/49
			if (d.id === 2) delete d.lottery.balls.bonus
			setDetails(d)
			fetchSavedProductDetails()
		}

		const fetchSavedProductDetails = async () => {
			axios
				.get('/getSavedProductDetails')
				.then(res => {
					if (res.data) {
						setSavedDetails(res.data[params.id])
					}
					setFetching(false)
				})
				.catch(err => console.log(err))
		}

		fetchProductData(params.id)
	}, [])

	return !fetching ? (
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
						<span className="cursor-pointer border-b-2 px-12 py-3 text-center text-base font-semibold text-cyan-900 border-orange-50">
							Results
						</span>
					</Link>
				</div>
			</div>

			{activeTab === 'cards' ? (
				<SectionLotteryCards
					details={details}
					savedDetails={savedDetails}
				/>
			) : details?.type === 5 &&
			  details?.lottery?.syndicate_data &&
			  activeTab === 'syndicate' ? (
				<SectionSyndicate
					isSuper={details?.lottery?.syndicate_type}
					data={details?.lottery?.syndicate_data}
				/>
			) : null}

			<SectionInfo lotteryType={lotteryType} details={details} />
		</>
	) : (
		<div className="container mx-auto flex justify-center max-w-6xl items-center">
			<svg
				className="animate-spin h-8 w-8 mr-3"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24">
				<circle
					className="opacity-10"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="4"></circle>
				<path
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
			<h1 className="text-4xl font-bold text-gray-900 my-40">
				Loading...
			</h1>
		</div>
	)
}
