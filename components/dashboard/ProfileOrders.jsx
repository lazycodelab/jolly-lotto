'use client'
import axios from '../../lib/axios'
import moment from 'moment'
import React, { useEffect,useState } from "react"

export default () => {
    const [orderHistory, setOrderHistory] = useState([])
    const [isOrderFetched, setIsOrderFetched] = useState(false)
    useEffect(() => {
        axios.get('/user/order-history')
        .then((res) => {
            const response = res.data;
            if (response.status === 'success') {
                setOrderHistory(response.data)
            }
        })
        .catch(error => {
            console.log(error);
            if (error.response.status !== 422) throw error

            setErrors(error.response.data.errors)
        }).finally(() => {
            setIsOrderFetched(true)
        })
    }, [])
    return (

        <div className="mb-8 space-y-4">
            <div className="space-y-4">
                {
                isOrderFetched ? 
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                            Sales Date
                            </th>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                            Order Number
                            </th>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                            Order Via
                            </th>
                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                            Total Bet Amount
                            </th>
                            <th className="text-start px-4 py-2 font-medium text-gray-900"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            orderHistory.map((item, index) => (
                                <tr key={index}>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                                            <summary className="cursor-pointer flex items-center gap-1.5 text-gray-900">
                                            <svg
                                                className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                            {moment(item.saleDate).format('Do MMM, h:mmA')}
                                            </summary>
                                            <p className="mt-2 px-4 leading-relaxed text-gray-700">
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit
                                            </p>
                                        </details>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.orderNumber}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.source}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.totalAmount}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        <span className="underline text-orange-400">Bet again</span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table> :
                    <div className='flex justify-center items-center'>
                    <svg className="animate-spin h-8 w-8 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-10" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <h1 className="text-4xl font-bold text-gray-900 my-40">
                        Loading...
                    </h1>
                </div>}
            </div>
        </div>
    )
}