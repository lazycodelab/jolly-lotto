'use client'
import React, { Fragment,useState } from "react"

export default () => {
    return (

        <div className="mb-8 space-y-4">
            <div className="space-y-4">
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
                        {[...Array(5)].map((item, index) => (
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
                                        2019 Sep 11, 13:05PST
                                        </summary>
                                        <p className="mt-2 px-4 leading-relaxed text-gray-700">
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit
                                        </p>
                                    </details>
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">ORD-123456789-01</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">Phone</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">5.00</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    <span className="underline text-orange-400">Bet again</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}