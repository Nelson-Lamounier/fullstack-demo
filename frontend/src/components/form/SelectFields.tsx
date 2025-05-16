import { ChangeEvent, FC } from "react";

import {
  ChevronDownIcon,
} from "@heroicons/react/20/solid";

interface SelectFieldProp {
  name: string;
  options: string[]; // Array of options
  label: string;
  autoComplete?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: FC<SelectFieldProp> = ({
  name,
  value,
  label,
  autoComplete,
  onChange,
  options,
}) => {
  return (
<>
      <label
        htmlFor={name}
        className="block text-sm/6 font-medium text-gray-900 border-gray-200"
      >
        {label}
      </label>
      <div className="mt-3 grid grid-cols-1">
      <select
        name={name}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
        className=" border border-gray-300 col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 sm:size-4"
      />
    </div>
</>
   
  );
};

export default SelectField;
