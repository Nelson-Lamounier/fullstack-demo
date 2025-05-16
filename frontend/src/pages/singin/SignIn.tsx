import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";





import CheckboxWithLink from "@/components/form/CheckBox";
import InputField from "@/components/form/InputFields";

import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.slice";


const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(emailSignInStart({ email, password }));
      resetFormFields();
      navigation("/");
    } catch (error) {
      console.log("User sign in failed", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential;
      dispatch(googleSignInStart(token));
      navigation("/");
    } catch (error) {
      console.error("Failed to SignIn with Google", error);
    }
  };

  const handleGoogleFailure = () => {
    console.error("Google Sign-In Error");
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
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              autoComplete="current-password"
              placeholder="Password"
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
                Sign in
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
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </div>
            <div className="relative flex justify-center text-sm/6 font-medium">
                <span className="bg-white px-6 text-gray-900">
                  Don't have an account?
                  <Link
                    style={{ cursor: "pointer", color: "blue" }}
                    to="/signup"
                  >
                    Create an account
                  </Link>
                </span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
