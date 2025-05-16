import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


import CheckboxWithLink from "@/components/form/CheckBox";

import InputField from "@/components/form/InputFields";


import { signUpStart } from "../../store/user/user.slice";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  receiveEmails: false,
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, email, password, confirmPassword, receiveEmails } = formFields;
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormFields({
      ...formFields,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match" });
      return;
    }
    try {
      dispatch(signUpStart({ email, password, username: name, receiveEmails }));
      resetFormFields();
      navigate("/");
    } catch (error) {
      if (error) {
        console.error("Signup Error:", error);
        setErrors({ ...errors });
      } else {
        //Network error ot other issues
        console.error("Network Error:", error);
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  };

  return (
    <div className="flex min-h-full bg-gray-50 flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="Your Company"
          src="https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/logo/nelson_18055_A_sleek_modern_gym-wear_brand_logo_with_the_name_715b934e-15de-4ba7-93f4-b7cef06de036_2.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create an Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              name="name"
              type="text"
              value={name}
              label="Your Name"
              autoComplete="email"
              placeholder="Your Name"
              onChange={handleChange}
            />
            <InputField
              name="email"
              type="email"
              value={email}
              label="Email address"
              autoComplete="email"
              placeholder="Email Address"
              onChange={handleChange}
            />

            <InputField
              name="password"
              type="password"
              value={password}
              label="Password"
              placeholder="Password"
              autoComplete="current-password"
              onChange={handleChange}
            />

            <InputField
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              label="Confirm Password"
              placeholder="Confirm Password"
              onChange={handleChange}
            />

            <CheckboxWithLink
              checkboxId="remember-me"
              type="checkbox"
              checkboxName="receiveEmails"
              label="Remember me"
              onChange={handleCheckboxChange}
              checked={false} // Replace with a state value if needed
              linkText="Remember me"
              linkHref={"#"}
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div>
            <div className="relative mt-10">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm/6 font-medium">
                <span className="bg-white px-6 text-gray-900">
                  Already have an account?{" "}
                  <Link
                    style={{ cursor: "pointer", color: "blue" }}
                    to="/signin"
                  >
                    Log in
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
