import * as React from "react";

interface InputProps {
  className: string;
  placeholder: string;
  ariaLabel: string;
}

const Input: React.FC<InputProps> = ({ className, placeholder, ariaLabel }) => {
  return <input className={className} type="text" placeholder={placeholder} aria-label={ariaLabel} />;
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
    <div className="flex justify-center items-center px-16 py-20 bg-white max-md:px-5">
      <div className="px-11 pt-5 pb-8 mt-40 max-w-full bg-amber-100 rounded-[50px] w-[913px] max-md:px-5 max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[31%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-5xl font-bold text-center text-yellow-800 max-md:mt-10 max-md:text-4xl">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4adac9488c5f0449356eb583394f8cd46091fc071f1dd31ad70837b6de6b1bbf?apiKey=1661ea4d66254cafac7fd5965b2f5a8a&"
                alt="Decorative image"
                className="max-w-full aspect-[1.01] w-[195px]"
              />
              <div className="flex flex-col pr-px pl-12 mt-9 max-md:pl-5 max-md:text-4xl">
                <div className="self-end mr-9 max-md:mr-2.5 max-md:text-4xl">Email</div>
                <div className="self-start mt-16 max-md:mt-10 max-md:text-4xl">Password</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[69%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow mt-20 text-center max-md:mt-10 max-md:max-w-full">
              <h1 className="text-8xl text-orange-400 max-md:max-w-full max-md:text-4xl">Start your Journey</h1>
              <form>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Input
                  className="shrink-0 mt-16 max-w-full bg-orange-200 rounded-3xl border-yellow-800 border-solid border-[6px] h-[65px] w-[532px] max-md:mt-10 max-md:mr-2.5"
                  placeholder="Email"
                  ariaLabel="Email"
                />
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Input
                  className="shrink-0 mt-11 max-w-full bg-orange-200 rounded-3xl border-yellow-800 border-solid border-[6px] h-[65px] w-[532px] max-md:mt-10 max-md:mr-2.5"
                  placeholder="Password"
                  ariaLabel="Password"
                />
                <Button className="justify-center self-start px-14 py-4 mt-11 ml-7 text-4xl font-bold text-amber-700 bg-orange-200 rounded-3xl border-amber-700 border-solid border-[5px] max-md:px-5 max-md:mt-10 max-md:ml-2.5">
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
