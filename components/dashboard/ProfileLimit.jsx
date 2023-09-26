import FormInput from '@/FormInput'
import FormSelect from '@/FormSelect'
import cl from 'classnames'
import { InformationCircleIcon } from '@heroicons/react/20/solid'

export default () => {
    return (
        <form className="mb-8 grid gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="flex-1 space-y-5">
                <FormInput
                    type="text"
                    label="Play Limit"
                    placeholder="Limit"
                    value={50}
                />
                <FormSelect
                    label="Per"
                    options={[
                        '1 Day',
                        '5 Day',
                        '20 Day'
                    ]}
                    isReq={true}
                />
                <div class="flex justify-between">
                    <p>Remaining:</p>
                    <p>550</p>
                </div>
                <div class="flex justify-between">
                    <p>Until:</p>
                    <p>2019 Oct 31, 05:02:55 PM</p>
                </div>
                <div class="flex justify-between">
                    <p>Pending Change:</p>
                    <p>$100 per Week starts</p>
                </div>
                {/* <button type="button" class="items-center w-full rounded-lg bg-gradient-to-r from-green-600 to-lime-500 px-6 py-2 text-sm text-white hover:from-lime-500 hover:to-lime-500">
                    Cancel Pending Change
                </button> */}
            </div>
            <div className="flex-1 space-y-5">
                <FormInput
                    type="text"
                    label="Deposit Limit"
                    placeholder="Limit"
                    value={50}
                />
                <FormSelect
                    label="Per"
                    options={[
                        '1 Day',
                        '5 Day',
                        '20 Day'
                    ]}
                    isReq={true}
                />
                <div class="flex justify-between">
                    <p>Remaining:</p>
                    <p>N/A</p>
                </div>
                <div class="flex justify-between">
                    <p>Until:</p>
                    <p>N/A</p>
                </div>
            </div>
            <div class="flex flex-col justify-between">
                <div className='flex-1 space-y-1'>
                    <p>Loss Limit:</p>
                    <p>Your potential Loss Limit: $50.00 over 1 Day.</p>
                </div>
                <div>
                    <div className='mb-5 flex gap-1 items-start'>
                        <InformationCircleIcon className='w-12 h-12'/> 
                        <p>Please note: decreasing a limit will take effect immediately. Increasing a limit will take effect 24 hours after confirmation.</p>
                    </div>
                    <button
                        type="button"
                        className={cl(
                            'rounded-md w-full px-8 py-2 text-base font-semibold text-white shadow-md ',
                            {
                                'cursor-not-allowed bg-slate-300':false,
                                'bg-gradient-to-r from-orange-400 to-orange-500 shadow-orange-700 hover:from-orange-500 hover:to-orange-400':true,
                            },
                        )}>
                        Confirm Limits
                    </button>
                </div>
            </div>
        </form>
    )
}
