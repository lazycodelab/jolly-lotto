export default ({
	label,
	name = null,
	options = [],
	isReq = false,
	infoText = null,
}) => {
	if (null === name) {
		name = label.toLowerCase()
	}

	return (
		<div className="flex flex-col gap-y-1">
			<label htmlFor={name} className="text-sm font-medium text-gray-800">
				{label} {isReq && <sup className="text-red-500">*</sup>}
			</label>
			<select
				id={name}
				name={name}
				className="border-2 border-slate-300 bg-zinc-100 px-2 text-sm ring-0 focus:ring-0">
				{options.map((o, k) => (
					<option key={k} value={o}>
						{o}
					</option>
				))}
			</select>
			{infoText && <p className="text-xs text-gray-500">{infoText}</p>}
		</div>
	)
}
