import Image from 'next/image'
import cx from 'classnames'
import { useEffect, useState } from 'react'

export default ({ details, lotteryType }) => {
	const [countdown, setCountdown] = useState(null)
	useEffect(() => {
		const timer = {
			formattedTime: getNextDrawTime(details.lottery.draw_dates),
		};

		setInterval(() => {
			timer.formattedTime = getNextDrawTime(details.lottery.draw_dates);
			timer.lotteryId === details.id
			setCountdown((prevTimers) => ({
				...prevTimers,
				[details.id]: timer,
			}));
		}, 1000);

		return () => clearInterval(timer);	
	}, [details])

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


	return (
		<section className={cx('py-3', lotteryType.primaryColor)}>
			<div className="container mx-auto flex items-center justify-center gap-x-5 px-10 md:max-w-6xl md:justify-between">
				<Image
					src={lotteryType.logo}
					alt="OZ Lotto"
					width={100}
					height={80}
				/>
				<div className="text-center">
					<h2 className="text-base font-semibold text-zinc-500 md:text-2xl">
						Next {details?.lotteryName} Lotto
					</h2>
					<h1 className="font-impact text-5xl font-bold text-cyan-900 md:text-7xl">
						<small className="text-lg md:text-3xl">$</small>
						{details?.price} Million
					</h1>
				</div>
				<div className="hidden text-center md:block">
					<span className="block text-base text-zinc-600">
						Draw Cutoff Timer
					</span>
					<div className="rounded-lg bg-white px-9 py-1 text-center text-xl font-bold text-red-600">
						{countdown ? countdown[details.id].formattedTime : 'Loading...'}
					</div>
				</div>
			</div>
		</section>
	)
}
