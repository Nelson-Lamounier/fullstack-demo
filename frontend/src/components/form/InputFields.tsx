import { ChangeEvent, FC } from "react";

interface InputFieldProps {
  name: string;
  type: string;
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  className?
  :string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputFieldProps> = ({
  name,
  type,
  value,
  label,
  placeholder,
  required = true,
  autoComplete,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm/6 font-medium text-gray-900 border-gray-200"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          name={name}
          type={type}
          value={value}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={onChange}
          className=" border border-gray-300 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 hover:border-gray-500 focus-within:border-indigo-600 sm:text-sm/6 "
        />
      </div>
    </div>
  );
};

export default InputField;
