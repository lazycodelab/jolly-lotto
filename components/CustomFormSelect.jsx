// import Image from 'next/image';

// export default ({
// 	label,	
// 	options = [],
//     handleFunction = () => {},
//     selectedValue = null,
//     toggleFunction = () => {},
//     isOpen = false,
// }) => {

// 	return (
// 		<div className="relative w-100">
//             <div className='flex flex-1 flex-col gap-y-1'>
//                 <label className="text-sm font-medium text-gray-800">
//                     {label}
//                     <sup className="text-red-500">*</sup>
//                 </label>
//                 <button type='button' className="flex w-full hover:border-[#00D4E3] items-center text-sm border-2 border-slate-300 justify-between bg-zinc-100 p-2 ring-0 focus:ring-0 pr-0" onClick={() => toggleFunction()}>
//                     <span>{options[selectedValue]}</span>
//                     <Image
//                         src="/resources/emailImages/arrow.svg"
//                         width={17}
//                         alt="arrow"
//                         height={17}
//                         className={`transform ${isOpen && `rotate-180`}`}
//                     />
//                 </button>
//             </div>
//             <ul className={`z-[5] absolute w-full bg-gray-50 ring-1 ring-gray-300 ${!isOpen && `hidden`}`}>
//                 {
//                     Object.keys(options).map(k => {
//                         const _textValue = options[k]
//                         let _o = k
//                         _o = k.toString()
//                         _o = k.padStart(2, '0')
//                         return (
//                             <li className={`cursor-pointer select-none p-2 hover:bg-white active:bg-[#24484B] active:text-white ${selectedValue == k ? 'text-[#00AEB9] bg-gray-200' : ''}`} key={k} onClick={() => handleFunction(k)}>{_textValue}</li>
//                         )
//                     })
//                 }
//             </ul>
//         </div>
// 	)
// }
import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export default ({
	label,
	options = [],
    setFunction,
    selectedValue = null,
}) => {

	return (
		<Listbox value={selectedValue} onChange={setFunction}>
            <div className="relative">
                <div className='flex flex-1 flex-col gap-y-1'>
                    <label className="text-sm font-medium text-gray-800">
                        {label != '' ? <span>{label} <sup className="text-red-500">*</sup></span> : '' }
                    </label>
                    <Listbox.Button className="flex relative w-full hover:border-[#00D4E3] items-center text-sm border-2 border-slate-300 justify-between bg-zinc-100 p-2 ring-0 focus:ring-0 pr-0">
                        <span className="block truncate">{options[selectedValue] || selectedValue }</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        </span>
                    </Listbox.Button>
                </div>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Listbox.Options className="absolute z-[3] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {
                        Object.keys(options).map(k => {
                            const _textValue = options[k]
                            return (
                                <Listbox.Option key={k}
                                    className={({ active }) =>
                                        `relative active:bg-[#24484B] active:text-white cursor-pointer select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-white' : 'text-gray-900 bg-gray-100'
                                        }`
                                    }
                                    value={options[selectedValue] != undefined ? k : _textValue}
                                    >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium text-[#00AEB9]' : 'font-normal'}`}>
                                                {_textValue}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#00AEB9]">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            )
                        })
                    }
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
	)
}
