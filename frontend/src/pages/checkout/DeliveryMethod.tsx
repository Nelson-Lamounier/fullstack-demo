import { FC } from "react";
import { Radio, RadioGroup } from "@headlessui/react";

import { CheckCircleIcon } from "@heroicons/react/20/solid";

import  deliveryMethods  from "@/types/form/DeiveryMethod";

interface DeliveryMethodProp {
  selectedDeliveryMethod: string;
  onInputChange: (value: string) => void;
  onFeeChange: (fee: number) => void; // Update delivery fee
  
}

const DeliveryMethod: FC<DeliveryMethodProp> = ({
  selectedDeliveryMethod,
  onInputChange,
  onFeeChange,
}) => {
  return (
    <div className="mt-10 border-t border-gray-200 pt-10">
      <h2 className="text-lg font-medium text-gray-900">Delivery method</h2>
      <fieldset aria-label="Delivery method" className="mt-4">
        <RadioGroup
          value={selectedDeliveryMethod}
          onChange={(value) => {
            const selectedMethod = deliveryMethods.find(
              (method) => method.id === value
            );
            onInputChange(value); // Update the selected delivery method in the parent
            onFeeChange(selectedMethod?.price || 0); // Update the delivery fee in the parent
          }}
          className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
        >
          {deliveryMethods.map((deliveryMethod) => (
            <Radio
              key={deliveryMethod.id}
              value={deliveryMethod.id}
              aria-label={deliveryMethod.title}
              aria-description={`${deliveryMethod.turnaround} for ${deliveryMethod.price}`}
              className={({ checked }) =>
                `group relative flex cursor-pointer rounded-lg border ${
                  checked ? "border-indigo-600" : "border-gray-300"
                } bg-white p-4 shadow-sm focus:outline-none`
              }
            >
              {({ checked }) => (
                <>
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className="block text-sm font-medium text-gray-900">
                        {deliveryMethod.title}
                      </span>
                      <span className="mt-1 flex items-center text-sm text-gray-500">
                        {deliveryMethod.turnaround}
                      </span>
                      <span className="mt-6 text-sm font-medium text-gray-900">
                      €{deliveryMethod.price.toFixed(2)}
                      </span>
                    </span>
                  </span>
                  {checked && (
                    <CheckCircleIcon
                      aria-hidden="true"
                      className="size-5 text-indigo-600 group-not-data-checked:hidden"
                    />
                  )}
                  <span
                    className={`pointer-events-none absolute -inset-px rounded-lg border-2 ${
                      checked ? "border-indigo-500" : "border-transparent"
                    }`}
                  />
                </>
              )}
            </Radio>
          ))}
        </RadioGroup>
      </fieldset>
    </div>
  );
};

export default DeliveryMethod;
