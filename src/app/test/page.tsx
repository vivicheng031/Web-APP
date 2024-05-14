import * as React from "react";

interface HeaderProps {
  studentName: string;
  currentTopic: string;
  deadline: string;
}

const Header: React.FC<HeaderProps> = ({ studentName }) => {
  return (
    <header className="flex w-full justify-between gap-5 self-stretch bg-amber-100 py-3.5 pl-7 pr-16 max-md:max-w-full max-md:flex-wrap max-md:px-5">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1d95e80fabf868206df9b29bdd52e13fef2d1bad797e7bb291ba9fe670824e4?apiKey=1661ea4d66254cafac7fd5965b2f5a8a&"
        alt="Logo"
        className="aspect-[1.01] w-[124px] max-w-full shrink-0"
      />
      <div className="my-auto flex gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="flex flex-auto gap-5 whitespace-nowrap text-center text-5xl">
          <div className="justify-center rounded-3xl bg-orange-200 px-6 py-3 text-amber-500 max-md:px-5">
            Paint
          </div>
          <div className="my-auto flex-auto text-amber-500">Works</div>
        </div>
        <div className="my-auto flex-auto text-6xl text-yellow-700 max-md:text-4xl">
          {studentName}
        </div>
      </div>
    </header>
  );
};

interface PageProps {
  pageNumber: number;
}

const Page: React.FC<PageProps> = ({ pageNumber }) => {
  return (
    <div className="flex grow flex-col max-md:mt-2 max-md:max-w-full">
      <div className="items-end rounded-3xl border-[5px] border-solid border-amber-300 bg-white px-16 pb-4 pt-[603px] text-3xl text-amber-300 max-md:max-w-full max-md:px-5 max-md:pt-10">
        page {pageNumber}
      </div>
      <div className="mt-4 items-start rounded-3xl bg-orange-100 px-2.5 pb-10 pt-6 text-4xl text-zinc-500 max-md:max-w-full max-md:pr-5">
        Type anything...
      </div>
    </div>
  );
};

interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <div className="justify-center rounded-3xl border-[5px] border-solid border-amber-700 bg-orange-300 px-14 py-3.5 max-md:px-5 max-md:text-4xl">
      {label}
    </div>
  );
};

function MyComponent() {
  const studentName = "Student's name";
  const currentTopic = "Current Topic";
  const deadline = "2024/01/09(Mon.)";

  return (
    <div className="flex flex-col items-center bg-stone-300 pb-5">
      <Header
        studentName={studentName}
        currentTopic={currentTopic}
        deadline={deadline}
      />
      <div className="mt-9 text-5xl text-yellow-600 max-md:max-w-full max-md:text-4xl">
        {currentTopic} <span className="text-4xl">deadline: {deadline}</span>
      </div>
      <main className="mt-3.5 w-full max-w-[1350px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex w-[83%] flex-col max-md:ml-0 max-md:w-full">
            <Page pageNumber={1} />
          </div>
          <aside className="ml-5 flex w-[17%] flex-col max-md:ml-0 max-md:w-full">
            <div className="flex grow flex-col whitespace-nowrap text-center text-5xl text-amber-700 max-md:mt-2 max-md:text-4xl">
              <div className="h-[541px] shrink-0 rounded-3xl bg-zinc-300" />
              <div className="mt-20 flex flex-col pl-4 max-md:mt-10 max-md:text-4xl">
                <Button label="Next" />
                <div className="mt-6">
                  <Button label="Done" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default MyComponent;
