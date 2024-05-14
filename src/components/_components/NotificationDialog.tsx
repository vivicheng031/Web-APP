import { IoNotifications } from "react-icons/io5";

import { redirect } from "next/navigation";

import {
  getNotifications,
  getPost,
  getUser,
} from "@/app/social/_components/action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/up_dialog";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

async function NotificationDialog() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;

  const likes = await getNotifications(userId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-description hover:bg-description/30 cursor-pointer p-2 text-4xl transition-colors hover:rounded-full sm:px-4">
          <IoNotifications />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-txt_8 text-3xl">
            Notifications
          </DialogTitle>
        </DialogHeader>
        {likes == undefined || likes.length == 0 ? (
          <p className="text-txt_9 flex h-5/6 items-center justify-center text-2xl">
            no notification
          </p>
        ) : (
          <div className="text-txt_9 flex flex-col items-start divide-y-2 divide-slate-400/25 overflow-y-auto">
            {likes.map(async (like) => {
              const postDate = await getPost(like.postId);
              const userName = await getUser(like.userId);
              return (
                <form
                  key={like.id}
                  className="p-1 text-xl hover:bg-yellow-700/20"
                  action={async () => {
                    "use server";
                    redirect(
                      `${publicEnv.NEXT_PUBLIC_BASE_URL}/personal/${like.postId}`,
                    );
                  }}
                >
                  <button type="submit">
                    {userName} likes your painting on {postDate}
                  </button>
                </form>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default NotificationDialog;
