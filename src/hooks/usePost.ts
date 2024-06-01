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
        console.error("Error posting your picture:", error);
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
        console.error("Error posting your last picture:", error);
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
        console.error("Error posting your book:", error);
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  const putTopic = useCallback(
    async ({ topicId }: { topicId: string }) => {
      try {
        const res = await fetch(`/api/paint/topic`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topicId: topicId,
          }),
        });

        if (!res.ok) {
          router.push(`/painting`);
          return;
        }
      } catch (error) {
        console.error("Error updating status of topic:", error);
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

        // update done status API
        await putTopic({ topicId: topicId });

        router.push(`/work/${book}`);
      } catch (error) {
        console.error("Error posting your picture book:", error);
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  const getTopic = useCallback(async () => {
    try {
      const res = await fetch(`/api/paint/topic`);

      if (!res.ok) {
        return;
      }

      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching the topic:", error);
    }
  }, [router]);

  return {
    postPicture,
    postLastPicture,
    postBook,
    postPicBook,
    getTopic,
    loading,
  };
};
