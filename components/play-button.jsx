import cx from 'classnames'

export default ({ mobile = false, disabled = false }) => {
	//const [disabled ]
	return (
		<button
			disabled={disabled}
			className={cx(
				'rounded-lg text-white shadow-md',
				{
					'bg-gray-300 cursor-not-allowed': disabled,
					'bg-gradient-to-r from-orange-400 to-orange-500 shadow-orange-700 hover:from-orange-500 hover:to-orange-400':
						!disabled,
				},
				{
					'px-2 py-3 text-sm': mobile === true,
					'px-7 py-1 text-sm': mobile === false,
				},
			)}
			type="button">
			Play Now
		</button>
	)
}
