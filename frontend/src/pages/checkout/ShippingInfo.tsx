import { ChangeEvent, FC } from "react";


import { FormFields } from "@/types/form/FormField";




import SelectField from "@/components/form/SelectFields";
import InputField from "@/components/form/InputFields";


interface ShippingInfoProps {
    formFields: FormFields;
    selectedCountry: string;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onCountryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const countryOptions = ["Ireland", "UK", "France", "Germany", "USA"];

const ShippingInfo: FC<ShippingInfoProps> = ({    formFields,
    selectedCountry,
    onInputChange,
    onCountryChange,
}) => {
    const { FullName, Line1, Line2, city, state, postal_code, phone } =
    formFields;


  return (
    <>
      <div className="mt-10 border-t border-gray-200 pt-10">
        <h2 className="text-lg font-medium text-gray-900">
          Shipping information
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div className="sm:col-span-2">
            <div className="mt-2">
              <InputField
                name="FullName"
                type="text"
                value={FullName}
                label="Full Name"
                autoComplete="Full Name"
                placeholder="Full Name"
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="mt-2">
              <InputField
                name="Line1"
                type="text"
                value={Line1}
                label="Address"
                autoComplete="Address Line 1"
                placeholder="Address Line 1"
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <div className="mt-2">
              <InputField
                name="Line2"
                type="text"
                value={Line2}
                label=" Apartment, suite, etc."
                autoComplete="Address Line 2"
                placeholder="Address Line 2"
                onChange={onInputChange}
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <InputField
                name="city"
                type="text"
                value={city}
                label="City"
                autoComplete="City"
                placeholder="City"
                onChange={onInputChange}
              />
            </div>
          </div>

          <div>
            <SelectField
              name="country"
              autoComplete="country-name"
              label="Country"
              options={countryOptions}
              value={selectedCountry}
              onChange={onCountryChange}
            ></SelectField>
          </div>

          <div>
            <div className="mt-2">
              <InputField
                name="state"
                type="text"
                value={state}
                label=" State/Province"
                autoComplete="State/Province"
                placeholder="State/Province"
                onChange={onInputChange}
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <InputField
                name="postal_code"
                type="text"
                value={postal_code}
                label=" Postal Code"
                autoComplete="postal_code"
                placeholder="postal_code"
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <div className="mt-2">
              <InputField
                name="phone"
                type="Phone"
                value={phone}
                label=" Phone Number"
                autoComplete="Phone Number"
                placeholder="Phone Number"
                onChange={onInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingInfo;
