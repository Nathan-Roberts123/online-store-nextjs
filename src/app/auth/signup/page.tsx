import Wrapper from "../components/wrapper";

const Signup = () => {
  return (
    <Wrapper type="signup">
      <form action="#">
        <div className="mb-5">
          <p className="mb-0 text-base text-black">
            Your Email <span className="text-red">*</span>
          </p>
          <input
            className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
            type="email"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="mb-5">
          <p className="mb-0 text-base text-black">
            Password <span className="text-red">*</span>
          </p>
          <input
            className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="mb-5">
          <p className="mb-0 text-base text-black">
            Confirm Password <span className="text-red">*</span>
          </p>
          <input
            className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <button className="tp-btn h-[49px] w-full justify-center">
          Sign Up
        </button>
      </form>
    </Wrapper>
  );
};

export default Signup;
