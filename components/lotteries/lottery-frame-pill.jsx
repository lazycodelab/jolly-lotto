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
			viewBox="0 0 344 96.998"
			className={className}
			aria-hidden>
			<defs>
				<filter
					id="Subtraction_14"
					width="999"
					height="96.998"
					x="0"
					y="0"
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
			<g transform="translate(-6.999 -445.002)">
				<g data-type="innerShadowGroup">
					<path
						fill="#fffdde"
						d="M-2841 16844h-314a14.9 14.9 0 01-10.608-4.395A14.9 14.9 0 01-3170 16829v-1.016c1.851-6.691 3-19.137 3-32.48s-1.15-25.793-3-32.482V16762a14.894 14.894 0 014.394-10.605A14.907 14.907 0 01-3155 16747h314a14.9 14.9 0 0110.606 4.393A14.9 14.9 0 01-2826 16762v1.023c-1.849 6.689-3 19.135-3 32.479s1.148 25.785 3 32.477v1.02a14.909 14.909 0 01-4.392 10.607A14.892 14.892 0 01-2841 16844z"
						data-name="Subtraction 14"
						transform="translate(3177 -16302)"></path>
					<g
						filter="url(#Subtraction_14)"
						transform="translate(7 445)">
						<path
							fill="#fff"
							d="M-2841 16844h-314a14.9 14.9 0 01-10.608-4.395A14.9 14.9 0 01-3170 16829v-1.016c1.851-6.691 3-19.137 3-32.48s-1.15-25.793-3-32.482V16762a14.894 14.894 0 014.394-10.605A14.907 14.907 0 01-3155 16747h314a14.9 14.9 0 0110.606 4.393A14.9 14.9 0 01-2826 16762v1.023c-1.849 6.689-3 19.135-3 32.479s1.148 25.785 3 32.477v1.02a14.909 14.909 0 01-4.392 10.607A14.892 14.892 0 01-2841 16844z"
							data-name="Subtraction 14"
							transform="translate(3170 -16747)"></path>
					</g>
				</g>
				<path
					fill="#ffb300"
					d="M-2841 16844v-97a14.9 14.9 0 0110.606 4.393A14.9 14.9 0 01-2826 16762v1.023c-1.849 6.689-3 19.135-3 32.479s1.148 25.785 3 32.477v1.02a14.909 14.909 0 01-4.392 10.607A14.9 14.9 0 01-2841 16844zm-314 0a14.9 14.9 0 01-10.6-4.393 14.905 14.905 0 01-4.4-10.607v-1.016c1.851-6.691 3-19.137 3-32.48s-1.15-25.793-3-32.482V16762a14.894 14.894 0 014.394-10.605A14.9 14.9 0 01-3155 16747z"
					data-name="Subtraction 13"
					opacity="0.35"
					transform="translate(3177 -16302)"></path>
			</g>
		</svg>
	)
}
