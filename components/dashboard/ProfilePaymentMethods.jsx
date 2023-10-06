'use client'
import { useState,useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { getMonths, getNextYears } from '@/Helpers'
import FormInput from '@/FormInput'
import FormSelect from '@/FormSelect'
import axios from 'lib/axios'

export default () => {
    const [errors, setErrors] = useState(false)
	const [success, setSuccess] = useState(false)
    const [showBillingForm, setShowBillingForm] = useState(false)
    const [methods, setMethods] = useState([])
    const [selected, setSelected] = useState('')
    const [isPaymentMethodFetched,setIsPaymentMethodFetched] = useState(false)
    const fetchPaymentMethods = () => {
		setIsPaymentMethodFetched(false)
		axios.get('/payment/gateways').then(({ data }) => {
            setSuccess(false)
            setErrors(false)
			setMethods(data);
			setSelected(data[0]?.cardNumber);
			setIsPaymentMethodFetched(true)
		})
	}

    const [isDeleting, setIsdeleting] = useState(false)
    const deletePaymentMethod = () => {
        setSuccess(false)
        setErrors(false)
        setIsdeleting(true)
        const index = methods.findIndex((method) => method.cardNumber === selected)
        const paymentMethodID = methods[index].id;
        axios.delete(`/payment/gateways/${paymentMethodID}`).then(({data}) => {
            if (data.status === 'success') {
                setSuccess({card: ['Card Deleted Successfully!']})
                methods.splice(index, 1)
            } else {
                setErrors({card: [data.message]})
            }
            setIsdeleting(false)
        })
    }
    useEffect(() => {
        fetchPaymentMethods()
    },[])

    const cardValidation = () => {
		function validateCVV(cvv) {
			const cvvPattern = /^[0-9]{3,4}$/;
			return cvvPattern.test(cvv);
		}
		function validateLuhnAlgorithm(cardNumber) {
			let sum = 0;
			let isEven = false;
		
			for (let i = cardNumber.length - 1; i >= 0; i--) {
				let digit = parseInt(cardNumber.charAt(i), 10);
		
				if (isEven) {
					digit *= 2;
					if (digit > 9) {
						digit -= 9;
					}
				}
				sum += digit;
				isEven = !isEven;
			}
			return sum % 10 === 0;
		}
		function validateExpirationDate(expirationMonth, expirationYear) {
			const currentDate = new Date();
			const currentYear = currentDate.getFullYear().toString();
			const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
		
			if (expirationYear > currentYear) {
				return true;
			} else if (expirationYear === currentYear && expirationMonth >= currentMonth) {
				return true;
			}
			return false;
		}

		return {
			validateCVV: validateCVV,
			validateLuhnAlgorithm: validateLuhnAlgorithm,
			validateExpirationDate: validateExpirationDate,
		};
	}

    const [addingNewMethod, setAddingNewMethod] = useState(false);
    const handleAddNewMethod = e => {
		e.preventDefault()
		const form = e.target
		const method = {}

		for (let field of form.elements) {
			if (field.name) {
				method[field.name] = field.value
			}
		}
		if (method.cardNumber !== '') {
			if (!cardValidation().validateLuhnAlgorithm(method.cardNumber)) {
				setErrors({cvv: ['Invalid Card Number']})
				return;
			} else {
				setErrors(false)
			}
		} else {
			setErrors({cvv: ['Please enter a valid card number']})
			return;
		}
		if (method.cardHolder === '') {
			setErrors({cvv: ['Please enter cardholder name']})
			return;
		} else {
			setErrors(false)
		}
		if (method.cvv !== '') {
			if (!cardValidation().validateCVV(method.cvv)) {
				setErrors({cvv: ['Invalid CVV']})
				return;
			} else {
				setErrors(false)
			}
		} else {
			setErrors({cvv: ['Please enter a valid cvv']})
			return;
		}
		if (!cardValidation().validateExpirationDate(method.month, method.year)) {
			setErrors({cvv: ['Invalid Expiry Date']})
			return;
		} else {
			setErrors(false)
		}
		setAddingNewMethod(true)
        setSuccess(false)
        setErrors(false)
        axios.post('payment/gateways/new', method).then(({data}) => {
            if (data.status === 'success') {
                form.reset()
                setSuccess({card: ['Card Added Successfully']})
                fetchPaymentMethods()
            } else {
                setErrors({card: [data.message]})
            }
            setAddingNewMethod(false)
        });
	}
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
            <div className="my-5 grid gap-4 grid-cols-1 lg:grid-cols-3">
                <div>
                    <h1 className='mb-3 font-bold text-lg text-black'>Select Payment Method</h1>
                    <div className="mx-auto w-full max-w-md">
                        {
                            isPaymentMethodFetched && methods.length === 0 && <p className='text-center my-8 text-orange-400 font-bold'>No Payment Method Found</p>
                        }
                        {
                            isPaymentMethodFetched === true && methods.length > 0 ? (
                                <>
                                    <RadioGroup value={selected} onChange={setSelected}>
                                        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                        <div className="space-y-2 max-h-[22rem] overflow-y-auto p-2">
                                            {methods.map((card) => (
                                                <RadioGroup.Option
                                                    key={card.id}
                                                    value={card.cardNumber}
                                                    className={({ active, checked }) => `${checked ? 'bg-cyan-100 bg-opacity-75 text-black' : 'bg-white'} relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`}>
                                                    {({ active, checked }) => (
                                                    <>
                                                        <div className="flex w-full items-center justify-between">
                                                            <div className="flex items-center">
                                                                <div className="flex gap-2 items-center">
                                                                    {
                                                                        card.creditCardType.name === 'Visa' ? <VisaCardIcon className="h-10 w-10 pr-2" /> : <MasterCardIcon className="h-10 w-10 pr-2" />
                                                                    }
                                                                    <div className='flex flex-col gap-1'>
                                                                        <RadioGroup.Label as="p" className={`font-medium  ${checked ? 'text-black' : 'text-gray-900'}`}>
                                                                            {card.maskCardNumber}
                                                                        </RadioGroup.Label>
                                                                        <RadioGroup.Label as="span" className={`${checked ? 'text-black' : 'text-gray-900'}`}>
                                                                            {card.cardHolder}
                                                                        </RadioGroup.Label>
                                                                    </div>
                                                                    <RadioGroup.Description
                                                                        as="span"
                                                                        className={`inline ${
                                                                        checked ? 'text-sky-100' : 'text-gray-500'
                                                                        }`}
                                                                    >
                                                                    </RadioGroup.Description>
                                                                </div>
                                                            </div>
                                                            {checked && (
                                                                <div className="shrink-0 text-white">
                                                                    <CheckIcon className="h-6 w-6" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                    {
                                        isDeleting ? (<p className='text-end text-orange-400 font-bold mt-2 cursor-not-allowed'>Deleting...</p>) : (<p className='text-end underline mt-2 cursor-pointer' onClick={() => deletePaymentMethod()}>Remove Selected Payment Method</p>)
                                    }
                                </>
                            ) : isPaymentMethodFetched !== true ? (
                                <>
                                    {[...Array(3)].map((data,index) => (
                                        <div className="space-y-5 animate-pulse rounded-lg bg-white/5 p-3 border my-2" key={index}>
                                            <div className='flex items-center gap-2'>
                                                <div className="h-12 w-1/3 rounded bg-gray-300"></div>
                                                <div className='flex flex-col w-full gap-1.5'>
                                                    <div className="h-2.5 w-4/5 rounded bg-gray-300"></div>
                                                    <div className="h-2.5 w-3/5 rounded bg-gray-300"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : ''
                        }
                    </div>
                </div>
                <div>
                    <h1 className='mb-3 font-bold text-lg text-black'>Details</h1>
                    <p className='text-orange-400 text-center font-bold'>
                        We are UNABLE to process CREDIT CARD payments in your country. Please provide a DEBIT CARD.
                    </p>
                    <form className={'mt-3'} onSubmit={handleAddNewMethod}>
						<FormInput name="cardNumber" label="Card Number" />
						<div className="mt-2 flex gap-x-3">
							<FormInput
								name="cardHolder"
								label="Name on Card"
							/>
							<FormInput name="cvv" label="CVV Number" />
						</div>
						<div className="mt-2 flex gap-x-3">
							<FormSelect
								name="month"
								label="Expiry Month"
								options={getMonths()}
							/>
							<FormSelect
								name="year"
								label="Expiry Year"
								options={getNextYears()}
							/>
						</div>
                        <div className='text-center mt-3'>
                            <button
								type="submit"
								className={`mt-2 relative rounded-md px-8 py-2 ${addingNewMethod ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-400 to-orange-500 shadow-orange-700 hover:from-orange-500 hover:to-orange-400'} w-full py-1.5 text-base text-white shadow-md`}
								{...(addingNewMethod && { disabled: true })}
								>
								{addingNewMethod && (
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
								Add Card
							</button>
                        </div>
					</form>
                </div>
                <div>
                    <h1 className='mb-3 font-bold text-lg text-black'>Billing Address</h1>
                    <input
                        id="term-2"
                        type="checkbox"
                        name=""
                        checked={!showBillingForm}
                        onChange={() =>
                            setShowBillingForm(!showBillingForm)
                        }
                    />
                    <label
                        htmlFor="term-2"
                        className="cursor-pointer text-xs ps-1 text-gray-500 select-none">
                        Use my stored address as billing address.
                    </label>
                    {showBillingForm && (
                        <div className="mt-5">
                            <FormSelect
                                label="Country"
                                options={{
                                    UK: 'United Kingdom',
                                    US: 'United States',
                                    CA: 'Canada',
                                    NZ: 'New Zealand',
                                    JP: 'Japan',
                                    AU: 'Australia'
                                }}
                            />
                            <div className="mt-2 flex gap-x-3">
                                <FormInput label="Address" isReq={true} />
                            </div>
                            <div className="flex gap-x-3">
                                <FormInput label="City" name='city' isReq={true} />
                                <FormInput label="State" name='state' isReq={true} />
                                <FormInput label="Post Code" name="postalCode" isReq={true} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* <div className='flex justify-end mb-8'>
                <button
                    type="submit"
                    className={'rounded-md w-[33%] px-8 py-2 text-base font-semibold text-white shadow-md bg-gradient-to-r from-orange-400 to-orange-500 shadow-orange-700 hover:from-orange-500 hover:to-orange-400'}>
                    Save
                </button>
            </div> */}
        </>
    )
}

function CheckIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx={12} cy={12} r={12} fill="#000" opacity="0.2" />
        <path
          d="M7 13l3 3 7-7"
          stroke="#000"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

const VisaCardIcon = (props) => {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="12.909" viewBox="0 0 40 12.909" {...props}>
        <g id="Visa" transform="translate(12139 10935)">
            <path id="Path_5001" data-name="Path 5001" d="M277.461,342.954a22.282,22.282,0,0,1,.9-2.288l.428,2.336c.084.388.166.771.25,1.156.078.354.191.783.239,1.134l-2.669-.006.848-2.332Zm-2.533,6.8c.229-.128.587-1.843.789-1.89l4.009,0c.129.026.109.114.138.27.1.534.257,1.1.339,1.617l2.994-.007-2.611-12.489c-.877-.018-1.838-.032-2.71.011a1.531,1.531,0,0,0-1.54,1.133c-.511,1.258-1.044,2.525-1.575,3.773s-1.053,2.526-1.586,3.794l-1.57,3.785Z" transform="translate(-12382.195 -11272.015)" fill="#0066b2" fillRule="evenodd"/>
            <path id="Path_5002" data-name="Path 5002" d="M270.456,340.2l.394-2.724a6.5,6.5,0,0,0-1.512-.385c-2.6-.429-6.118.362-6.748,3.331a3.124,3.124,0,0,0,1.289,3.189c1.2.953,3.17,1.422,3.172,2.432a1.246,1.246,0,0,1-.858,1.045,4.563,4.563,0,0,1-1.639.166,7.66,7.66,0,0,1-2.9-.82l-.465,2.807c.218.049.478.172.721.244,2.49.736,6.18.636,7.827-1.658a3.818,3.818,0,0,0,.6-2.929,2.812,2.812,0,0,0-.63-1.254c-.177-.175-.263-.3-.457-.468-.98-.831-2.081-1.077-2.868-1.758-.322-.277-.744-.578-.3-1.225.505-.736,2.164-.647,2.981-.46a12.748,12.748,0,0,1,1.394.468Z" transform="translate(-12380.776 -11271.979)" fill="#0066b2" fillRule="evenodd"/>
            <path id="Path_5003" data-name="Path 5003" d="M247.231,344.1a8.25,8.25,0,0,0-1.794-3.065,4.139,4.139,0,0,0-.288-.33.991.991,0,0,1-.158-.149,11.209,11.209,0,0,0-2.2-1.682c.067.426.574,2.154.725,2.743l1.431,5.423c.229.9.5,1.8.727,2.69l3.367.022c.045-.2.534-1.282.655-1.578.213-.524.427-1.03.643-1.55.873-2.086,1.69-4.191,2.553-6.289.283-.69,1.074-2.531,1.265-3.094l-3.427,0-3.14,8.492c-.144-.278-.193-1.384-.362-1.632Z" transform="translate(-12378.269 -11272.016)" fill="#0066b2" fillRule="evenodd"/>
            <path id="Path_5004" data-name="Path 5004" d="M260.367,337.239l-3.223.01c-.358,2.069-.67,4.154-1.005,6.222l-.752,4.7c-.075.5-.19,1.069-.224,1.568h3.2l2-12.5Z" transform="translate(-12379.954 -11272.015)" fill="#0066b2" fillRule="evenodd"/>
            <path id="Path_5005" data-name="Path 5005" d="M242.237,338.874a11.208,11.208,0,0,1,2.2,1.682.993.993,0,0,0,.158.149,4.125,4.125,0,0,1,.288.33,8.251,8.251,0,0,1,1.794,3.065c.043-.164-.5-2.7-.582-3.114a22.373,22.373,0,0,0-.682-3.084,1.274,1.274,0,0,0-1.239-.649c-1.213-.038-2.512,0-3.748-.018a3.8,3.8,0,0,0-1.712.168c.006.005.017,0,.02.014s.016.011.021.014c.16.082-.056-.021.045.022l.361.119a14.307,14.307,0,0,1,3.078,1.3Z" transform="translate(-12377.712 -11272.012)" fill="#faa819" fillRule="evenodd"/>
        </g>
    </svg>
    )
}

const MasterCardIcon = (props) => {
    return(        
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="31.122" viewBox="0 0 40 31.122" {...props}>
        <g id="MC_on_light" data-name="MC on light" transform="translate(12062.815 10943)">
            <path id="_Compound_Path_" data-name=" Compound Path " d="M308.454,155.745v-2.06a1.2,1.2,0,0,0-1.263-1.3,1.274,1.274,0,0,0-1.154.584,1.209,1.209,0,0,0-1.085-.584,1.123,1.123,0,0,0-.989.481v-.4h-.676v3.286h.666v-1.888a.79.79,0,0,1,.7-.869.815.815,0,0,1,.129,0c.474,0,.742.309.742.865v1.892h.666v-1.885a.793.793,0,0,1,.709-.869.8.8,0,0,1,.122,0c.488,0,.749.309.749.865v1.892Zm10.7-3.279h-1.195v-1h-.67v1H316.6v.6h.687v1.555c0,.762.268,1.216,1.112,1.216a1.677,1.677,0,0,0,.893-.254l-.206-.584a1.315,1.315,0,0,1-.632.185c-.343,0-.5-.22-.5-.549v-1.576h1.195Zm6.1-.082a1.03,1.03,0,0,0-.893.481v-.4h-.652v3.286h.659V153.9c0-.543.261-.893.728-.893a1.162,1.162,0,0,1,.447.082l.22-.622a1.529,1.529,0,0,0-.508-.089Zm-9.219.343a2.459,2.459,0,0,0-1.339-.343c-.831,0-1.339.391-1.339,1.03,0,.536.371.858,1.106.961l.343.048c.391.055.6.192.6.378,0,.254-.288.419-.776.419a1.718,1.718,0,0,1-1.092-.343l-.343.515a2.453,2.453,0,0,0,1.421.426c.948,0,1.473-.439,1.473-1.064s-.4-.862-1.113-.965l-.343-.048c-.309-.041-.584-.137-.584-.343s.261-.405.652-.405a2.12,2.12,0,0,1,1.03.282Zm9.957,1.374a1.638,1.638,0,0,0,1.555,1.717,1.594,1.594,0,0,0,.162,0,1.716,1.716,0,0,0,1.181-.391l-.343-.515a1.446,1.446,0,0,1-.858.3,1.119,1.119,0,0,1,0-2.228,1.445,1.445,0,0,1,.858.3l.343-.515a1.716,1.716,0,0,0-1.181-.392,1.638,1.638,0,0,0-1.717,1.555,1.6,1.6,0,0,0,0,.162Zm-4.621-1.717a1.587,1.587,0,0,0-1.624,1.717,1.617,1.617,0,0,0,1.514,1.715,1.511,1.511,0,0,0,.159,0,2,2,0,0,0,1.346-.46l-.343-.488a1.566,1.566,0,0,1-.955.343.965.965,0,0,1-.992-.841h2.455V154.1a1.551,1.551,0,0,0-1.548-1.717Zm0,.611a.838.838,0,0,1,.865.81v.021h-1.762a.879.879,0,0,1,.907-.831Zm-8.9,1.109v-1.638h-.659v.4a1.3,1.3,0,0,0-1.064-.481,1.725,1.725,0,1,0,0,3.451,1.3,1.3,0,0,0,1.064-.481v.4h.659Zm-2.661,0a1.03,1.03,0,0,1,.944-1.109c.028,0,.057,0,.086,0a1.119,1.119,0,0,1,0,2.228,1.03,1.03,0,0,1-1.034-1.027c0-.029,0-.057,0-.086Zm25.371-1.717a1.031,1.031,0,0,0-.893.481v-.4h-.652v3.286h.659V153.9c0-.543.261-.893.728-.893a1.163,1.163,0,0,1,.447.082l.22-.618a1.528,1.528,0,0,0-.508-.089Zm5.295,2.891a.34.34,0,0,1,.131.024.328.328,0,0,1,.179.172.321.321,0,0,1,0,.254.328.328,0,0,1-.179.172.322.322,0,0,1-.131.027.343.343,0,0,1-.309-.2.323.323,0,0,1,0-.254.34.34,0,0,1,.072-.1.415.415,0,0,1,.237-.1Zm0,.58a.244.244,0,0,0,.1-.021.261.261,0,0,0,.079-.055.254.254,0,0,0,0-.343.249.249,0,0,0-.079-.055.246.246,0,0,0-.1-.021.255.255,0,0,0-.1.021.248.248,0,0,0-.082.055.254.254,0,0,0,0,.343.257.257,0,0,0,.082.055.252.252,0,0,0,.1.014Zm.021-.409a.137.137,0,0,1,.089.027.087.087,0,0,1,.031.072.082.082,0,0,1-.024.062.119.119,0,0,1-.072.031l.1.113h-.079l-.093-.113h-.031v.113h-.065v-.3Zm-.075.058v.082h.075a.069.069,0,0,0,.041,0,.035.035,0,0,0,0-.031.035.035,0,0,0,0-.031.077.077,0,0,0-.041,0Zm-7.77-1.4v-1.645h-.659v.4a1.3,1.3,0,0,0-1.064-.481,1.725,1.725,0,1,0,0,3.451,1.3,1.3,0,0,0,1.064-.481v.4h.659Zm-2.661,0a1.03,1.03,0,0,1,.944-1.109c.028,0,.057,0,.086,0a1.119,1.119,0,0,1,0,2.228,1.03,1.03,0,0,1-1.034-1.027c0-.029,0-.057,0-.086Zm9.295,0v-2.97h-.659v1.717a1.3,1.3,0,0,0-1.064-.481,1.725,1.725,0,1,0,0,3.451,1.3,1.3,0,0,0,1.064-.481v.4h.659Zm-2.661,0a1.03,1.03,0,0,1,.944-1.109c.029,0,.057,0,.086,0a1.119,1.119,0,0,1-.014,2.215,1.03,1.03,0,0,1-1.033-1.027c0-.027,0-.055,0-.082Z" transform="translate(-12364.029 -11067.805)"/>
            <rect id="Rectangle_3388" data-name="Rectangle 3388" width="10.816" height="19.438" transform="translate(-12048.224 -10940.355)" fill="#ff5f00"/>
            <path id="_Path_2" data-name=" Path 2" d="M312.528,86.813a12.339,12.339,0,0,1,4.721-9.717,12.361,12.361,0,1,0,0,19.438A12.34,12.34,0,0,1,312.528,86.813Z" transform="translate(-12360.065 -11017.449)" fill="#eb001b"/>
            <path id="Path_5006" data-name="Path 5006" d="M409.863,131.841v-.4h.161v-.082h-.409v.082h.161v.4Zm.793,0v-.481h-.124l-.144.343-.144-.343h-.124v.481h.086v-.364l.134.313h.093l.134-.313v.364Z" transform="translate(-12433.85 -11054.816)" fill="#f79e1b"/>
            <path id="Path_5007" data-name="Path 5007" d="M375.5,86.8a12.361,12.361,0,0,1-20,9.717,12.361,12.361,0,0,0,0-19.438,12.361,12.361,0,0,1,20,9.717Z" transform="translate(-12398.313 -11017.439)" fill="#f79e1b"/>
        </g>
    </svg>
    )
}
