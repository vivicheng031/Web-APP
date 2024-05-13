"use client";

import { useRef, useEffect, useState } from "react";
import * as React from "react";

import { ChromePicker } from "react-color";
import type { ColorResult } from "react-color";
import { BsEraser } from "react-icons/bs";
import { PiPaintBrushDuotone } from "react-icons/pi";

// import { toPng } from "html-to-image";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDraw } from "@/hooks/useDraw";
import { usePost } from "@/hooks/usePost";
import type { Draw } from "@/lib/types/shared_types";

import "./style.css";
import "../globals.css";

export default function Painting() {
//   const { data: session, status } = useSession();
  const router = useRouter();
  // router.push("/painting");

  const [color, setColor] = useState<string>("#000000");
  const [displayColor, setDisplayColor] = useState<string>("#000000");
  const [showPicker, setShowPicker] = useState(false);
  const { canvasRef, onMouseDown, onTouchStart, clear } = useDraw(drawLine);
  const elementRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPost, setIsPost] = useState<boolean>(false);
  const [isFirstPost, setIsFirstPost] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const { fetchTopic, postPaint, posted, firstPost } = usePost();

  const [welcomeDialog, setWelcomeDialog] = useState<boolean>(false);
  const [personalDialog, setPersonalDialog] = useState<boolean>(false);
  const [socialDialog, setSocialDialog] = useState<boolean>(false);

  const [isPostDialog, setIsPostDialog] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const [brushSize, setBrushSize] = useState(5);

  const [brush, setBrush] = useState(false);
  const [eraser, setEraser] = useState(false);

  // const userId = session?.user?.id ?? "";
  const userId = "berlin";

  console.log("painting...");


  useEffect(() => {
    const checkPost = async () => {
      try {
        // const post = await posted({ userId });
        const post = false;
        setIsPost(post);
      } catch (error) {
        console.error("Error fetching the topic:", error);
      }
    };

    checkPost();
  }, [posted, userId]);

  useEffect(() => {
    const checkFirstPost = async () => {
      try {
        // const firstPosted = await firstPost({ userId });
        const firstPosted = false;

        setIsFirstPost(firstPosted);

        if (isFirstPost) {
          setWelcomeDialog(true);
        }
      } catch (error) {
        console.error("Error fetching the first topic:", error);
      }
    };

    checkFirstPost();
  }, [firstPost, isFirstPost, isPost, userId]);

  useEffect(() => {
    if (isPost === false) {
      const loadTopic = async () => {
        try {
          // const fetchedTopic = await fetchTopic({ userId });
          const fetchedTopic = "Example topic";
          setTopic(fetchedTopic);
        } catch (error) {
          console.error("Error fetching the topic:", error);
        }
      };

      loadTopic();

      const mainElement = document.getElementById("main-element");

      if (mainElement) {
        const timer = setTimeout(() => {
          mainElement.classList.remove("blur-lg");
        }, 500);

        return () => clearTimeout(timer);
      }
    } else {
      setIsPostDialog(true);
    }
  // }, [fetchTopic, firstPost, isFirstPost, isPost, userId]);
  }, [fetchTopic, firstPost, isFirstPost, isPost, router, userId]);

  // if (!userId || userId === "") {
  //   // router.push("/auth/login");
  //   return <div></div>;
  // }

  const handleColorIconClick = () => {
    setShowPicker(!showPicker);
    isExpanded && setIsExpanded(!isExpanded);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setBrushSize(newSize);
    console.log(brushSize);
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
    showPicker && setShowPicker(!showPicker);
  };

  const handlePostClick = async () => {
    if (elementRef.current) {
      try {
        setLoading(true);
        // const dataUrl = await toPng(elementRef.current, { cacheBust: false });

        // const dataUrl = canvasRef.current?.toDataURL("image/png");
        // if (!dataUrl) return;
        // const base64Img = dataUrl.replace(/^data:.+base64,/, "");

        // const result = await fetch("/api/paint/image", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ image: base64Img }),
        // });
        // const response = await result.json(); // response.data is an object containing the image URL

        // await postPaint({
        //   userId: userId,
        //   topic: topic,
        //   description: description,
        //   image: response.image.data.link,
        // });
      } catch (error) {
        console.error("Error exporting canvas:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFirstDialog = () => {
    setWelcomeDialog(true);
    setPersonalDialog(false);
    setSocialDialog(false);
  };

  const handleSecondDialog = () => {
    setWelcomeDialog(false);
    setPersonalDialog(true);
    setSocialDialog(false);
  };

  const handleThirdDialog = () => {
    setWelcomeDialog(false);
    setPersonalDialog(false);
    setSocialDialog(true);
  };

  const handleCloseDialog = () => {
    setWelcomeDialog(false);
    setPersonalDialog(false);
    setSocialDialog(false);
  };

  const handleConfirmDialog = () => {
    setIsConfirmed(true);
  };

  const handleClosePostDialog = () => {
    setIsPostDialog(false);
    // router.push(`/personal`);
  };

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = brushSize;

    const startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

//   if (status !== "authenticated") {
//     router.push("/auth/login");
//   } else {

  const studentName = "Student's name";
  const currentTopic = "Current Topic";
  const deadline = "2024/01/09(Mon.)";

  const backgroundColor = "#CFCFCF";
  const rectColor = "#D9D9D9";


  return (

    <div id="main-element" className="h-full blur-lg w-full">
      <main className={`flex flex-col items-center bg-brand_2`}
            style={{ backgroundColor }}
            >
        <AlertDialog open={isPostDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">
                You have already posted today !
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleClosePostDialog}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog open={isConfirmed}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">
                Are you sure you want to post?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsConfirmed(false)}>
                Back
              </AlertDialogCancel>
              <AlertDialogAction onClick={handlePostClick}>
                Confirm
                {loading && (
                  <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-75 text-2xl">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>


        <div className="flex w-full flex-col justify-center overflow-y-auto px-0 lg:mt-0 lg:px-0">
          <header className="flex gap-5 justify-between self-stretch py-3.5 w-full bg-amber-100 max-md:flex-wrap px-0">
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
        </div>

        <div className="mt-9 text-5xl text-yellow-600 max-md:max-w-full max-md:text-4xl">
          {currentTopic}{" "}
          <span className="text-4xl">deadline: {deadline}</span>
        </div>

        <main className="flex flex-col justify-between h-screen mt-3.5 w-full max-w-[1350px] max-md:max-w-full">

          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[83%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-2 max-md:max-w-full">
                <div className="flex flex-col justify-between items-end px-16 pb-4 text-3xl text-amber-300 bg-white rounded-3xl border-amber-300 border-solid border-[5px] flex-grow max-md:px-5 max-md:pt-10 h-full">
                  <canvas
                        ref={canvasRef}
                        onMouseDown={onMouseDown}
                        onTouchMove={onTouchStart}
                      />
                  </div>
                  <div className="items-start px-2.5 pt-6 pb-10 mt-4 text-4xl bg-orange-100 rounded-3xl text-zinc-500 max-md:pr-5 max-md:max-w-full">
                    Type anything...
                  </div>
                </div>
              </div>

            <aside className="flex flex-col ml-5 w-[17%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-5xl text-center text-amber-700 whitespace-nowrap max-md:mt-2 max-md:text-4xl">

                <div
                  className={`shrink-0 rounded-3xl bg-zinc-300`}
                  style={{ rectColor, maxWidth: "222px", minHeight: "541px" }}
                />

                <div className="flex flex-col pl-4 mt-20 max-md:mt-10 max-md:text-4xl">
                  <button
                    disabled={loading}
                    onClick={handleConfirmDialog}
                    className="justify-center px-14 py-3.5 bg-orange-300 rounded-3xl border-amber-700 border-solid border-[5px] max-md:px-5 max-md:text-4xl">
                    Next
                  </button>
                  <div className="mt-6">
                      <button
                      disabled={loading}
                      onClick={handleConfirmDialog}
                      className="justify-center px-14 py-3.5 bg-orange-300 rounded-3xl border-amber-700 border-solid border-[5px] max-md:px-5 max-md:text-4xl">
                      Done
                      </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>

      </main>  
    </div>


  );
  }