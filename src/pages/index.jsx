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
import LotteryFrame from '@/components/lotteries/lottery-frame'
import PlayButton from '@/components/play-button'

const sectionData = [
	{
		title: 'Pick Your Game',
		content:
			'Dive into the lottery world by selecting from a variety of games. Go with your go-to numbers or give our "Rapid Generator" a shot for spontaneous combination',
		icon: <IconBoxesChecked className={'mx-auto w-16 self-end md:w-20'} />,
	},
	{
		title: 'Entry Acknowledgment',
		content:
			"Once we have processed your submission, you'll receive a prompt confirmation with your  lottery numbers and the dates you'll be playing.",
		icon: <IconPaper className={'mx-auto w-14 self-end md:w-16'} />,
	},
	{
		title: 'Celebrate Your Triumph',
		content:
			"Get ready to celebrate as a lucky winner! We'll keep in the loop and swiftly deposit your winnings into your Lotto Bonanza account.",
		icon: <IconMoneyEnvelope className={'mx-auto w-16 self-end md:w-20'} />,
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
				init: false,
				on: {
					init: () => {
						console.log('hero loaded')
					},
				},
				pagination: {
					el: 'div[data-hero-pagination]',
					clickable: true,
					bulletClass:
						'h-2.5 w-2.5 bg-gray-200 rounded-full cursor-pointer',
					bulletActiveClass: '!bg-cyan-400',
				},
				// inject modules styles to shadow DOM
				injectStylesUrls: ['swiper/css/pagination'],
			}

			Object.assign(swiperElRef.current, params)

			swiperElRef.current.initialize()
		}, [])

		return (
			<>
				<swiper-container ref={swiperElRef} init="false">
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
										<h2 className="font-impact text-5xl text-teal-900 sm:text-6xl md:text-7xl">
											${product.price} MILLION
										</h2>
										<Link href={`/lotteries/${product.id}`}>
											<button
												className="mt-4 inline-block rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 px-14 py-3 text-xl text-white shadow-md shadow-orange-700 hover:from-orange-500 hover:to-orange-400"
												type="button">
												Play Now
											</button>
										</Link>
									</div>
								</div>
							</div>
						</swiper-slide>
					))}
				</swiper-container>
				<div
					data-hero-pagination
					className="mt-3 flex justify-center space-x-2"
				/>
			</>
		)
	}

	const symbols = {
		USD: '$',
		AUD: 'AU$',
		CAD: 'CA$',
		EUR: '€',
	}

	const LotteryCards = () => {
		const swiperElRef = useRef(null)
		//const prevRef = useRef(null)
		//const nextRef = useRef(null)

		useEffect(() => {
			const params = {
				modules: [Navigation],
				on: {
					init: swiper => {
						console.log('loaded', swiper)
					},
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
						spaceBetween: 0,
					},
				},

				//injectStylesUrls: ['swiper/css/navigation'],
			}

			Object.assign(swiperElRef.current, params)

			swiperElRef.current.initialize()
			//swiperElRef.current.init()
		}, [])

		return (
			<swiper-container ref={swiperElRef} init="false">
				{sortedProds.map(product => (
					<swiper-slide key={product.name} style={{ width: '140px' }}>
						<div className="relative flex flex-col items-center justify-between space-y-2.5">
							<LotteryFrame
								type={product.lottery.country_code}
								className="absolute -z-[1] h-full"
							/>
							<Image
								src={`/images/lotteries/${product.lottery.country_code}.png`}
								width={80}
								height={80}
								alt="icon"
							/>
							<h3 className="px-2 text-center">
								<span className="text-xs">
									{symbols[product.lottery.currency_code]}
								</span>
								<strong>{product.price}M</strong>
							</h3>
							<Link href={`/lotteries/${product.id}`}>
								<PlayButton />
							</Link>

							<span className="pb-2 text-xs">Meta text here</span>
						</div>
					</swiper-slide>
				))}
			</swiper-container>
		)
	}

	const SectionCard = ({ data }) => (
		<div className="grid max-w-sm space-y-5 md:space-y-10">
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
						Feel the excitement: Step into the world of
						distinguished lotteries online at jollylotto.com
					</h2>

					<div className="mx-auto mt-10 max-w-3xl">
						<LotteryCards />
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
