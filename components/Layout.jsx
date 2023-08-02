import Footer from './footer'
import Header from './header'

export default ({ children, className }) => {
	return (
		<>
			<Header />
			<main className={className}>{children}</main>
			<Footer />
		</>
	)
}
