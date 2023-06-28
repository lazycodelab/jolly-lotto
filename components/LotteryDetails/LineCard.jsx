import classNames from 'classnames'
//import { generateRandomNum } from '../Helpers'
import IconTrash from '../Icons/IconTrash'
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'

export default ({
	balls,
	lotteryData,
	setLines,
	id,
	totalLines,
	clearList,
	quickPick,
	completed,
}) => {
	const [modalState, setModalState] = useState(false)

	const LotteryBalls = () => {
		const b = []

		for (let i = 1; i <= balls.max; i++) {
			b.push(<BallUI key={i} number={i} />)
		}

		return b
	}

	/**
	 *
	 * @param {number} id
	 */
	const removeList = id => {
		setLines(lines =>
			lines.length > 1 ? lines.filter((list, idx) => idx !== id) : lines,
		)
	}

	const BallUI = ({ number }) => {
		//const isSelected = selectedBalls.includes(number)
		const isSelected = lotteryData.selectedBalls.includes(number)

		const handleToggleSelected = () => {
			if (isSelected) {
				const r = lotteryData.selectedBalls.filter(x => x !== number)
				setLines(lines =>
					lines.map((line, idx) =>
						idx === id
							? {
									...line,
									selectedBalls: r,
									completed: false,
							  }
							: { ...line },
					),
				)
			} else {
				if (lotteryData.selectedBalls.length < balls.total) {
					lotteryData.selectedBalls.push(number)

					setLines(lines =>
						lines.map((line, idx) =>
							idx === id
								? {
										...line,
										selectedBalls:
											lotteryData.selectedBalls,
								  }
								: { ...line },
						),
					)
				}

				if (lotteryData.selectedBalls.length === balls.total) {
					setLines(lines =>
						lines.map((line, idx) =>
							idx === id
								? {
										...line,
										selectedBalls:
											lotteryData.selectedBalls,
										completed: true,
								  }
								: { ...line },
						),
					)
				}
			}
		}

		return (
			<span
				className={classNames(
					'flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded border border-slate-200 text-xs',
					{
						'bg-white': !isSelected,
						'bg-green-500 text-white': isSelected,
					},
				)}
				onClick={handleToggleSelected}>
				{number}
			</span>
		)
	}

	//const BonusBalls = () => {
	//	const ballUI = []
	//	if (balls.bonus.length > 1) return null

	//	// @todo: we always take the first bonus ball type.
	//	const bonusBall = balls.bonus[0]

	//	const rng = generateRandomNum(bonusBall.ballNumber, bonusBall.maxNumber)
	//	// need to know which card it 	belongs to.
	//	// then set state for that card index.
	//	//setLotteryLines((state) => (state[0]['selected'] = ballsToSelect))

	//	//for ( let i = 1; i <= bonusBall.maxNumber; i++ ) {
	//	//    <span className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-slate-200 bg-amber-100 text-xs">
	//	//		1
	//	//	</span>
	//	//	ballUI.push(<BallUI number={i} isSelected={rng.has(i)} key={i} />)
	//	//}

	//	//<div className="mt-3">
	//	//		<span className="block text-sm">Select 2 Super</span>
	//	//		<div className="mt-2 flex flex-wrap gap-1.5">
	//	//		</div>
	//	//	</div>
	//	//return ballUI
	//}

	const MobileCardModal = () => {
		return (
			<dialog
				{...(modalState && {
					open: true,
				})}
				className={classNames({
					'fixed inset-0 !m-0 flex h-full w-full items-center justify-center bg-black/90':
						modalState,
				})}>
				<button
					type="button"
					className="absolute right-5 top-10"
					onClick={() => setModalState(false)}>
					<XMarkIcon className="h-14 text-gray-200" />
				</button>
				<CardUI mobile />
			</dialog>
		)
	}

	const MobileLineCard = () => {
		let b = []

		for (let i = 0; i < balls.total; i++) {
			const ui = (
				<span
					key={i}
					className="flex h-6 w-6 cursor-pointer select-none items-center justify-center rounded border border-slate-200 bg-white text-xs">
					{lotteryData.selectedBalls[i] ?? ''}
				</span>
			)
			b.push(ui)
		}

		return (
			<div
				className={classNames(
					'flex items-center justify-around gap-x-1.5 rounded-md border p-1.5 md:hidden',
					{
						'border-slate-300 bg-zinc-50': completed === true,
						'border-red-300 bg-[#FF9A9A]': completed === false,
					},
				)}>
				<button type="button">
					<TrashIcon className="w-4 text-gray-600" />
				</button>
				{b}
				<button type="button" onClick={() => setModalState(true)}>
					<PencilIcon className="w-4 text-gray-600" />
				</button>
			</div>
		)
	}

	const CardUI = ({ mobile = false }) => {
		return (
			<div
				className={classNames(
					'max-w-[225px] rounded-md border p-1.5 md:block',
					{
						'border-slate-300 bg-zinc-50': completed === true,
						'border-red-300 bg-red-100': completed === false,
						hidden: !mobile,
					},
				)}>
				<div className="flex items-stretch justify-between gap-x-1 pt-8">
					<button
						type="button"
						className="flex-1 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 px-2 py-1 text-xs font-medium text-white hover:from-orange-500 hover:to-orange-400"
						onClick={() => quickPick(id)}>
						Quick Pick
					</button>
					<button
						type="button"
						className="rounded-xl bg-cyan-400 px-4 py-1 text-xs font-medium text-white hover:bg-cyan-300"
						onClick={() => clearList(id)}>
						Clear
					</button>
					<button
						type="button"
						className={classNames(
							'rounded-xl px-4 py-1 text-xs font-medium text-white',
							{
								'bg-cyan-400 hover:bg-cyan-300': totalLines > 1,
								'cursor-not-allowed bg-gray-300':
									totalLines <= 1,
							},
						)}
						onClick={() => removeList(id)}>
						<IconTrash className={'w-2.5'} />
					</button>
				</div>
				<div className="mt-3">
					<span className="block text-sm">
						Select {balls.total} Numbers
					</span>
					<div className="mt-2 flex flex-wrap gap-1.5">
						<LotteryBalls />
					</div>
				</div>
				{/*<BonusBalls />*/}
			</div>
		)
	}

	return (
		<>
			<MobileLineCard />
			<CardUI />
			<MobileCardModal />
		</>
	)
}
