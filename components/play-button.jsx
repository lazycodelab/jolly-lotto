import cx from 'classnames'

export default ({ mobile = false }) => {
	return (
		<button
			className={cx(
				'rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md shadow-orange-700 hover:from-orange-500 hover:to-orange-400',
				{
					'px-4 py-3 text-base': mobile === true,
					'px-7 py-1 text-sm': mobile === false,
				},
			)}
			type="button">
			Play Now
		</button>
	)
}
