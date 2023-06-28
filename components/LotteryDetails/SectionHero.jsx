import Countdown from 'react-countdown'
import Image from 'next/image'
import cx from 'classnames'

export default ({ details, lotteryType }) => {
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
		<section className={cx('py-3', lotteryType.primaryColor)}>
			<div className="container mx-auto flex items-center justify-center gap-x-5 px-10 md:max-w-6xl md:justify-between">
				<Image
					src={lotteryType.logo}
					alt="OZ Lotto"
					width={100}
					height={80}
				/>
				<div className="text-center">
					<h2 className="text-base font-semibold text-zinc-500 md:text-2xl">
						Next {details?.lotteryName} Lotto
					</h2>
					<h1 className="font-impact text-5xl font-bold text-cyan-900 md:text-7xl">
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
