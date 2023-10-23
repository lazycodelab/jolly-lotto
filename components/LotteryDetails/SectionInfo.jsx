import Image from 'next/image'

export default ({ lotteryType , details}) => {
	return (
		<section className={`mt-10 px-6 py-10 ${lotteryType.primaryColor}`}>
			<div className="mx-auto flex flex-wrap justify-between md:max-w-6xl md:flex-nowrap md:gap-x-5">
				<div className="md:max-w-xl md:flex-1">
					<h2 className="text-2xl font-semibold text-teal-600">
						Experience {details.lotteryName} Oldest National Lottery
					</h2>
					<p className="text-sm text-cyan-900">
						Step into the world of Australia&apos;s oldest national
						lottery with a unique twist! Select 6 numbers from 1-45
						and unlock the potential to win incredible jackpots of
						up to A$40 million!
					</p>
					<div className="mt-5 space-y-8 md:space-y-11">
						<div className="flex items-start gap-x-3 md:items-center md:gap-x-5">
							<Image
								src="/images/draw-list-icon1.svg"
								alt="icon"
								width={64}
								height={64}
							/>
							<div>
								<h3 className="text-lg font-semibold text-teal-600">
									Drawn in Melbourne Every Saturday at 8:30PM
									AEST
								</h3>
								<p className="pt-0.5 text-sm text-cyan-900">
									Mark your calendars for the thrilling draws
									held in Melbourne every Saturday at 8:30 PM
									AEST. Remember, your presence in the game is
									the key to winning it all! Enjoy Increased
									Chances of Winning the Jackpot
								</p>
							</div>
						</div>
						<div className="flex items-start gap-x-3 md:items-center md:gap-x-5">
							<Image
								src="/images/draw-list-icon1.svg"
								alt="icon"
								width={64}
								height={64}
							/>
							<div>
								<h3 className="text-lg font-semibold text-teal-600">
									Enjoy Increased Chances of Winning the
									Jackpot
								</h3>
								<p className="pt-0.5 text-sm text-cyan-900">
									Unlike standard 6/49 lotteries, Australian
									Lotto 6/45 offers a smaller range of
									numbers, making it 42% easier to hit the
									jackpot. Don&apos;t miss this opportunity to
									boost your odds and claim your share of the
									prize!
								</p>
							</div>
						</div>
						<div className="flex items-start gap-x-3 md:items-center md:gap-x-5">
							<Image
								src="/images/draw-list-icon1.svg"
								alt="icon"
								width={64}
								height={64}
							/>
							<div>
								<h3 className="text-lg font-semibold text-teal-600">
									Jackpots Starting at A$5 Million
								</h3>
								<p className="pt-0.5 text-sm text-cyan-900">
									Embark on an exciting journey towards wealth
									with jackpots starting at A$5 million. The
									best part? All winnings are completely
									tax-free in Australia! Good luck as you
									seize the chance to transform your life!
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full md:max-w-xl md:flex-1">
					<Image
						src="/images/oz-doc-img.png"
						className="hidden md:block"
						width={600}
						height={250}
						alt="ban"
					/>
					<div className="mt-8 divide-y divide-black border-b border-t border-black">
						<details className="cursor-pointer px-3 py-4">
							<summary>Lotto Facts</summary>

							<ul className="px-5 pt-5">
								<li>
									<strong>Jackpot Record:</strong> A$40
									Million
								</li>
								<li>
									<strong>Prizes:</strong> Discover a Wealth
									of Rewards Across 6 Lucrative Prize
									Categories Draw
								</li>
								<li>
									<strong>Info:</strong> A Combination of 6
									main numbers and 2 supplementary numbers
									drawn from a range of 1 to 45 Days Drawn:
									Every Saturday 8:30pm AEST Ticket Purchase
									Deadline: Get your tickets 2 hours before
									the draw
								</li>
							</ul>
						</details>
						<details className="cursor-pointer px-3 py-4">
							<summary>10 Prize Categories</summary>
							<div className="mt-5">
								<p>
									The table below details the different prize
									tiers and estimated prize returns based on
									average payouts.
								</p>
								<div className="grid grid-cols-3">
									<div className="col-xs-6 lottoDetailHeader">
										Prize Structure
									</div>
									<div className="col-xs-3 lottoDetailHeader">
										Prize Categories
									</div>
									<div className="col-xs-3 lottoDetailHeader oddsAmount">
										Average Payout*
									</div>
								</div>
								<div className="row">
									<div className="col-xs-12 col-sm-6">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Prize Structure
										</div>
										<div className="col-xs-6 col-sm-12">
											6 main numbers
										</div>
									</div>
									<div className="col-xs-12 col-sm-3">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Prize Category
										</div>
										<div className="col-xs-6 col-sm-12">
											Jackpot
										</div>
									</div>
									<div className="col-xs-12 col-sm-3">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Average Payout*
										</div>
										<div className="col-xs-6 col-sm-12 oddsAmount">
											A$1,431,237.99
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-xs-12 col-sm-6">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Prize Structure
										</div>
										<div className="col-xs-6 col-sm-12">
											5 main numbers + 1 bonus number
										</div>
									</div>
									<div className="col-xs-12 col-sm-3">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Prize Category
										</div>
										<div className="col-xs-6 col-sm-12">
											Second Prize
										</div>
									</div>
									<div className="col-xs-12 col-sm-3">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Average Payout*
										</div>
										<div className="col-xs-6 col-sm-12 oddsAmount">
											A$10,278.81
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-xs-12 col-sm-6">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Prize Structure
										</div>
										<div className="col-xs-6 col-sm-12">
											5 main numbers
										</div>
									</div>
									<div className="col-xs-12 col-sm-3">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Prize Category
										</div>
										<div className="col-xs-6 col-sm-12">
											Third Prize
										</div>
									</div>
									<div className="col-xs-12 col-sm-3">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Average Payout*
										</div>
										<div className="col-xs-6 col-sm-12 oddsAmount">
											A$839.69
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-xs-12 col-sm-6">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Prize Structure
										</div>
										<div className="col-xs-6 col-sm-12">
											4 main numbers
										</div>
									</div>
									<div className="col-xs-12 col-sm-3">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Prize Category
										</div>
										<div className="col-xs-6 col-sm-12">
											Fourth Prize
										</div>
									</div>
									<div className="col-xs-12 col-sm-3">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Average Payout*
										</div>
										<div className="col-xs-6 col-sm-12 oddsAmount">
											A$24.75
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-xs-12 col-sm-6">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Prize Structure
										</div>
										<div className="col-xs-6 col-sm-12">
											3 main numbers + 1 bonus number
										</div>
									</div>
									<div className="col-xs-12 col-sm-3">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Prize Category
										</div>
										<div className="col-xs-6 col-sm-12">
											Fifth Prize
										</div>
									</div>
									<div className="col-xs-12 col-sm-3">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Average Payout*
										</div>
										<div className="col-xs-6 col-sm-12 oddsAmount">
											A$15.75
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-xs-12 col-sm-6">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Prize Structure
										</div>
										<div className="col-xs-6 col-sm-12">
											3 main numbers
										</div>
									</div>
									<div className="col-xs-12 col-sm-3">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Prize Category
										</div>
										<div className="col-xs-6 col-sm-12">
											Sixth Prize
										</div>
									</div>
									<div className="col-xs-12 col-sm-3">
										<div className="col-xs-6 lotteryDetailOddsMobile">
											Average Payout*
										</div>
										<div className="col-xs-6 col-sm-12 oddsAmount">
											A$8.35
										</div>
									</div>
								</div>
								<p id="lotteryOddsNote">
									* based on 2022 results
								</p>
							</div>
						</details>
						<details className="cursor-pointer px-3 py-4">
							<summary>Why Choose {details.lotteryName}?</summary>
							<div className="px-5 pt-5">
								<strong>
									Step into the World of Australian Lotto 6/45
								</strong>
								<p>
									With a rich history dating back to 1972,
									Australian Lotto 6/45 became a nationwide
									sensation in 2013. Select 6 numbers from a
									smaller pool of 45 (instead of the more
									common 49) and open the door to winning
									prizes of up to A$40 Million!
								</p>
								<strong className="mt-5 block">
									Saturday Night Draws
								</strong>
								<p>
									The thrill unfolds every Saturday night as
									the winning numbers are revealed. Match the
									six main numbers, and you&apos;ll secure the
									coveted jackpot prize. Best of all, all
									winnings are tax-free in Australia!
								</p>
								<strong className="mt-5 block">
									Enhanced Jackpot Odds Experience
								</strong>
								<p>
									Improved Chances for the Jackpot The odds of
									hitting the 6/45 jackpot stand at an
									enticing one in 8,145,060, surpassing the
									odds of 1 in 13,983,816 in 6/49 lotteries.
									The overall odds of winning any prize are a
									promising 1 in 42.
								</p>
								<p>
									Best of Luck! We&apos;re here to guide you
									towards the opportunity of winning
									life-changing prizes. Good luck as you
									embark on this exhilarating journey!
								</p>
							</div>
						</details>
					</div>
				</div>
			</div>
		</section>
	)
}
