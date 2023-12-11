import Image from 'next/image'

export default ({ lotteryType, details }) => {
	return (
		<section className={`mt-10 px-6 py-10 ${lotteryType.primaryColor}`}>
			<div className="mx-auto flex flex-wrap justify-between md:max-w-6xl md:flex-nowrap md:gap-x-5">
				<div className="md:max-w-xl md:flex-1">
					<h2 className="text-2xl font-semibold text-teal-600">
						{lotteryType.experience.heading}
					</h2>
					<p className="text-sm text-cyan-900">
						{lotteryType.experience.description}
					</p>
					<div className="mt-5 space-y-8 md:space-y-11">
						{lotteryType.experience.points.map(point => (
							<div className="flex items-start gap-x-3 md:items-center md:gap-x-5">
								<Image
									src="/images/draw-list-icon1.svg"
									alt="icon"
									width={64}
									height={64}
								/>
								<div>
									<h3 className="text-lg font-semibold text-teal-600">
										{point.heading}
									</h3>
									<p className="pt-0.5 text-sm text-cyan-900">
										{point.content}
									</p>
								</div>
							</div>
						))}
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
								{lotteryType.facts.map(fact => (
									<li
										dangerouslySetInnerHTML={{
											__html: fact,
										}}
									/>
								))}
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
								<div
									dangerouslySetInnerHTML={{
										__html: lotteryType.prize,
									}}
								/>
							</div>
						</details>
						<details className="cursor-pointer px-3 py-4">
							<summary>Why Choose {details.lotteryName}?</summary>
							<div className="px-5 pt-5 space-y-5">
								{lotteryType['why-choose'].map(reason => (
									<div
										dangerouslySetInnerHTML={{
											__html: reason,
										}}
									/>
								))}
							</div>
						</details>
					</div>
				</div>
			</div>
		</section>
	)
}
