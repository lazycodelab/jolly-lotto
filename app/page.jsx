'use client'
import React, { useEffect, useRef, useState } from 'react'
import { register } from 'swiper/element/bundle'
import { Navigation, Pagination } from 'swiper/modules'
import { useGlobalContext } from '@/../context/appProvider'
import { symbols } from '@/Helpers'

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
			// on: {
			// 	init: () => {
			// 		console.log('hero loaded')
			// 	},
			// },
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
						<div className="bg-[#dafcfe] relative">
							<div className='absolute left-0 h-full'>
								<Image
									className="object-cover h-full w-full mix-blend-darken lg:opacity-100 opacity-60"
									src="/images/banner-left-side.png"
									width={800}
									height={290}
									alt="banner-left"
								/>
							</div>
							<div className='absolute right-0 h-full'>
								<Image
									className="object-cover h-full w-full mix-blend-darken lg:opacity-100 opacity-60"
									src="/images/banner-right-side.png"
									width={800}
									height={290}
									alt="banner-left"
								/>
							</div>
							<div className="mx-auto flex max-w-6xl flex-wrap md:flex-nowrap md:items-center md:justify-between">
								<Image
									className="order-2 block md:order-1 relative -left-8 md:left-0"
									width={800}
									src="/images/banner-man-1.png"
									alt="banner"
									height={290}
									priority
								/>
								<div className="order-1 my-3 w-full space-y-3 px-3 text-center md:order-2 md:px-0 md:py-5 md:text-center">
									<h2 className="text-2xl font-medium text-teal-900">
										{product.lotteryName}
									</h2>
									<h2 className="font-impact text-5xl text-teal-900 sm:text-6xl md:text-7xl">
										{symbols[product.lottery.currency_code]}{product.price} MILLION
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
const getNextDrawTime = (drawDates) => {
	const now = new Date();

	if (drawDates.length === 0) {
		return 'No upcoming draws';
	}

	const validDrawDates = drawDates.filter((drawDate) => {
		if (!drawDate.drawTime) {
			console.error(`Invalid draw time for draw date: ${JSON.stringify(drawDate)}`);
			return false; // Skip this draw date if draw time is missing
		}

		const drawTimeParts = drawDate.drawTime.split(':');
		if (drawTimeParts.length !== 3) {
			console.error(`Invalid draw time format for draw date: ${JSON.stringify(drawDate)}`);
			return false; // Skip this draw date if draw time format is invalid
		}

		const drawHour = parseInt(drawTimeParts[0], 10);
		const drawMinute = parseInt(drawTimeParts[1], 10);
		const drawSecond = parseInt(drawTimeParts[2], 10);

		if (isNaN(drawHour) || isNaN(drawMinute) || isNaN(drawSecond)) {
			console.error(`Invalid draw time values for draw date: ${JSON.stringify(drawDate)}`);
			return false; // Skip this draw date if draw time values are not valid numbers
		}

		return true;
	});

	if (validDrawDates.length === 0) {
		return 'No upcoming draws';
	}

	const today = now.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
	const sortedDrawDates = validDrawDates
		.map((drawDate) => {
			const drawTimeParts = drawDate.drawTime.split(':');
			const drawHour = parseInt(drawTimeParts[0], 10);
			const drawMinute = parseInt(drawTimeParts[1], 10);
			const drawSecond = parseInt(drawTimeParts[2], 10);

			const drawDateCopy = new Date(now);
			drawDateCopy.setHours(drawHour, drawMinute, drawSecond, 0);

			const drawDay = drawDate.dayOfWeek;
			// Calculate the difference in days while considering rollover to the next week
			const dayDifference = (drawDay - today + 7) % 7;
			drawDateCopy.setDate(drawDateCopy.getDate() + dayDifference);

			if (drawDateCopy > now) {
				return drawDateCopy;
			}
			return null;
		})
		.filter((drawDate) => drawDate !== null)
		.sort((a, b) => a - b);

	if (sortedDrawDates.length === 0) {
		console.error('No future draw dates found.');
		return 'No upcoming draws';
	}

	const nextDraw = sortedDrawDates[0];

	const remainingTime = nextDraw - now;
	const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
	const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
	const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

	return `${days} Day(s) ${hours}:${minutes}:${formattedSeconds}`;
};

const LotteryCards = ({ prods }) => {
	const swiperElRef = useRef(null)
	const [timers, setTimers] = useState({});

	useEffect(() => {
		const params = {
			modules: [Navigation],
			// on: {
			// 	init: swiper => {
			// 		console.log('loaded', swiper)
			// 	},
			// },
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

		const timerIds = prods.map((product) => {
			const timer = {
				lotteryId: product.id,
				formattedTime: getNextDrawTime(product.lottery.draw_dates),
			};

			return setInterval(() => {
				timer.formattedTime = getNextDrawTime(product.lottery.draw_dates);
				timer.lotteryId === product.id
				setTimers((prevTimers) => ({
					...prevTimers,
					[product.id]: timer,
				}));
			}, 1000);
		});

		return () => {
			timerIds.forEach((timerId) => clearInterval(timerId));
		};
	}, [prods])

	return (
		<swiper-container ref={swiperElRef} init="false">
			{prods.map(product => {
				return (
					<swiper-slide key={product.name}>
						<div className="relative flex flex-col items-center justify-between space-y-2.5">
							<LotteryFrame
								type={product.lottery.country_code}
								className="absolute -z-[1] h-full"
							/>
							<div className='grid content-center h-[80px] w-[80px]'>
								<Image
									src={`/images/lotteries/${product.lottery.country_code}_S.png`}
									width={150}
									height={150}
									alt="icon"
									style={{ width: 'auto', height: 'auto' }}
								/>
							</div>
							<h3 className="px-2 text-center">
								<span className="text-xs">
									{symbols[product.lottery.currency_code]}
								</span>
								<strong>{product.price}M</strong>
							</h3>
							<Link href={`/lotteries/${product.id}`}>
								<PlayButton />
							</Link>

							<span className="pb-2 text-xs">{timers[product.id] ? timers[product.id].formattedTime : 'Loading...'}</span>
						</div>
					</swiper-slide>
				)
			})}
		</swiper-container>
	)
}

const LotteryPills = ({ prods }) => {
	const types = {
		AU: {
			primary: 'bg-[#FFFCCF]',
			secondary: 'border-[#FFB300]',
		},
		ES: {
			primary: 'bg-[#E5F2FF]',
			secondary: 'border-[#2285E6]',
		},
		CA: {
			primary: 'bg-[#FFE9E9]',
			secondary: 'border-[#FF5454]',
		},
	}

	const [timers, setTimers] = useState({});

	useEffect(() => {
		const timerIds = prods.map((product) => {
			const timer = {
				lotteryId: product.id,
				formattedTime: getNextDrawTime(product.lottery.draw_dates),
			};

			return setInterval(() => {
				timer.formattedTime = getNextDrawTime(product.lottery.draw_dates);
				timer.lotteryId === product.id
				setTimers((prevTimers) => ({
					...prevTimers,
					[product.id]: timer,
				}));
			}, 1000);
		});

		return () => {
			timerIds.forEach((timerId) => clearInterval(timerId));
		};
	}, [prods])

	return prods.map(product => {
		const type = types[product.lottery.country_code]
		return (
			<div
				key={product.name}
				className={`${type.primary} flex items-center justify-between space-x-1 sm:space-x-2.5 rounded-md border-x-[12px] ${type.secondary} p-3 shadow-md`}>
				<Image
					src={`/images/lotteries/${product.lottery.country_code}_S.png`}
					width={60}
					height={60}
					alt="icon"
				/>
				<div className="flex flex-col items-center justify-center space-y-2">
					<h3 className="text-center font-heebo text-xs md:text-sm text-cyan-900">
						{product.lotteryName}
					</h3>

					<span className="font-impact text-2xl md:text-3xl font-bold text-cyan-900">
						{symbols[product.lottery.currency_code]}
						{product.price}M
					</span>
					<span className="font-heebo text-xs">{timers[product.id] ? timers[product.id].formattedTime : 'Loading...'}</span>
				</div>
				<Link href={`/lotteries/${product.id}`}>
					<PlayButton mobile />
				</Link>
			</div>
		)
	})
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
	const { lotteryProducts } = useGlobalContext()
	return (
		<>
			{/* Hero section */}
			<section>
				<HeroSlider prods={lotteryProducts} />
			</section>

			{/* Products section */}
			<section className="py-0 md:py-12">
				<div className="container mx-auto px-5">
					<h2 className="hidden text-center text-2xl font-bold uppercase text-teal-600 md:block">
						Feel the excitement: Step into the world of
						distinguished lotteries online at jollylotto.com
					</h2>

					<div className="mx-auto mt-10 hidden max-w-3xl md:block">
						<LotteryCards prods={lotteryProducts} />
					</div>
					<div className="mx-auto mt-10 block max-w-3xl space-y-3 md:hidden">
						<LotteryPills prods={lotteryProducts} />
					</div>
				</div>
			</section>

			<section className="bg-orange-50 px-6 py-10 sm:px-16 sm:py-14">
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
