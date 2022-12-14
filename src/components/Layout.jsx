import Footer from './Footer'
import Header from './Header'

export default ({ children }) => {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	)
}
