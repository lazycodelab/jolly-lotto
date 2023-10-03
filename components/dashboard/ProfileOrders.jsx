'use client'
import axios from '../../lib/axios'
import moment from 'moment'
import React, { useEffect,useState,Fragment } from "react"

export default () => {
    const [orderHistory, setOrderHistory] = useState([])
    const [isOrderFetched, setIsOrderFetched] = useState(false)
    const [error, setError] = useState(false)
    const [openRows, setOpenRows] = useState([]);

    const toggleRow = (index) => {
      const updatedOpenRows = [...openRows];
      updatedOpenRows[index] = !updatedOpenRows[index];
      setOpenRows(updatedOpenRows);
    };

    useEffect(() => {
        axios.get('/user/order-history')
        .then((res) => {
            const response = res.data;
            if (response.status === 'success') {
                setOpenRows(response.data.map(() => false))
                setOrderHistory(response.data)
            } else {
                setError(true)
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
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border-8">
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
                                Total Bet Amount (GBP)
                            </th>
                            <th className="text-start px-4 py-2 font-medium text-gray-900"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            !error ? 
                            (
                                orderHistory.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <tr className="group cursor-pointer">
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                <div className="flex" onClick={() => toggleRow(index)}>
                                                    <svg
                                                    className={`h-5 w-5 shrink-0 transition duration-300 ${
                                                        openRows[index] ? '-rotate-180' : ''
                                                    }`}
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
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.orderNumber}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.source}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.totalAmount}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            <span className="underline text-orange-400">Bet again</span>
                                            </td>
                                        </tr>
                                        <tr className={`${openRows[index] ? 'table-row' : 'hidden'}`}>
                                            <td colSpan="5" className="whitespace-nowrap px-4 py-2 text-gray-700">    
                                                <table className="divide-y-2 divide-gray-200 bg-white text-sm overflow-x-auto border-s-8">
                                                    <thead>
                                                        <tr>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Item #
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Product
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Type
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Subcription
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Promo Code
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Lines
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Draws
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Price per unit
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Price sum
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Promo Amount
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Bet Amount
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Billing Interval
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Source
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Status
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Fulfilment Date
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Total Winnings (product currency)
                                                            </th>
                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                Total Winnings (account currency)
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {
                                                            item.orderItems.map((orderItem, index) => (
                                                                <React.Fragment key={index}>
                                                                    <tr className="group cursor-pointer">
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{index + 1}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{orderItem.productName}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{orderItem.productType}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{orderItem.subscription}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{orderItem.promoCode || 'N/A'}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{orderItem.ordinal}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{orderItem.draws}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{orderItem.unitPrice}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{orderItem.sumPrice}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{orderItem.promoAmount}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{orderItem.betAmount}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{orderItem.billingCycle || 'Once'}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.source}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{orderItem.status}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(orderItem.fulfillmentDate).format('YYYY MMM DD')}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{orderItem.totalWinningsInProduct || 'N/A'}</td>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{orderItem.totalWinningsInAccount || 'N/A'}</td>
                                                                    </tr>
                                                                </React.Fragment>
                                                            ))
                                                        }
                                                        <tr className='table-row'>
                                                            <td colSpan="5" className="whitespace-nowrap px-4 py-2 text-gray-700">    
                                                                <table className="divide-y-2 divide-gray-200 bg-white text-sm overflow-x-auto border-s-8">
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                                Draw Date
                                                                            </th>
                                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                                Settled
                                                                            </th>
                                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                                Board Numbers
                                                                            </th>
                                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                                Matching Numbers
                                                                            </th>
                                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                                Actual Winning Numbers
                                                                            </th>
                                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                                Win Amount
                                                                            </th>
                                                                            <th className="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
                                                                                Ticket Serial Number
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className="divide-y divide-gray-200">
                                                                        {
                                                                            item.orderItems[0].ticketBetResults.map((ticketItem, index) => (
                                                                                <React.Fragment key={index}>
                                                                                    <tr className="group cursor-pointer">
                                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(ticketItem.drawDate).format('YYYY MMM DD')}&nbsp;{ticketItem.settled === 'No' ? '(Pending)' : ''}</td>
                                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ticketItem.settled}</td>
                                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ticketItem.board.replace(' ',',')}</td>
                                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ticketItem.matchingNumbers || 'N/A'}</td>
                                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ticketItem.actualWinningNumbers || 'N/A'}</td>
                                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ticketItem.accountWinAmount || 'N/A'}</td>
                                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{ticketItem.serialNumber}</td>
                                                                                    </tr>
                                                                                </React.Fragment>
                                                                            ))
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td> 
                                        </tr>
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr className='table-row'>
                                    <td colSpan={5} className='text-center py-2'>No data found!</td>
                                </tr>
                            )
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