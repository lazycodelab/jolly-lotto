import Countdown from 'react-countdown'
import Image from 'next/image'

export default ({ details }) => {
	//const [cutoffTime, setCutoffTime] = useState(
	//	Date.now() + details?.lottery?.cut_offs[0]?.hours * 60 * 60 * 1000,
	//)
	const cutoffTime =
		Date.now() + details?.lottery?.cut_offs[0]?.hours * 60 * 60 * 1000

	const cutOffCountDown = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
			// Render a completed state
			//return <Completionist />
			return null
		} else {
			// Render a countdown
			return (
				<span>
					0 Day(s) {hours}:{minutes}:{seconds}
				</span>
			)
		}
	}

	return (
		<section className="bg-orange-100 py-3">
			<div className="container mx-auto flex max-w-6xl items-center justify-between px-10">
				<Image
					src="/images/OZLotto.png"
					alt="OZ Lotto"
					width={100}
					height={80}
				/>
				<div className="text-center">
					<h2 className="text-lg font-semibold text-zinc-500 md:text-2xl">
						Next {details?.lotteryName} Lotto
					</h2>
					<h1 className="font-impact text-3xl font-bold text-cyan-900 md:text-7xl">
						<small className="text-lg md:text-3xl">$</small>
						{details?.price} Million
					</h1>
				</div>
				<div className="hidden text-center md:block">
					<span className="block text-base text-zinc-600">
						Draw Cutoff Timer
					</span>
					<div className="rounded-lg bg-white px-9 py-1 text-center text-xl font-bold text-red-600">
						<Countdown
							daysInHours={true}
							date={cutoffTime}
							renderer={cutOffCountDown}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
