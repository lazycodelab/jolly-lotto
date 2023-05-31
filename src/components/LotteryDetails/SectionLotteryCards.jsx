import { generateRandomNum } from '@/components/Helpers'
import IconAdd from '@/components/Icons/IconAdd'
import LineCard from '@/components/LotteryDetails/LineCard'
import QuantityInput from '@/components/LotteryDetails/QuantityInput'
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
			className="flex w-full max-w-[225px] cursor-pointer flex-col items-center justify-center rounded-md border border-slate-300 bg-zinc-50 p-1.5"
			onClick={() =>
				setLotteryLines(data => [...data, addLotteryLine()])
			}>
			<IconAdd className={'w-10 md:w-16'} />
			<span className="mt-2.5 block text-base font-semibold text-cyan-900">
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
			<li className="flex items-center space-x-2">
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
						className="ml-3 min-w-0 flex-1 cursor-pointer text-gray-500 ">
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
					Australia Lotto 6/45 Single Play
				</h2>
				<div className="mt-6 flex items-center justify-between">
					<h3 className="text-base font-semibold">
						Quickpick, Edit or Delete lines
					</h3>

					<div className="flex gap-x-1.5">
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
				<div className="mt-4 mb-20 flex flex-wrap justify-center gap-x-1.5 gap-y-3 md:justify-start">
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
			<div className="container mx-auto flex max-w-4xl flex-wrap items-start justify-center md:justify-between">
				<div className="w-full md:max-w-sm md:flex-1">
					<h4 className="text-base font-semibold text-cyan-900">
						Duration
					</h4>

					<QuantityInput weeks={weeks} setWeeks={setWeeks} />
					<div className="mt-5 md:mt-7">
						<h4 className="text-base font-semibold text-cyan-900">
							Select your Draw Days
						</h4>
						<ul>
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
