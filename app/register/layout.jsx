import Header from '@/header'
import Footer from '@/footer'

export default ({ children }) => {
	return (
		<html lang="en">
			<body>
				<Header />
				<main className="flex bg-teal-50">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
