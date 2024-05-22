import { HiPlusCircle } from "react-icons/hi";

// import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
// import { auth } from "@/lib/auth";
// import { publicEnv } from "@/lib/env/public";

// import { requestFriend } from "./action";

async function AddDialog() {
  // const session = await auth();
  // if (!session || !session?.user?.id) {
  //   redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  // }
  // const userId = session.user.id;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <HiPlusCircle size={180} className="text-[#A8450F]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex items-center">
          <DialogTitle className="py-1 text-6xl text-[#D88253]">
            Add a Task
          </DialogTitle>
        </DialogHeader>
        <form
          // action={async (e) => {
          // "use server";
          // const otherUser = e.get("otherUser");
          // if (!otherUser) return;
          // if (typeof otherUser !== "string") return;
          // const result = await requestFriend(userId, otherUser);
          // console.log(result);
          // if (result == "nothing" || result == "done before") {
          //   redirect(
          //     `${publicEnv.NEXT_PUBLIC_BASE_URL}/social?error=${result}`,
          //   );
          // } else {
          //   redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/social`);
          // }
          // }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-row items-center justify-center gap-4">
            <p className="w-1/4 text-3xl text-[#846425]">Topic</p>
            <Input
              placeholder="any topic"
              name="topic"
              className="items-center rounded-lg border-[5px] border-[#846425] bg-[#D1C1A1] px-3 py-1 text-3xl text-black"
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <p className="w-1/4 text-3xl text-[#846425]">Class</p>
            <Input
              placeholder="in correct class name"
              name="class"
              className="items-center rounded-lg border-[5px] border-[#846425] bg-[#D1C1A1] px-3 py-1 text-3xl text-black"
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <p className="w-1/4 text-3xl text-[#846425]">End at</p>
            <Input
              placeholder="in format yyyy/mm/dd"
              name="end_date"
              className="items-center rounded-lg border-[5px] border-[#846425] bg-[#D1C1A1] px-3 py-1 text-3xl text-black"
            />
          </div>
          <Button
            type="submit"
            className="items-center rounded-full border-4 border-[#A8450F] bg-[#F4C2A7] px-3 py-1 text-3xl text-[#A8450F] hover:bg-[#EED6C8]"
          >
            Add
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddDialog;
