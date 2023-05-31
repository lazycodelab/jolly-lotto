import React, { useEffect, useRef } from 'react'
import { register } from 'swiper/element'
import { Navigation, Pagination } from 'swiper'

register()
//import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
//import 'swiper/css'
//import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Link from 'next/link'
import { getSingleProducts } from '@/lib/api'
import Image from 'next/image'
import Head from 'next/head'
import IconBoxesChecked from '@/components/Icons/IconBoxesChecked'
import IconPaper from '@/components/Icons/IconPaper'
import IconMoneyEnvelope from '@/components/Icons/IconMoneyEnvelope'
import IconTick from '@/components/Icons/IconTick'
import Layout from '@/components/Layout'

const sectionData = [
	{
		title: 'Pick Your Game',
		content:
			'Dive into the lottery world by selecting from a variety of games. Go with your go-to numbers or give our "Rapid Generator" a shot for spontaneous combination',
		icon: <IconBoxesChecked className={'mx-auto w-16 md:w-20'} />,
	},
	{
		title: 'Entry Acknowledgment',
		content:
			"Once we have processed your submission, you'll receive a prompt confirmation with your  lottery numbers and the dates you'll be playing.",
		icon: <IconPaper className={'mx-auto w-14 md:w-16'} />,
	},
	{
		title: 'Celebrate Your Triumph',
		content:
			"Get ready to celebrate as a lucky winner! We'll keep in the loop and swiftly deposit your winnings into your Lotto Bonanza account.",
		icon: <IconMoneyEnvelope className={'mx-auto w-16 md:w-20'} />,
	},
]

const qualityData = [
	{
		title: 'Thrilling',
		content: [
			"Participate in the world's most captivating lotteries.",
			'Play for massive jackpots that will keep you on the edge of your seat!',
		],
	},
	{
		title: 'Safe',
		content: [
			'We implement the highest security measures in the industry.',
			'Our security standards exceeds the regulated requirements.',
			'Regular system upgrades ensure the protection of your data.',
		],
	},
	{
		title: 'Transparent',
		content: [
			'We include service charges in the ticket price.',
			'There are no additional fees for collect your winnings or for any other purpose.',
		],
	},
]

export default function Home({ singleProducts }) {
	// Removing any test products.
	singleProducts = singleProducts.filter(prod => !prod.name.includes('test'))
	const sortedProds = singleProducts.sort((a, b) => b.price - a.price)

	const HeroSlider = ({ prods }) => {
		const swiperElRef = useRef(null)
		useEffect(() => {
			const params = {
				modules: [Pagination],
				pagination: {
					el: 'div[data-hero-pagination]',
					clickable: true,
					bulletClass:
						'h-2.5 w-2.5 bg-gray-200 rounded-full cursor-pointer',
					bulletActiveClass: 'bg-cyan-400',
				},
				// inject modules styles to shadow DOM
				injectStylesUrls: [
					'swiper/css/pagination',
					//  'path/to/pagination-element.min.css'
				],
			}

			Object.assign(swiperElRef.current, params)

			swiperElRef.current.initialize()
		}, [])

		return (
			<>
				<swiper-container
					ref={swiperElRef}
					pagination="true"
					slides-per-view="1">
					{prods.map(product => (
						<swiper-slide key={product.name}>
							<div className="bg-[#dafcfe]">
								<div className="mx-auto flex max-w-6xl flex-wrap md:flex-nowrap md:items-center md:justify-between">
									<Image
										className="order-2 block md:order-1"
										width={800}
										src="/images/banner-man-1.png"
										alt="banner"
										height={290}
									/>
									<div className="order-1 my-3 w-full space-y-3 px-3 text-center md:order-2 md:px-0 md:py-5 md:text-center">
										<h2 className="text-2xl font-medium text-teal-900">
											{product.lotteryName}
										</h2>
										{/*<p className="text-base font-thin text-teal-900">
								Support Lorem Ipsum
							</p>*/}
										<h2 className="font-impact text-5xl text-teal-900 sm:text-6xl md:text-7xl">
											${product.price} MILLION
										</h2>
										<Link href={`/lotteries/${product.id}`}>
											<button
												className="mt-4 inline-block rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 px-8 py-2 text-sm text-white shadow-md shadow-orange-700 hover:from-orange-500 hover:to-orange-400"
												type="button">
												Play Now
											</button>
										</Link>
									</div>
								</div>
							</div>
						</swiper-slide>
					))}
					<div
						data-hero-pagination
						className="mt-3 flex justify-center space-x-2"
					/>
				</swiper-container>
			</>
		)
		//<Swiper
		//	slidesPerView="auto"
		//	pagination={{
		//		el: 'div[data-hero-pagination]',
		//		clickable: true,
		//		bulletClass:
		//			'h-2.5 w-2.5 bg-gray-200 rounded-full cursor-pointer',
		//		bulletActiveClass: 'bg-cyan-400',
		//	}}
		//	removeClippedSubviews={false}
		//	modules={ [ Pagination ] }
		//>

		//</Swiper>
	}

	const SwiperElm = () => {
		const swiperElRef = useRef(null)
		const prevRef = useRef(null)
		const nextRef = useRef(null)

		useEffect(() => {
			const params = {
				modules: [Navigation],
				onInit: swiper => {
					swiper.params.navigation.prevEl = prevRef.current
					swiper.params.navigation.nextEl = nextRef.current
					swiper.navigation.init()
					swiper.navigation.update()
				},
				breakpoints: {
					640: {
						slidesPerView: 2,
						spaceBetween: 10,
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 30,
					},
				},
				injectStylesUrls: ['swiper/css/navigation'],
			}

			Object.assign(swiperElRef.current, params)

			swiperElRef.current.initialize()
		}, [])

		//return <div className="flex">asds</div>
		return (
			<swiper-container ref={swiperElRef} class="relative justify-center">
				{sortedProds.map(product => (
					<swiper-slide key={product.name}>
						<div className="flex flex-col items-center justify-between space-y-2.5 rounded-lg border-l-8 border-r-8 border-yellow-300/80 bg-amber-100 py-6">
							<Image
								src={'/images/Australian6-45.png'}
								width={80}
								height={80}
								alt="icon"
							/>
							<h3 className="px-2 text-center">
								<span>{product.lotteryName}</span>{' '}
								<strong>{product.price}M</strong>
							</h3>
							<Link href={`/lotteries/${product.id}`}>
								<button
									className="rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 px-8 py-2 text-sm text-white shadow-md shadow-orange-700 hover:from-orange-500 hover:to-orange-400"
									type="button">
									Play Now
								</button>
							</Link>

							<span>Meta text here</span>
						</div>
					</swiper-slide>
				))}
			</swiper-container>
			//<Swiper
			//	className="relative justify-center"
			//	modules={[Navigation]}
			//	onInit={swiper => {
			//		swiper.params.navigation.prevEl = prevRef.current
			//		swiper.params.navigation.nextEl = nextRef.current
			//		swiper.navigation.init()
			//		swiper.navigation.update()
			//	}}
			//	breakpoints={{
			//		640: {
			//			slidesPerView: 2,
			//			spaceBetween: 10,
			//		},
			//		768: {
			//			slidesPerView: 2,
			//			spaceBetween: 20,
			//		},
			//		1024: {
			//			slidesPerView: 3,
			//			spaceBetween: 30,
			//		},
			//	}}
			//	spaceBetween={10}
			//	slidesPerView={1}>
			//	{sortedProds.map(product => (
			//		<SwiperSlide
			//			key={product.name}
			//			className="flex flex-col items-center justify-between space-y-2.5 rounded-lg border-l-8 border-r-8 border-yellow-300/80 bg-amber-100 py-6">
			//			<Image
			//				src={'/images/Australian6-45.png'}
			//				width={80}
			//				height={80}
			//				alt="icon"
			//			/>
			//			<h3 className="px-2 text-center">
			//				<span>{product.lotteryName}</span>{' '}
			//				<strong>{product.price}M</strong>
			//			</h3>
			//			<Link href={`/lotteries/${product.id}`}>
			//				<button
			//					className="rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 py-2 px-8 text-sm text-white shadow-md shadow-orange-700 hover:from-orange-500 hover:to-orange-400"
			//					type="button">
			//					Play Now
			//				</button>
			//			</Link>

			//			<span>Meta text here</span>
			//		</SwiperSlide>
			//	))}
			//	<button
			//		type="button"
			//		className="absolute top-1/3 z-50 flex h-16 w-11 items-center justify-center rounded-tr-lg rounded-br-lg bg-gray-200"
			//		ref={prevRef}>
			//		<svg
			//			fill="none"
			//			viewBox="0 0 24 24"
			//			strokeWidth={1.5}
			//			stroke="currentColor"
			//			className="h-10 w-10 text-white">
			//			<path
			//				strokeLinecap="round"
			//				strokeLinejoin="round"
			//				d="M15.75 19.5L8.25 12l7.5-7.5"
			//			/>
			//		</svg>
			//	</button>
			//	<button
			//		type="button"
			//		className="absolute top-1/3 right-0 z-50 flex h-16 w-11 items-center justify-center rounded-tl-lg rounded-bl-lg bg-gray-200"
			//		ref={nextRef}>
			//		<svg
			//			fill="none"
			//			viewBox="0 0 24 24"
			//			strokeWidth={1.5}
			//			stroke="currentColor"
			//			className="h-10 w-10 text-white">
			//			<path
			//				strokeLinecap="round"
			//				strokeLinejoin="round"
			//				d="M8.25 4.5l7.5 7.5-7.5 7.5"
			//			/>
			//		</svg>
			//	</button>
			//</Swiper>
		)
	}

	const SectionCard = ({ data }) => (
		<div className="max-w-sm space-y-5 md:space-y-10">
			<h3 className="text-center text-2xl font-medium uppercase text-orange-400">
				{data.title}
			</h3>
			<p className="text-amber-900">{data.content}</p>
			{data.icon}
		</div>
	)

	const QualityCard = ({ data }) => (
		<div className="max-w-sm space-y-4">
			<h3 className="text-2xl font-medium uppercase text-green-600">
				{data.title}
			</h3>
			<ul className="space-y-6">
				{data.content.map((item, idx) => (
					<li
						key={idx}
						className="flex max-w-xs items-start space-x-3 font-medium text-teal-900">
						<IconTick
							className={
								'w-6 shrink-0 fill-current text-green-500'
							}
						/>
						<span>{item}</span>
					</li>
				))}
			</ul>
		</div>
	)

	return (
		<Layout>
			<Head>
				<title>Home</title>
			</Head>

			{/* Hero section */}
			<section>
				<HeroSlider prods={sortedProds} />
			</section>

			{/* Products section */}
			<section className="py-0 md:py-12">
				<div className="container mx-auto">
					<h2 className="hidden text-center text-2xl font-bold uppercase text-teal-600 md:block">
						Fell the excitement: Step into the world of
						distinguished lotteries online at jollylotto.com
					</h2>

					<div className="mx-auto mt-10 max-w-6xl">
						<SwiperElm />
					</div>
				</div>
			</section>

			<section className="mt-8 bg-orange-50 px-6 py-10 sm:px-16 sm:py-14">
				<div className="container mx-auto max-w-6xl">
					<div className="flex flex-wrap justify-center gap-y-10 md:flex-nowrap md:justify-between md:gap-x-10">
						{sectionData.map((data, idx) => (
							<SectionCard key={idx} data={data} />
						))}
					</div>
					<h2 className="mt-12 text-center text-xl font-semibold text-orange-400 md:mt-16 md:text-2xl">
						WE TAKE CARE OF THE LOTTO DETAILS, SO YOU CAN ENJOY THE
						THRILL OF WINNING BIG!
					</h2>
				</div>
			</section>

			<section className="px-6 py-10 sm:px-16 sm:py-14">
				<div className="container mx-auto max-w-6xl">
					<div className="flex flex-wrap justify-center gap-y-10 md:flex-nowrap md:justify-between">
						{qualityData.map((data, idx) => (
							<QualityCard key={idx} data={data} />
						))}
					</div>
				</div>
			</section>
		</Layout>
	)
}

export const getStaticProps = async () => {
	const singleProducts = await getSingleProducts()

	return {
		props: { singleProducts },
	}
}
