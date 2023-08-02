import { useState } from 'react'
import cs from 'classnames'

export default () => {
	const [shares, setShares] = useState(1)

	return (
		<div className="flex gap-x-2.5">
			<button
				type="button"
				className={cs(
					'flex h-16 w-14 items-center justify-center rounded-bl-xl rounded-tl-xl text-3xl text-white',
					{
						'cursor-not-allowed bg-gray-100': shares <= 1,
						'bg-cyan-500 hover:bg-cyan-400': shares > 1,
					},
				)}
				onClick={() =>
					setShares(share => (share > 1 ? share - 1 : share))
				}>
				-
			</button>
			<div className="flex flex-col items-center justify-center border-2 border-slate-300 bg-zinc-100">
				<input
					type="number"
					className="max-w-[157px] border-none bg-transparent p-0 text-center text-lg font-bold focus:ring-0"
					min={1}
					value={shares}
					onChange={e => setShares(e.target.value)}
				/>
				<span className="text-center text-xs">
					{shares > 1 ? 'Shares' : 'Share'}
				</span>
			</div>
			<button
				type="button"
				className={cs(
					'flex h-16 w-14 items-center justify-center rounded-br-xl rounded-tr-xl text-3xl text-white',
					{
						'bg-gray-100': shares >= 20,
						'bg-cyan-500 hover:bg-cyan-400': shares <= 20,
					},
				)}
				onClick={() => setShares(share => share + 1)}>
				+
			</button>
		</div>
	)
}
