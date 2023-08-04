import IconUserGroup from "@/Icons/IconUserGroup"
import SharesQtyInput from "./SharesQtyInput"
import IconUserGroupAdd from "@/Icons/IconUserGroupAdd"

export default ({ isSuper, data }) => {
	return (
		<section className="container mx-auto mt-8 max-w-6xl">
			<h2 className="text-2xl font-semibold text-teal-600">
				Play German Lotto Single Play
			</h2>
			<h6 className="text-sm text-cyan-900">German Lotto Single Play</h6>

			<div className="mt-10">
				<p className="text-base">Select Number of Shares</p>

				<div className="flex items-center justify-center gap-x-4">
					{isSuper === 1 ? (
						<div className="max-w-xs rounded border border-teal-600 bg-cyan-50">
							<header className="relative flex items-center gap-x-3 bg-teal-600 px-5 py-2 text-white">
								<span className="absolute -top-4 right-3 bg-green-500 px-2 py-1 text-sm text-white shadow-md">
									Best Value
								</span>
								<IconUserGroupAdd className="w-10" />
								<div>
									<h4 className="text-lg">Super Syndicate</h4>
									<h3 className="text-xl font-semibold">
										1,080 lines
									</h3>
								</div>
								<span className="absolute -bottom-12 right-2 flex h-24 w-24 flex-col justify-center rounded-full bg-green-500 p-1 text-center text-sm text-white shadow-md">
									Approx.{' '}
									<strong className="text-2xl">$0.08</strong>{' '}
									per line
								</span>
							</header>
							<div className="p-3">
								<h4 className="w-1/2 font-medium">
									Match <strong>4</strong> numbers to win top
									prize
								</h4>
								<div className="my-3 text-sm">
									<p>
										<strong>{data[0].totalShare}</strong>{' '}
										shares per syndicate
									</p>
									<p>
										<strong>20</strong> shares available
									</p>
									<p>
										<strong>1</strong> draw
									</p>
								</div>

								<span className="font-medium">
									Choose number of shares
								</span>
								{/* Quantity selector */}
								<SharesQtyInput />
							</div>
							<footer className="mx-auto max-w-[150px] pb-6">
								<a
									href="#"
									className="flex w-full flex-col justify-center rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 py-2 text-center text-lg font-bold text-white shadow-md shadow-orange-700 hover:from-orange-500 hover:to-orange-400">
									Play Now
									<small className="text-xs font-normal">
										Total price: $35.50
									</small>
								</a>
							</footer>
						</div>
					) : (
						<div className="max-w-xs rounded border border-[#00AEB9] bg-cyan-50">
							<header className="relative flex items-center gap-x-3 bg-[#00AEB9] px-5 py-2 text-white">
								<IconUserGroup className="w-10" />
								<div>
									<h4 className="text-lg">
										Regular Syndicate
									</h4>
									<h3 className="text-xl font-semibold">
										{data[0].totalShare} lines
									</h3>
								</div>
								<span className="absolute -bottom-12 right-2 flex h-24 w-24 flex-col justify-center rounded-full bg-[#24484B] p-1 text-center text-sm text-white shadow-md">
									Approx.{' '}
									<strong className="text-2xl">$0.26</strong>{' '}
									per line
								</span>
							</header>
							<div className="p-3">
								<h4 className="w-1/2 font-medium">
									Match <strong>4</strong> numbers to win top
									prize
								</h4>
								<div className="my-3 text-sm">
									<p>
										<strong>{data[0].totalShare}</strong>{' '}
										shares per syndicate
									</p>
									<p>
										<strong>20</strong> shares available
									</p>
									<p>
										<strong>1</strong> draw
									</p>
								</div>

								<span className="font-medium">
									Choose number of shares
								</span>
								{/* Quantity selector */}
								<SharesQtyInput />
							</div>
							<footer className="mx-auto max-w-[150px] pb-6">
								<a
									href="#"
									className="flex w-full flex-col justify-center rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 py-2 text-center text-lg font-bold text-white shadow-md shadow-orange-700 hover:from-orange-500 hover:to-orange-400">
									Play Now
									<small className="text-xs font-normal">
										Total price: $35.50
									</small>
								</a>
							</footer>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
