export default ({
	label,
	name = null,
	defaultValue = null,
	options = [],
	isReq = false,
	infoText = null,
	noMarker = false,
}) => {
	if (null === name) {
		name = label.toLowerCase()
	}

	return (
		<div className="flex flex-1 flex-col gap-y-1">
			<label htmlFor={name} className="text-sm font-medium text-gray-800">
				{label}{' '}
				{isReq && !noMarker && <sup className="text-red-500">*</sup>}
			</label>
			<select
				id={name}
				name={name}
				className="w-full border-2 border-slate-300 bg-zinc-100 px-2 text-sm ring-0 focus:ring-0"
				{...(isReq && { required: 'required' })}
				{...(defaultValue && { defaultValue: '' })}>
				{defaultValue && (
					<option value="" disabled>
						{defaultValue}
					</option>
				)}
				{Object.keys(options).map(k => {
					const _textValue = options[k]
					let _o = k
					_o = k.toString()
					_o = k.padStart(2, '0')

					return (
						<option key={k} value={_o}>
							{_textValue}
						</option>
					)
				})}
			</select>
			{infoText && <p className="text-xs text-gray-500">{infoText}</p>}
		</div>
	)
}
