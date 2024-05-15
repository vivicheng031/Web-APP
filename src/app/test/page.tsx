import * as React from "react";

interface InputProps {
  className: string;
  placeholder: string;
  ariaLabel: string;
}

const Input: React.FC<InputProps> = ({ className, placeholder, ariaLabel }) => {
  return (
    <input
      className={className}
      type="text"
      placeholder={placeholder}
      aria-label={ariaLabel}
    />
  );
};

interface ButtonProps {
  className: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className, children }) => {
  return <button className={className}>{children}</button>;
};

function MyComponent() {
  return (
    <div className="flex items-center justify-center bg-white px-16 py-20 max-md:px-5">
      <div className="mt-40 w-[913px] max-w-full rounded-[50px] bg-amber-100 px-11 pb-8 pt-5 max-md:mt-10 max-md:px-5">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex w-[31%] flex-col max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-center text-5xl font-bold text-yellow-800 max-md:mt-10 max-md:text-4xl">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4adac9488c5f0449356eb583394f8cd46091fc071f1dd31ad70837b6de6b1bbf?apiKey=1661ea4d66254cafac7fd5965b2f5a8a&"
                alt="Decorative image"
                className="aspect-[1.01] w-[195px] max-w-full"
              />
              <div className="mt-9 flex flex-col pl-12 pr-px max-md:pl-5 max-md:text-4xl">
                <div className="mr-9 self-end max-md:mr-2.5 max-md:text-4xl">
                  Email
                </div>
                <div className="mt-16 self-start max-md:mt-10 max-md:text-4xl">
                  Password
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 flex w-[69%] flex-col max-md:ml-0 max-md:w-full">
            <div className="mt-20 flex grow flex-col text-center max-md:mt-10 max-md:max-w-full">
              <h1 className="text-8xl text-orange-400 max-md:max-w-full max-md:text-4xl">
                Start your Journey
              </h1>
              <form>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Input
                  className="mt-16 h-[65px] w-[532px] max-w-full shrink-0 rounded-3xl border-[6px] border-solid border-yellow-800 bg-orange-200 max-md:mr-2.5 max-md:mt-10"
                  placeholder="Email"
                  ariaLabel="Email"
                />
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Input
                  className="mt-11 h-[65px] w-[532px] max-w-full shrink-0 rounded-3xl border-[6px] border-solid border-yellow-800 bg-orange-200 max-md:mr-2.5 max-md:mt-10"
                  placeholder="Password"
                  ariaLabel="Password"
                />
                <Button className="ml-7 mt-11 justify-center self-start rounded-3xl border-[5px] border-solid border-amber-700 bg-orange-200 px-14 py-4 text-4xl font-bold text-amber-700 max-md:ml-2.5 max-md:mt-10 max-md:px-5">
                  sign in
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
