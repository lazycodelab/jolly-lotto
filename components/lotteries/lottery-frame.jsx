export default ({ className, type }) => {
	const types = {
		AU: {
			primary: '#fffdde',
			secondary: '#ffb300',
		},
		ES: {
			primary: '#e3f1ff',
			secondary: '#2285e6',
		},
		CA: {
			primary: '#ffe8e8',
			secondary: '#ff9a9a',
		},
	}
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 165.001 187"
			className={className}>
			<defs>
				<filter
					id="Subtraction_2"
					width="164.001"
					height="186.001"
					x="0.499"
					y="0.497"
					filterUnits="userSpaceOnUse">
					<feOffset dy="-2"></feOffset>
					<feGaussianBlur result="blur"></feGaussianBlur>
					<feFlood floodOpacity="0.188" result="color"></feFlood>
					<feComposite
						in="SourceGraphic"
						in2="blur"
						operator="out"></feComposite>
					<feComposite in="color" operator="in"></feComposite>
					<feComposite
						in2="SourceGraphic"
						operator="in"></feComposite>
				</filter>
			</defs>
			<g transform="translate(-57.499 -10.001)">
				<g data-type="innerShadowGroup">
					<path
						fill={types[type].primary}
						d="M10586 16354.5h-134a15 15 0 01-15-15v-3.456c2.394-11.053 4-40.807 4-74.04s-1.608-62.992-4-74.045v-4.457a15 15 0 0115-15h134a15 15 0 0115 15v4.476c-2.392 11.066-4 40.815-4 74.026s1.606 62.956 4 74.021v3.475a15 15 0 01-15 15z"
						data-name="Subtraction 2"
						transform="translate(-10379 -16158)"></path>
					<g
						filter="url(#Subtraction_2)"
						transform="translate(57.5 10)">
						<path
							fill="red"
							d="M10586 16354.5h-134a15 15 0 01-15-15v-3.456c2.394-11.053 4-40.807 4-74.04s-1.608-62.992-4-74.045v-4.457a15 15 0 0115-15h134a15 15 0 0115 15v4.476c-2.392 11.066-4 40.815-4 74.026s1.606 62.956 4 74.021v3.475a15 15 0 01-15 15z"
							data-name="Subtraction 2"
							transform="translate(-10436.5 -16168)"></path>
					</g>
				</g>
				<path
					fill={types[type].secondary}
					d="M207 196.5h0v-186a15 15 0 0115 15v4.464c-2.394 11.069-4 40.822-4 74.038s1.608 62.969 4 74.037v3.463a15 15 0 01-15 15zm-134 0h0a15 15 0 01-15-15v-3.463c2.394-11.064 4-40.817 4-74.037s-1.608-62.974-4-74.038v-4.464a15 15 0 0115-15z"
					opacity="0.35"></path>
			</g>
		</svg>
	)
}
