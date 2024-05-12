import * as React from "react";

interface HeaderProps {
  studentName: string;
  currentTopic: string;
  deadline: string;
}

const Header: React.FC<HeaderProps> = ({ studentName, currentTopic, deadline }) => {
  return (
    <header className="flex gap-5 justify-between self-stretch py-3.5 pr-16 pl-7 w-full bg-amber-100 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1d95e80fabf868206df9b29bdd52e13fef2d1bad797e7bb291ba9fe670824e4?apiKey=1661ea4d66254cafac7fd5965b2f5a8a&" alt="Logo" className="shrink-0 max-w-full aspect-[1.01] w-[124px]" />
      <div className="flex gap-5 my-auto max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-auto gap-5 text-5xl text-center whitespace-nowrap">
          <div className="justify-center px-6 py-3 text-amber-500 bg-orange-200 rounded-3xl max-md:px-5">
            Paint
          </div>
          <div className="flex-auto my-auto text-amber-500">Works</div>
        </div>
        <div className="flex-auto my-auto text-6xl text-yellow-700 max-md:text-4xl">
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
    <div className="flex flex-col grow max-md:mt-2 max-md:max-w-full">
      <div className="items-end px-16 pb-4 text-3xl text-amber-300 bg-white rounded-3xl border-amber-300 border-solid border-[5px] pt-[603px] max-md:px-5 max-md:pt-10 max-md:max-w-full">
        page {pageNumber}
      </div>
      <div className="items-start px-2.5 pt-6 pb-10 mt-4 text-4xl bg-orange-100 rounded-3xl text-zinc-500 max-md:pr-5 max-md:max-w-full">
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
    <div className="justify-center px-14 py-3.5 bg-orange-300 rounded-3xl border-amber-700 border-solid border-[5px] max-md:px-5 max-md:text-4xl">
      {label}
    </div>
  );
};

function MyComponent() {
  const studentName = "Student's name";
  const currentTopic = "Current Topic";
  const deadline = "2024/01/09(Mon.)";

  return (
    <div className="flex flex-col items-center pb-5 bg-stone-300">
      <Header
        studentName={studentName}
        currentTopic={currentTopic}
        deadline={deadline}
      />
      <div className="mt-9 text-5xl text-yellow-600 max-md:max-w-full max-md:text-4xl">
        {currentTopic}{" "}
        <span className="text-4xl">deadline: {deadline}</span>
      </div>
      <main className="mt-3.5 w-full max-w-[1350px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[83%] max-md:ml-0 max-md:w-full">
            <Page pageNumber={1} />
          </div>
          <aside className="flex flex-col ml-5 w-[17%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-5xl text-center text-amber-700 whitespace-nowrap max-md:mt-2 max-md:text-4xl">
              <div className="shrink-0 rounded-3xl bg-zinc-300 h-[541px]" />
              <div className="flex flex-col pl-4 mt-20 max-md:mt-10 max-md:text-4xl">
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