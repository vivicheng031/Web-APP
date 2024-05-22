// import { redirect } from "next/navigation";
// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";
import Student from "./Student";

// import { getAddedFriends } from "./action";

// type PageProps = {
//   searchParams: {
//     search?: string;
//   };
// };

async function StudentList({ cls }: { cls: string }) {
  // const session = await auth();
  // console.log(session?.user);
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;
  // const friends = await getAddedFriends(userId);

  const students = [
    { id: 1, display_id: "abcdefg", stu_name: "AAA" },
    { id: 2, display_id: "fgbnxgfnfx", stu_name: "BBB" },
    { id: 3, display_id: "xngnxng", stu_name: "CCC" },
    { id: 4, display_id: "xngngnxgfg", stu_name: "DDD" },
    { id: 5, display_id: "xngfnfnnz", stu_name: "EEE" },
  ];

  return (
    <div className="flex h-full">
      <div className="relative m-4 flex w-full flex-col overflow-y-auto rounded-2xl bg-[#F7CFA0] p-4">
        <p className="p-2 text-6xl text-[#5C574D] lg:hidden">{cls}</p>
        <p className="hidden p-2 text-5xl text-[#5C574D] lg:block lg:text-6xl">
          {cls}
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
          {students.map((student) => (
            <Student
              key={student.id}
              displayId={student.display_id}
              name={student.stu_name}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default StudentList;
