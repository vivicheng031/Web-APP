import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

type Props = {
  children: React.ReactNode;
};

async function Painting({ children }: Props) {
  // const session = await auth();
  // if (!session) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }

  return (
    // overflow-hidden for parent to hide scrollbar
    // <main className="flex h-full w-full flex-col justify-center overflow-y-scroll md:overflow-hidden">
    //   {/* overflow-y-scroll for child to show scrollbar */}
    //   <div className="h-full w-full"></div>
    //   <div className="flex-rows h-full w-full bg-brand_2 md:flex">
    //     {/* overflow-y-scroll for child to show scrollbar */}
    //     <div className="w-full overflow-y-auto lg:mt-0">
    //       {children}
    //     </div>
    //   </div>
    // </main>
    // <main className="flex h-screen w-full flex-col justify-center overflow-hidden">
    //   {/* overflow-y-auto for child to show scrollbar if needed */}
    //   <div className="flex flex-1 flex-col h-full w-full">
    //     <div className="flex flex-1 h-full w-full bg-brand_2 md:flex">
    //       {/* overflow-y-auto for child to show scrollbar if needed */}
    //       <div className="flex-1 w-full overflow-y-auto lg:mt-0">
    //         {children}
    //       </div>
    //     </div>
    //   </div>
    // </main>

<main className="flex h-screen w-full flex-col justify-center overflow-hidden">
{/* Ensure the child takes full height without overflow */}
<div className="flex h-full w-full bg-brand_2">
  {/* Ensure this container takes full height and width */}
  <div className="flex h-full w-full">
    {children}
  </div>
</div>
</main>

  );
}

export default Painting;
