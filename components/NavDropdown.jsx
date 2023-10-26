import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import Link from 'next/link';
import { useGlobalContext } from '@/../context/appProvider';
import { symbols } from '@/Helpers'

export default ({navTitle , navType}) => {
    const { lotteryProducts } = useGlobalContext()
    return (
        <Menu as="div" className="relative inline-block text-left">
            {({ open }) => (
                <>
                    <Menu.Button className={`inline-flex w-full p-2 justify-center text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${open && 'bg-[#F2FEFF] border-[#C2D4D5] border-1 border-t border-l border-r'}`}>
                        {navTitle}
                        <ChevronDownIcon
                            className="ml-1 h-5 w-5"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute rounded-t-none py-4 min-h-[300px] min-w-[400px] border-1 border-[#C2D4D5] z-10 left-0 mt-0 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-[#F2FEFF] ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="flex flex-col">
                                {
                                    lotteryProducts.map((product,index) => (
                                        <Menu.Item key={index}>
                                            {({ active }) => (
                                                <Link href={`/lotteries/${product.id}${navType === 'results' ? '/results' : ''}`}>
                                                    <div className={`max-w-sm w-full lg:max-w-full lg:flex gap-3 cursor-pointer px-4 py-3 ${active ? 'bg-[#24484b] transition-colors' : ''}`}>
                                                        <div className="my-auto">
                                                            <Image
                                                                src={`/images/lotteries/${product.lottery.country_code}_S.png`}
                                                                width={60}
                                                                height={60}
                                                                alt="icon"
                                                            />
                                                        </div>
                                                        <div className="my-auto leading-normal ms-3">
                                                            <p className={`font-bold text-base transition-colors ${active ? 'text-white' : 'text-[#24484B]'}`}>{product.lotteryName}</p>
                                                            <p className={`text-base transition-colors ${active ? 'text-white' : 'text-[#656565]'}`}>{symbols[product.lottery.currency_code]}{product.price} MILLION</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    ))
                                }
                                <p className='underline text-[#00AEB9] text-center pt-4 cursor-pointer'>View More</p>
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}