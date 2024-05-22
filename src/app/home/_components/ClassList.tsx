// import { redirect } from "next/navigation";

// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";

import Class from "./Class";

// import { getAddedFriends } from "./action";

// type PageProps = {
//   searchParams: {
//     search?: string;
//   };
// };

async function ClassList() {
  // const session = await auth();
  // console.log(session?.user);
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;
  // const friends = await getAddedFriends(userId);

  const classes = [
    { id: 1, display_id: "abcdefg", classname: "AAA", topic: "one" },
    { id: 2, display_id: "fgbnxgfnfx", classname: "BBB", topic: "two" },
    { id: 3, display_id: "xngnxng", classname: "CCC", topic: "three" },
    { id: 4, display_id: "xngngnxgfg", classname: "DDD", topic: "four" },
    { id: 5, display_id: "xngfnfnnz", classname: "EEE", topic: "five" },
  ];

  return (
    <div className="flex h-full">
      <div className="relative m-4 flex w-full flex-col overflow-y-auto rounded-2xl bg-[#F7CFA0] p-4">
        <p className="p-2 text-5xl text-[#5C574D] lg:hidden">Your Classes</p>
        <p className="hidden p-2 text-4xl text-[#5C574D] lg:block lg:text-5xl">
          Your Classes
        </p>
        <section className="flex w-full flex-col divide-y-4 divide-slate-400/25 overflow-y-auto pb-12">
          {/* {classes &&
            classes.map(async (cls) => (
              <Class
                key={cls.id}
                displayId={cls.user.displayId}
                name={cls.user.username}
              />
          ))} */}
          {classes.map((cls) => (
            <Class
              key={cls.id}
              displayId={cls.display_id}
              name={cls.classname}
              topic={cls.topic}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default ClassList;
