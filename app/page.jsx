'use client'
import React, { useEffect, useRef, useState } from 'react'
import { register } from 'swiper/element'
import { Navigation, Pagination } from 'swiper'

register()

import 'swiper/css/pagination'
import Link from 'next/link'
import Image from 'next/image'
import IconBoxesChecked from '@/Icons/IconBoxesChecked'
import IconPaper from '@/Icons/IconPaper'
import IconMoneyEnvelope from '@/Icons/IconMoneyEnvelope'
import IconTick from '@/Icons/IconTick'
import LotteryFrame from '@/lotteries/lottery-frame'
import PlayButton from '@/play-button'
import { getSingleProducts } from '../lib/api'
import LotteryFramePill from '@/lotteries/lottery-frame-pill'

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
			//injectStylesUrls: ['swiper/css/pagination'],
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

const LotteryCards = ({ prods }) => {
	const swiperElRef = useRef(null)

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
	}, [])

	return (
		<swiper-container ref={swiperElRef} init="false">
			{prods.map(product => (
				<swiper-slide key={product.name}>
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

const LotteryPills = ({ prods }) => {
	return prods.map(product => (
		<div
			key={product.name}
			className="relative flex items-center justify-between space-x-2.5 p-3">
			<LotteryFramePill
				type={product.lottery.country_code}
				className="absolute -z-[1] h-full w-full"
			/>
			<Image
				src={`/images/lotteries/${product.lottery.country_code}.png`}
				width={80}
				height={80}
				alt="icon"
			/>
			<div className="flex flex-col items-center justify-center space-y-2">
				<h3 className="text-center font-heebo text-sm text-cyan-900">
					{product.lotteryName}
				</h3>

				<span className="font-impact text-3xl font-bold text-cyan-900">
					{symbols[product.lottery.currency_code]}
					{product.price}M
				</span>
				<span className="font-heebo text-xs">Meta text here</span>
			</div>
			<Link href={`/lotteries/${product.id}`}>
				<PlayButton mobile />
			</Link>
		</div>
	))
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
						className={'w-6 shrink-0 fill-current text-green-500'}
					/>
					<span>{item}</span>
				</li>
			))}
		</ul>
	</div>
)

export default () => {
	const [singleProducts, setSingleProducts] = useState([])

	useEffect(() => {
		const fetchSingleProducts = async () => {
			let products = await getSingleProducts()
			// Removing any test products.
			products = products
				.filter(prod => !prod.name.includes('test'))
				.sort((a, b) => b.price - a.price)
			//const sortedProds = singleProducts
			setSingleProducts(products)
		}

		fetchSingleProducts()
	}, [])

	return (
		<>
			{/* Hero section */}
			<section>
				<HeroSlider prods={singleProducts} />
			</section>

			{/* Products section */}
			<section className="py-0 md:py-12">
				<div className="container mx-auto px-5">
					<h2 className="hidden text-center text-2xl font-bold uppercase text-teal-600 md:block">
						Feel the excitement: Step into the world of
						distinguished lotteries online at jollylotto.com
					</h2>

					<div className="mx-auto mt-10 hidden max-w-3xl md:block">
						<LotteryCards prods={singleProducts} />
					</div>
					<div className="mx-auto mt-10 block max-w-3xl space-y-3 md:hidden">
						<LotteryPills prods={singleProducts} />
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
		</>
	)
}
