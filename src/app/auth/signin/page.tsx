import Input from "@/components/ui/input";
import Wrapper from "../components/wrapper";
import FeildErrorMessage from "@/components/forms/field-error-message";
import FieldLabel from "@/components/forms/field-label";
import FormControl from "@/components/forms/form-control";

const Signin = () => {
  return (
    <Wrapper type="signin">
      <form action="#">
        <FormControl>
          <FieldLabel>Email</FieldLabel>
          <Input placeholder="Enter Your Email" />
        </FormControl>

        <FormControl>
          <FieldLabel>Password</FieldLabel>
          <Input placeholder="Password" />
        </FormControl>

        <div className="flex items-center justify-between">
          <div className="tp-checkbox flex items-start space-x-2 mb-3">
            <input id="product-1" type="checkbox" />
            <label htmlFor="product-1" className="text-tiny">
              Remember Me
            </label>
          </div>
          <div className="mb-4">
            <a
              href="forgot.html"
              className="text-tiny font-medium text-theme border-b border-transparent hover:border-theme"
            >
              Forgot Password ?
            </a>
          </div>
        </div>

        <button className="tp-btn h-[49px] w-full justify-center">
          Sign In
        </button>
      </form>
    </Wrapper>
  );
};

export default Signin;
