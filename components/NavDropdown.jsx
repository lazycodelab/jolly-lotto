import { Menu, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import Link from 'next/link';

export default () => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            {({ open }) => (
                <>
                    <Menu.Button className={`inline-flex w-full p-2 justify-center text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${open && 'bg-[#F2FEFF] border-[#C2D4D5] border-1 border-t border-l border-r'}`}>
                        Lotteries
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
                        <Menu.Items className="absolute px-4 rounded-t-none pt-2 pb-4 min-h-[300px] min-w-[400px] border-1 border-[#C2D4D5] z-10 left-0 mt-0 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-[#F2FEFF] ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="flex flex-col">
                                <Menu.Item>
                                    <Link href={'/lotteries/1'}>
                                        <div className="max-w-sm w-full lg:max-w-full lg:flex my-1 cursor-pointer">
                                            <div className="my-auto">
                                                <Image
                                                    src={`/images/lotteries/AU.png`}
                                                    width={80}
                                                    height={80}
                                                    alt="icon"
                                                />
                                            </div>
                                            <div className="my-auto leading-normal ms-3">
                                                <p className="text-[#24484B] font-bold text-base">Australian 6/45</p>
                                                <p className="text-[#656565] text-base">AU$ 83 Million</p>                                    
                                            </div>
                                        </div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href={'/lotteries/2'}>
                                        <div className="max-w-sm w-full lg:max-w-full lg:flex my-1 cursor-pointer">
                                            <div className="my-auto">
                                                <Image
                                                    src={`/images/lotteries/CA.png`}
                                                    width={80}
                                                    height={80}
                                                    alt="icon"
                                                />
                                            </div>
                                            <div className="my-auto leading-normal ms-3">
                                                <p className="text-[#24484B] font-bold text-base">Canadian 6/49</p>
                                                <p className="text-[#656565] text-base">CA$ 7.4 Million</p>                                    
                                            </div>
                                        </div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href={'/lotteries/3'}>
                                        <div className="max-w-sm w-full lg:max-w-full lg:flex my-1 cursor-pointer">
                                            <div className="my-auto">
                                                <Image
                                                    src={`/images/lotteries/ES.png`}
                                                    width={80}
                                                    height={80}
                                                    alt="icon"
                                                />
                                            </div>
                                            <div className="my-auto leading-normal ms-3">
                                                <p className="text-[#24484B] font-bold text-base">Euromillions</p>
                                                <p className="text-[#656565] text-base">€53 Million</p>                                    
                                            </div>
                                        </div>
                                    </Link>
                                </Menu.Item>
                                <p className='underline text-[#00AEB9] text-center pt-4 cursor-pointer'>View More</p>
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}