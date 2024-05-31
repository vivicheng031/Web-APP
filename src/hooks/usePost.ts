import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postPicture = useCallback(
    async ({
      topicId,
      description,
      image,
    }: {
      topicId: string;
      description: string;
      image: string;
    }) => {
      setLoading(true);
      // console.log("===========================");
      // console.log(topic);
      // console.log(description);
      // console.log(image);
      // console.log("===========================");
      try {
        const res = await fetch(`/api/paint`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topicId: topicId,
            description: description,
            image: image,
          }),
        });
        if (!res.ok) {
          router.push(`/painting`);
          return;
        }
      } catch (error) {
        console.error("Error posting your painting:", error);
      } finally {
        window.location.href = `/painting`;
        setLoading(false);
      }
    },
    [router],
  );

  const postLastPicture = useCallback(
    async ({
      topicId,
      description,
      image,
    }: {
      topicId: string;
      description: string;
      image: string;
    }) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/paint`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topicId: topicId,
            description: description,
            image: image,
          }),
        });
        if (!res.ok) {
          router.push(`/painting`);
          return;
        }
      } catch (error) {
        console.error("Error posting your painting:", error);
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  const postBook = useCallback(
    async ({ topic }: { topic: string }) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/book`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: topic,
          }),
        });

        if (!res.ok) {
          router.push(`/painting`);
          return;
        }

        const data = await res.json();
        return data.bookId;
      } catch (error) {
        console.error("Error posting your painting:", error);
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  const postPicBook = useCallback(
    async ({ book, topicId }: { book: string; topicId: string }) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/pic_book`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookId: book,
            topicId: topicId,
          }),
        });

        if (!res.ok) {
          router.push(`/painting`);
          return;
        }

        router.push(`/work/${book}`);
      } catch (error) {
        console.error("Error posting your painting:", error);
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  const fetchTopic = useCallback(
    async ({ userId }: { userId: string }) => {
      try {
        const res = await fetch(`/api/paint/topic/${userId}`);

        if (!res.ok) {
          router.push(`/personal`);
          return;
        }

        const data = await res.json();
        return data.topic;
      } catch (error) {
        console.error("Error fetching the topic:", error);
      }
    },
    [router],
  );

  return {
    postPicture,
    postLastPicture,
    postBook,
    postPicBook,
    fetchTopic,
    loading,
  };
};
