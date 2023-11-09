import { useState } from 'react'
import { useGlobalContext } from "@/../context/appProvider"
import cx from 'classnames'
import { useAuth } from 'hooks/auth'
import FormInput from '@/FormInput'
import FormSelect from '@/FormSelect'
import PaymentMethods from '@/PaymentMethods'
import { getMonths, getNextYears} from '@/Helpers'
import { usePathname } from 'next/navigation'

export default function ({isFeteched,methods,setMethods,selected,setSelected,fetchPaymentMethods,setIsOpen = null}) {
    const { addMethod,addFunds } = useAuth()
	const { setWalletBalance } = useGlobalContext()
    const pathname = usePathname()

	const [showBillingForm, setShowBillingForm] = useState(false)
	const [errors, setErrors] = useState(false)
	const [success, setSuccess] = useState(false)
	// For Add Payment Method Card Form
	const [showCardForm, setShowCardForm] = useState(false)
	// For Payment Methods
	const [selectedCard, setSelectedCard] = useState(0);
	const [addingNewMethod, setAddingNewMethod] = useState(false);
	// For Funds
	const [addFundsAmount, setAddFundsAmount] = useState(5);
	const [isFundsBelowMin, setIsFundsBelowMin] = useState(false);
	const [addingFunds, setAddingFunds] = useState(false);


	const handlePaymentAmount = (amount) => {
		setAddFundsAmount(amount);
	}

	const handleAddPayment = () => {
		if(isFundsBelowMin == true) { 
			setErrors({amount: ['Amount should be greater than 5']});
			return; 
		} else {
			setErrors(false);
		}
		if (methods[selectedCard] == undefined || methods[selectedCard] == null) {
			setErrors({card: ['Please select a card to add funds to wallet']});
			return;
		} else {
			setErrors(false);
		}
		setAddingFunds(true);
		const paymentPayload = {
			mode: 'card',
			amount: addFundsAmount,
			paymentMethodCode:methods[selectedCard].paymentMethodCode,
			cardHolder:methods[selectedCard].cardHolder,
			cardNumber:methods[selectedCard].cardNumber,
			cardCVV:methods[selectedCard].cvv,
			expiryMonth:methods[selectedCard].month,
			expiryYear:methods[selectedCard].year,
		};
		addFunds({ setErrors, setSuccess, paymentPayload, setAddingFunds, setWalletBalance }).then(() => {
            setTimeout(() => {
                setIsOpen(false)
            }, 5000);
        })
	}

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
		addMethod({ setErrors, setSuccess, method, form, setShowCardForm, setAddingNewMethod, fetchPaymentMethods})
	}
    return (
        <>
            {errors && (
                <div className="my-3 border-2 border-red-300 bg-red-300/60 px-3 py-2 text-sm text-slate-900">
                    <ul>
                        {Object.keys(errors)?.map(key => (
                            <li key={key}>{errors[key][0]}</li>
                        ))}
                    </ul>
                </div>
            )}
            {success && (
                <div className="my-3 border-2 border-green-300 bg-green-300/60 px-3 py-2 text-sm text-slate-900">
                    <ul>
                        {Object.keys(success)?.map(key => (
                            <li key={key}>{success[key][0]}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mx-auto grid w-full grid-cols-1 lg:grid-cols-2 gap-x-5 rounded border p-5">
                <div>
                    <p className="font-medium">
                        Select amount to add to wallet.
                    </p>
                    <span className="inline-flex overflow-hidden rounded-lg border-3 border-b-cyan-400 bg-cyan-500">
                        {
                            [40,50,75,100,200,500].map((item,index) => (
                                <button className="inline-block p-2 tracking-wide border-l-black border-r-black border border-t-0 border-b-0 text-white font-bold bg-cyan-500 text-sm md:text-base hover:bg-cyan-600 relative last:border-r-0 first:border-l-0" key={index} onClick={() => handlePaymentAmount(item)}>
                                    <sup>£</sup>{item}
                                </button>
                            ))
                        }
                    </span>

                    <p className="mt-3 font-medium">
                        or Enter Custom Amount* (min € 5.00)
                    </p>
                    <input
                        type="text"
                        placeholder="£5.00"
                        className={`w-full border-2 border-slate-300 bg-zinc-100 p-2 text-sm ring-0 focus:ring-0 ${isFundsBelowMin ? 'border-red-500 focus:border-red-500 active:border-red-500 bg-red-200' : 'hover:border-[#00D4E3] focus:bg-[#EDFBFC]'}`}
                        value={addFundsAmount}
                        onChange={(e) => {
                            setAddFundsAmount(e.target.value);
                            setIsFundsBelowMin(e.target.value < 5 ? true : false);
                        }}
                    />
                </div>

                <div>
                    <p className="font-medium">
                        Select a New Payment Method
                    </p>
                    {
                        isFeteched === true ? (
                            <PaymentMethods methods={methods} setMethods={setMethods} selected={selected} setSelected={setSelected} setShowCardForm={setShowCardForm} setSelectedCard={setSelectedCard} />
                        ) :
                            (
                                <p className='text-center text-lg mt-2'>Loading...</p>
                            )
                    }

                    <form
                        className={cx('mt-3', {
                            block: showCardForm,
                            hidden: !showCardForm,
                        })}
                        onSubmit={handleAddNewMethod}>
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
                        <div className="mt-2 flex items-center gap-x-2">
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
                                className="cursor-pointer text-xs text-gray-500">
                                Use my stored address as billing address.
                            </label>
                        </div>
                        {/* Billing Address */}
                        {showBillingForm && (
                            <div className="mt-5">
                                <h3 className="text-xl font-medium">Billing Address</h3>

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
                        <button
                            type="submit"
                            className={`mt-5 relative rounded-md px-8 py-2 ${addingNewMethod ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-400 to-orange-500 shadow-orange-700 hover:from-orange-500 hover:to-orange-400'} w-full py-1.5 text-base text-white shadow-md`}
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
                    </form>
                </div>
            </div>

            <hr className="mt-5" />
            <div className='text-center'>
                <button
                    onClick={handleAddPayment}
                    type="button"
                    className={`mt-5 w-full rounded-[13px] ${addingFunds ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-400 to-orange-500 shadow-orange-700 hover:from-orange-500 hover:to-orange-400'} px-14 py-2.5 text-lg text-white shadow-md`}
                    {...(addingFunds && { disabled: true })}
                >
                    {addingFunds && (
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
                                className='animate-spin h-7 w-7'>
                                <path d="M21 12a9 9 0 11-6.219-8.56" />
                            </svg>
                        </div>
                    )}
                    Add Funds
                </button>
            </div>
        </>
    )
}
