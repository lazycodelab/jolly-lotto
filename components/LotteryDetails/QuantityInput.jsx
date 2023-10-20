import cl from 'classnames'

export default ({ weeks, setWeeks, setUserClick}) => {
	const handleWeeks = (handleType) => {
		if (handleType === 'add') {
			setWeeks(state => state + 1)
		} else {
			setWeeks(state => (state > 1 ? state - 1 : state))
		}
		setUserClick(true)
	}
	return (
		<div className="flex gap-x-2.5">
			<button
				type="button"
				className={cl(
					'flex h-16 w-14 items-center justify-center rounded-bl-xl rounded-tl-xl text-3xl text-white',
					{
						'bg-gray-100 hover:bg-none': weeks <= 1,
						'bg-cyan-400 hover:bg-cyan-500': weeks > 1,
					},
				)}
				onClick={() => handleWeeks('minus')}>
				-
			</button>
			<div className="flex w-full flex-col items-center justify-center border-2 border-slate-300 bg-zinc-100">
				<input
					type="number"
					className="border-none bg-transparent p-0 text-center text-lg font-bold focus:ring-0"
					min={1}
					value={weeks}
					onChange={e => (e.target.value = weeks)}
				/>
				<span className="text-center text-xs">
					{weeks > 1 ? 'Weeks' : 'Week'}
				</span>
			</div>
			<button
				type="button"
				className={cl(
					'flex h-16 w-14 items-center justify-center rounded-br-xl rounded-tr-xl bg-cyan-400 text-3xl text-white hover:bg-cyan-500',
				)}
				onClick={() => handleWeeks('add')}>
				+
			</button>
		</div>
	)
}
