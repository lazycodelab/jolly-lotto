import { generateRandomNum } from '../Helpers'
import IconAdd from '../Icons/IconAdd'
import LineCard from './LineCard'
import QuantityInput from './QuantityInput'
import { useEffect, useState } from 'react'
import PaymentModal from '../PaymentModal'

export default ({ details }) => {
	const balls = details?.lottery?.balls ?? 0
	const [weeks, setWeeks] = useState(1)
	const [lotteryLines, setLotteryLines] = useState([])
	//const [price, setPrice] = useState(details?.prices?.price)
	const price = details?.prices?.price
	const [drawDays, setDrawDays] = useState([])
	const [selectedDrawDays, setSelectedDrawDays] = useState(0)

	const LotteryLinesList = () => {
		let g = []

		for (let i = 0; i <= 2; i++) {
			g.push(addLotteryLine())
		}

		setLotteryLines(g)
	}

	const drawDates = () => {
		const f = []
		details?.lottery?.draw_dates.map((date, idx) => {
			f.push({
				id: idx,
				day: date.drawDay,
				selected: idx === 0,
			})
		})

		setSelectedDrawDays(selectedDrawDays + 1)
		setDrawDays(f)
	}

	useEffect(() => {
		LotteryLinesList()

		drawDates()
	}, [])

	const handleClearAll = () => {
		for (let i = 0; i <= lotteryLines.length; i++) {
			handleClearList(i)
		}
	}

	const addLotteryLine = () => {
		const rng = generateRandomNum(balls.total, balls.max)

		return {
			completed: true,
			selectedBalls: rng,
		}
	}

	const quickPickBalls = id => {
		const rng = generateRandomNum(balls.total, balls.max)
		setLotteryLines(lines =>
			lines.map((line, idx) =>
				idx === id
					? {
							...line,
							selectedBalls: rng,
							completed: true,
					  }
					: { ...line },
			),
		)
	}

	const quickPickAllBalls = () => {
		for (let i = 0; i <= lotteryLines.length; i++) {
			quickPickBalls(i)
		}
	}

	const AddQuickCard = () => (
		<div
			className="flex w-full items-center justify-center gap-x-2.5 rounded-md border border-slate-300 bg-zinc-50 p-1.5 md:max-w-[225px] md:cursor-pointer md:flex-col"
			onClick={() =>
				setLotteryLines(data => [...data, addLotteryLine()])
			}>
			<IconAdd className={'w-5 md:w-16'} />
			<span className="text-base font-medium text-cyan-900 md:mt-2.5 md:block md:font-semibold">
				Add Line
			</span>
		</div>
	)

	const handleClearList = id => {
		setLotteryLines(lines =>
			lines.map((line, idx) =>
				idx === id
					? {
							...line,
							selectedBalls: [],
							completed: false,
					  }
					: { ...line },
			),
		)
	}

	const CutoffDay = ({ id, day, selected }) => {
		const handleCutoffDays = () => {
			if (selectedDrawDays <= 1 && selected) return

			if (selected) {
				setDrawDays(prev =>
					prev.map(day =>
						day.id === id
							? { ...day, selected: false }
							: { ...day },
					),
				)
				setSelectedDrawDays(selectedDrawDays - 1)
			} else {
				setDrawDays(prev =>
					prev.map(day =>
						day.id === id ? { ...day, selected: true } : { ...day },
					),
				)

				setSelectedDrawDays(selectedDrawDays + 1)
			}
		}

		return (
			<li className="flex items-center md:space-x-2">
				<div className="flex items-center">
					<input
						id={id}
						defaultValue={day}
						type="checkbox"
						checked={selected}
						className="h-5 w-5 cursor-pointer border-gray-300 text-teal-500 focus:ring-0 "
						onChange={handleCutoffDays}
					/>
					<label
						htmlFor={id}
						className="ml-1.5 min-w-0 flex-1 cursor-pointer text-gray-500 md:ml-3 ">
						{day}
					</label>
				</div>
			</li>
		)
	}

	return (
		<section className="mt-8 px-6">
			<div className="container mx-auto max-w-6xl">
				<h2 className="text-2xl font-semibold text-teal-600">
					{details.lotteryName}
				</h2>
				<div className="mt-6 flex items-center justify-between">
					<h3 className="text-base font-semibold">
						Quickpick, Edit or Delete lines
					</h3>

					<div className="hidden md:flex md:gap-x-1.5">
						<button
							type="button"
							className="rounded-md bg-cyan-400 px-5 py-2.5 text-xs font-semibold text-white shadow shadow-cyan-600"
							onClick={quickPickAllBalls}>
							Quick Pick All
						</button>
						<button
							type="button"
							className="rounded-md bg-cyan-400 px-5 py-2.5 text-xs font-semibold text-white shadow shadow-cyan-600"
							onClick={handleClearAll}>
							Clear All
						</button>
					</div>
				</div>
				<div className="mt-4 space-y-3 md:mb-20 md:flex md:flex-wrap md:justify-center md:gap-x-1.5 md:gap-y-3">
					{lotteryLines.map((line, idx) => (
						<LineCard
							id={idx}
							completed={line.completed}
							quickPick={quickPickBalls}
							lotteryData={lotteryLines[idx]}
							setLines={setLotteryLines}
							clearList={handleClearList}
							totalLines={lotteryLines.length}
							key={idx}
							balls={balls}
						/>
					))}
					<AddQuickCard />
				</div>
			</div>
			<div className="container mx-auto mt-10 flex max-w-4xl flex-wrap items-start justify-center md:mt-0 md:justify-between">
				<div className="w-full md:max-w-sm md:flex-1">
					<h4 className="text-base font-semibold text-cyan-900">
						Duration
					</h4>

					<QuantityInput weeks={weeks} setWeeks={setWeeks} />
					<div className="mt-5 md:mt-7">
						<h4 className="text-base font-semibold text-cyan-900">
							Select your Draw Days
						</h4>
						<ul className="flex gap-x-2.5 md:block">
							{drawDays.map(date => {
								return (
									<CutoffDay
										key={date.id}
										id={date.id}
										day={date.day}
										selected={date.selected}
									/>
								)
							})}
						</ul>
					</div>
				</div>
				<div className="mt-5 w-full md:mt-0 md:max-w-sm md:flex-1">
					<h4 className="text-base font-semibold text-cyan-900">
						{details?.lotteryName}
					</h4>
					<div className="space-y-2 divide-y-2 divide-gray-300">
						<div className="flex justify-between">
							<span>
								{` ${lotteryLines.length} ${
									lotteryLines.length > 1 ? 'lines' : 'line'
								} x
								${weeks} ${weeks > 1 ? 'draws' : 'draw'}`}
							</span>
							<span>
								$
								{Number(
									price *
										weeks *
										lotteryLines.length *
										selectedDrawDays,
								).toFixed(2)}
							</span>
						</div>
						{/* total line here */}
						<div className="flex justify-between pt-2">
							<strong>Total:</strong>
							<span>
								$
								{Number(
									price *
										weeks *
										lotteryLines.length *
										selectedDrawDays,
								).toFixed(2)}
							</span>
						</div>
					</div>
					{/* confirm button */}

					<PaymentModal />
				</div>
			</div>
		</section>
	)
}
