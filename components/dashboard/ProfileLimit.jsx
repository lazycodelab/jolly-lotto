import cl from 'classnames'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import axios from 'lib/axios'
import { useState,useEffect } from 'react'
import moment from 'moment'
import { symbols } from '@/Helpers'

export default () => {
    const [errors, setErrors] = useState(false)
	const [success, setSuccess] = useState(false)
    const [dataFetched, setDataFetched] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    // Details
    // Play Limit
    const [playLimit,setPlayLimit] = useState(0)
    const [remainingPlayLimit,setRemainingPlayLimit] = useState(0)
    const [remainingUntilPlayLimit,setRemainingUntilPlayLimit] = useState(0)
    const [playLimitDuration,setPlayLimitDuration] = useState(1)
    // Deposit
    const [depositLimit,setDepositLimit] = useState(0)
    const [remainingDepositLimit,setRemainingDepositLimit] = useState(0)
    const [remainingUntilDepositLimit,setRemainingUntilDepositLimit] = useState(0)
    const [depositLimitDuration,setDepositLimitDuration] = useState(1)
    const [currencyCode,setCurrencyCode] = useState('GBP')
    const fetchUserLimit = () => {
        setDataFetched(false)
        axios.get('/user/limit').then(({data}) => {
            if (data.status === 'success') {
                const responseData = data.data
                setPlayLimit(responseData[0].currentLimitMax)
                setDepositLimit(responseData[1].currentLimitMax)
                setRemainingPlayLimit(responseData[0].remainingAmount)
                setRemainingDepositLimit(responseData[1].remainingAmount)
                setRemainingUntilPlayLimit(moment(responseData[0].remainingUntil).format('YYYY MMM DD, hh:mm:ss A'))
                setRemainingUntilDepositLimit(moment(responseData[1].remainingUntil).format('YYYY MMM DD, hh:mm:ss A'))
                setPlayLimitDuration(responseData[0].currentLimitDuration)
                setDepositLimitDuration(responseData[1].currentLimitDuration)
                setCurrencyCode(responseData[0].currencyCode)
            } else {
                setErrors(data.message)
            }
            setDataFetched(true)
        })
    }

    const perDayData = {
        1:'1 Day',
        5:'5 Day',
        20:'20 Day'
    }

    const handleUpdateLimitForm = (e) => {
        e.preventDefault()
        setErrors(false)
        setSuccess(false)
        setIsUpdating(true)
        const updateLimitParameter = {
            playLimit : {
                limit:playLimit,
                duration:playLimitDuration
            },
            depositLimit : {
                limit:depositLimit,
                duration:depositLimitDuration
            }
        }
        
        axios.post('/user/limit/update',updateLimitParameter).then(({data}) => {
            if (data.status === 'success') {
                setSuccess({limit:['Limit Updated Successfully']})
            } else {
                setSuccess({limit:[data.message]})
            }
            setIsUpdating(false)
        })
    }
    
    useEffect(() => {
        fetchUserLimit()
    }, [])
    return (
        <>
            {errors && (
                <div className="mb-3 border-2 border-red-300 bg-red-300/60 px-3 py-2 text-sm text-slate-900">
                    <ul>
                        {Object.keys(errors)?.map(key => (
                            <li key={key}>{errors[key][0]}</li>
                        ))}
                    </ul>
                </div>
            )}
            {success && (
                <div className="mb-3 border-2 border-green-300 bg-green-300/60 px-3 py-2 text-sm text-slate-900">
                    <ul>
                        {Object.keys(success)?.map(key => (
                            <li key={key}>{success[key][0]}</li>
                        ))}
                    </ul>
                </div>
            )}
            {dataFetched ? (
                <form className="mb-8 grid gap-4 grid-cols-1 lg:grid-cols-3" onSubmit={handleUpdateLimitForm}>
                    <div className="flex-1 space-y-5">
                        <input class="w-full border-2 border-slate-300 bg-zinc-100 p-2 text-sm ring-0 focus:ring-0 hover:border-[#00D4E3] focus:bg-[#EDFBFC]" placeholder="Limit" type="text" defaultValue={playLimit} name="play_limit" onChange={(e) => setPlayLimit(e.target.value)}/>
                        <select className="w-full border-2 border-slate-300 bg-zinc-100 p-2 text-sm ring-0 focus:ring-0 hover:border-[#00D4E3] focus:bg-[#EDFBFC]" onChange={(e) => setPlayLimitDuration(e.target.value)} defaultValue={playLimitDuration}>
                            {
                                Object.keys(perDayData).map((key,index) => (
                                    <option key={index} value={key}>{perDayData[key]}</option>
                                ))
                            }
                        </select>
                        <div className="flex justify-between">
                            <p>Remaining:</p>
                            <p>{remainingPlayLimit}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Until:</p>
                            <p>{remainingUntilPlayLimit}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Pending Change:</p>
                            <p>$100 per Week starts</p>
                        </div>
                    </div>
                    <div className="flex-1 space-y-5">
                        <input class="w-full border-2 border-slate-300 bg-zinc-100 p-2 text-sm ring-0 focus:ring-0 hover:border-[#00D4E3] focus:bg-[#EDFBFC]" placeholder="Limit" type="text" defaultValue={depositLimit} name="deposit_limit" onChange={(e) => setDepositLimit(e.target.value)}/>
                        <select className="w-full border-2 border-slate-300 bg-zinc-100 p-2 text-sm ring-0 focus:ring-0 hover:border-[#00D4E3] focus:bg-[#EDFBFC]" onChange={(e) => setDepositLimitDuration(e.target.value)} defaultValue={depositLimitDuration}>
                            {
                                Object.keys(perDayData).map((key,index) => (
                                    <option key={index} value={key}>{perDayData[key]}</option>
                                ))
                            }
                        </select>
                        <div className="flex justify-between">
                            <p>Remaining:</p>
                            <p>{remainingDepositLimit}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Until:</p>
                            <p>{remainingUntilDepositLimit}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between">
                        <div className='flex-1 space-y-1'>
                            <p>Loss Limit:</p>
                            <p>Your potential Loss Limit: {symbols[currencyCode]}{playLimit} over 1 Day.</p>
                        </div>
                        <div>
                            <div className='mb-5 flex gap-1 items-start'>
                                <InformationCircleIcon className='w-12 h-12'/> 
                                <p>Please note: decreasing a limit will take effect immediately. Increasing a limit will take effect 24 hours after confirmation.</p>
                            </div>
                            <button
                                type="submit"
                                className={cl(
                                    'rounded-md w-full px-8 py-2 text-base font-semibold text-white shadow-md ',
                                    {
                                        'cursor-not-allowed bg-slate-300': isUpdating,
                                        'bg-gradient-to-r from-orange-400 to-orange-500 shadow-orange-700 hover:from-orange-500 hover:to-orange-400': !isUpdating,
                                    },
                                )}>
                                {isUpdating && (
									<div className='absolute'>
										<svg 
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="#FFFFFF"
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
											className='animate-spin h-6 w-6'>
											<path d="M21 12a9 9 0 11-6.219-8.56" />
										</svg>
									</div>
								)}
                                Confirm Limits
                            </button>
                        </div>
                    </div>
                </form>
            ) : 
            <div className='flex justify-center items-center'>
                <svg className="animate-spin h-8 w-8 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-10" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <h1 className="text-4xl font-bold text-gray-900 my-40">
                    Loading...
                </h1>
            </div>
            }
        </>
    )
}
