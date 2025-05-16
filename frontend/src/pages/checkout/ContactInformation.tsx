import { FC, ChangeEvent} from "react";
import InputField from "@components/form/InputFields";

interface ContactInformationProp {
    email: string
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ContactInformation:FC<ContactInformationProp> = ({email, onInputChange}) => {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900">Contact information</h2>
      <div className="mt-4">
        <div className="mt-2">
          <InputField
            name="email"
            type="email"
            value={email}
            label="Email address"
            autoComplete="email"
            placeholder="Email Address"
            onChange={onInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
