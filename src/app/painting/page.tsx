"use client";

// import { useRef, useEffect, useState } from "react";
import { useState } from "react";
import * as React from "react";

import { ChromePicker } from "react-color";
import type { ColorResult } from "react-color";
import { BsEraser } from "react-icons/bs";
import { PiPaintBrushDuotone } from "react-icons/pi";
// import { toPng } from "html-to-image";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogDescription,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
import { useDraw } from "@/hooks/useDraw";
// import { usePost } from "@/hooks/usePost";
import type { Draw } from "@/lib/types/shared_types";

import "./style.css";

export default function Painting() {
  // const { data: session, status } = useSession();
  // const router = useRouter();
  // router.push("/painting");

  const [color, setColor] = useState<string>("#000000");
  const [displayColor, setDisplayColor] = useState<string>("#000000");
  // const [showPicker, setShowPicker] = useState(false);
  const { canvasRef, onMouseDown, onTouchStart, clear } = useDraw(drawLine);
  console.log(clear);
  // const elementRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(setLoading);

  // const [isPost, setIsPost] = useState<boolean>(false);
  // const [isFirstPost, setIsFirstPost] = useState<boolean>(false);
  // const [description, setDescription] = useState<string>("");
  // const [topic, setTopic] = useState<string>("");
  // const { fetchTopic, postPaint, posted, firstPost } = usePost();

  // const [welcomeDialog, setWelcomeDialog] = useState<boolean>(false);
  // const [personalDialog, setPersonalDialog] = useState<boolean>(false);
  // const [socialDialog, setSocialDialog] = useState<boolean>(false);

  // const [isPostDialog, setIsPostDialog] = useState<boolean>(false);
  // const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  // const [isExpanded, setIsExpanded] = useState(false);
  const [brushSize, setBrushSize] = useState(5);

  const [brush, setBrush] = useState(false);
  const [eraser, setEraser] = useState(false);

  // const userId = session?.user?.id ?? "";
  // const userId = "berlin";

  console.log("painting...");

  // useEffect(() => {
  //   const checkPost = async () => {
  //     try {
  //       // const post = await posted({ userId });
  //       const post = false;
  //       setIsPost(post);
  //     } catch (error) {
  //       console.error("Error fetching the topic:", error);
  //     }
  //   };

  //   checkPost();
  // }, [posted, userId]);

  // useEffect(() => {
  //   const checkFirstPost = async () => {
  //     try {
  //       // const firstPosted = await firstPost({ userId });
  //       const firstPosted = false;

  //       setIsFirstPost(firstPosted);

  //       if (isFirstPost) {
  //         setWelcomeDialog(true);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching the first topic:", error);
  //     }
  //   };

  //   checkFirstPost();
  // }, [firstPost, isFirstPost, isPost, userId]);

  // useEffect(() => {
  //   if (isPost === false) {
  //     const loadTopic = async () => {
  //       try {
  //         // const fetchedTopic = await fetchTopic({ userId });
  //         const fetchedTopic = "Example topic";
  //         setTopic(fetchedTopic);
  //       } catch (error) {
  //         console.error("Error fetching the topic:", error);
  //       }
  //     };

  //     loadTopic();

  //     const mainElement = document.getElementById("main-element");

  //     if (mainElement) {
  //       const timer = setTimeout(() => {
  //         mainElement.classList.remove("blur-lg");
  //       }, 500);

  //       return () => clearTimeout(timer);
  //     }
  //   } else {
  //     setIsPostDialog(true);
  //   }
  // // }, [fetchTopic, firstPost, isFirstPost, isPost, userId]);
  // }, [fetchTopic, firstPost, isFirstPost, isPost, router, userId]);

  // if (!userId || userId === "") {
  //   // router.push("/auth/login");
  //   return <div></div>;
  // }

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setBrushSize(newSize);
    console.log(brushSize);
  };

  // const handlePostClick = async () => {
  //   if (elementRef.current) {
  //     try {
  //       setLoading(true);
  //       // const dataUrl = await toPng(elementRef.current, { cacheBust: false });

  //       // const dataUrl = canvasRef.current?.toDataURL("image/png");
  //       // if (!dataUrl) return;
  //       // const base64Img = dataUrl.replace(/^data:.+base64,/, "");

  //       // const result = await fetch("/api/paint/image", {
  //       //   method: "POST",
  //       //   headers: {
  //       //     "Content-Type": "application/json",
  //       //   },
  //       //   body: JSON.stringify({ image: base64Img }),
  //       // });
  //       // const response = await result.json(); // response.data is an object containing the image URL

  //       // await postPaint({
  //       //   userId: userId,
  //       //   topic: topic,
  //       //   description: description,
  //       //   image: response.image.data.link,
  //       // });
  //     } catch (error) {
  //       console.error("Error exporting canvas:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  // const handleFirstDialog = () => {
  //   setWelcomeDialog(true);
  //   setPersonalDialog(false);
  //   setSocialDialog(false);
  // };

  // const handleSecondDialog = () => {
  //   setWelcomeDialog(false);
  //   setPersonalDialog(true);
  //   setSocialDialog(false);
  // };

  // const handleThirdDialog = () => {
  //   setWelcomeDialog(false);
  //   setPersonalDialog(false);
  //   setSocialDialog(true);
  // };

  // const handleCloseDialog = () => {
  //   setWelcomeDialog(false);
  //   setPersonalDialog(false);
  //   setSocialDialog(false);
  // };

  // const handleConfirmDialog = () => {
  //   setIsConfirmed(true);
  // };

  // const handleClosePostDialog = () => {
  //   setIsPostDialog(false);
  //   // router.push(`/personal`);
  // };

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;

    const startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = brushSize;
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

  // const studentName = "Student's name";
  const currentTopic = "Current Topic";
  const deadline = "2024/01/09(Mon.)";


  return (
    <div id="main-element" className="h-full">
      <main className="h-min-full flex w-full flex-col bg-[#CFCFCF] xl:h-full">
        <div className="mx-24 my-4 flex flex-col items-center gap-2 text-yellow-600 xl:flex-row">
          <p className="text-6xl">{currentTopic}</p>
          <div className="grow"></div>
          <p className="text-4xl">deadline: {deadline}</p>
        </div>

        {/* XL */}
        <div className="mx-24 hidden gap-5 xl:flex">
          <div className="relative aspect-[3/2] w-3/5 rounded-2xl border-4 border-[#E6B555] md:w-1/2">
            <div
              // ref={elementRef}
              className="flex h-full w-full justify-center rounded-2xl bg-white"
            >
              <canvas
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onTouchMove={onTouchStart}
                className="h-full w-full rounded-2xl"
              />
            </div>
          </div>
          <div className="flex w-2/5 flex-col gap-4 md:w-1/2">
            <div className="flex flex-row gap-4">
              <div className="relative aspect-[1/3] w-1/4 rounded-3xl bg-[#D9D9D9] justify-center items-center">
                <div className="my-16 flex flex-col gap-10 justify-center item-center h-full">
                  <div className="flex flex-row gap-2 mx-2 justify-center item-center">
                    <PiPaintBrushDuotone
                      className={`h-full w-2/5 cursor-pointer self-center rounded-full p-1 ${
                        brush && "bg-slate-100/50"
                      }`}
                      onClick={() => {
                        setEraser(false);
                        setBrush(true);
                        setColor(displayColor);
                      }}
                    />

                    <BsEraser
                      className={`h-full w-2/5 cursor-pointer self-center rounded-full p-1 ${
                        eraser && "bg-slate-100/50"
                      }`}
                      onClick={() => {
                        setColor("#fff");
                        setEraser(true);
                        setBrush(false);
                      }}
                    />
                  </div>

                  <div className="flex w-full cursor-pointer self-center p-1 justify-center items-center">
                    <input
                      className="w-full mx-4"
                      type="range"
                      min="1"
                      max="30"
                      value={brushSize}
                      onChange={handleSizeChange}
                    />
                  </div>

                  <div className="flex w-full cursor-pointer self-center p-1 justify-center items-center">
                    <ChromePicker
                      className="z-3 mx-4 border-4 border-black rounded-2xl"
                      color={displayColor}
                      onChange={(e: ColorResult) => {
                        setColor(e.hex);
                        setDisplayColor(e.hex);
                      }}
                    />
                  </div>

                  <div className="h-1/6 flex w-full mw-220 justify-center items-center">
                    <button
                      type="button"
                      className="w-full h-full mx-6 flex border-4 border-black rounded-4xl justify-center text-3xl flex items-center rounded-lg border-2 border-black px-2 py-2 text-black hover:bg-description/80"
                      onClick={clear}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
              <textarea
                // onChange={(e) => setDescription(e.target.value)}
                className="w-4/5 resize-none items-start rounded-2xl border-4 border-[#8B8B8B] bg-[#FBEFDF] px-4 py-2 text-4xl"
                placeholder="Type something..."
                maxLength={50}
              />
            </div>
            <div className="mx-4 grid grid-flow-col justify-stretch gap-6 text-5xl text-amber-700">
              <button
                disabled={loading}
                // onClick={handleConfirmDialog}
                className="justify-center rounded-2xl border-[5px] border-solid border-amber-700 bg-orange-300 px-4 py-2"
              >
                Next
              </button>
              <button
                disabled={loading}
                // onClick={handleConfirmDialog}
                className="justify-center rounded-2xl border-[5px] border-solid border-amber-700 bg-orange-300 px-4 py-2"
              >
                Done
              </button>
            </div>
          </div>
        </div>

        {/* smaller than XL */}
        <div className="mx-24 flex flex-col gap-5 xl:hidden">
          <div className="relative aspect-[3/2] rounded-2xl border-4 border-[#E6B555]">
            <div
              // ref={elementRef}
              className="flex h-full w-full justify-center rounded-2xl bg-white"
            >
              <canvas
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onTouchMove={onTouchStart}
                className="h-full w-full rounded-2xl"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row w-7/8 gap-4 justify-center item-center mx-4">
              <div className="flex flex-row w-1/2 justify-around">
                <div className="gap-1 flex flex-col justify-center item-center">
                  <div className="flex flex-row gap-2 justify-center item-center">
                    <PiPaintBrushDuotone
                      className={`h-[60px] w-[60px] cursor-pointer self-center rounded-full p-1 ${
                        brush && "bg-slate-100/50"
                      }`}
                      onClick={() => {
                        setEraser(false);
                        setBrush(true);
                        setColor(displayColor);
                      }}
                    />

                    <BsEraser
                      className={`h-[60px] w-[60px] cursor-pointer self-center rounded-full p-1 ${
                        eraser && "bg-slate-100/50"
                      }`}
                      onClick={() => {
                        setColor("#fff");
                        setEraser(true);
                        setBrush(false);
                      }}
                    />
                  </div>
                  <div className="flex flex-row gap-6">
                    <div
                      className={"my-1 h-full cursor-pointer self-center p-3"}
                    >
                      <input
                        type="range"
                        min="1"
                        max="30"
                        value={brushSize}
                        onChange={handleSizeChange}
                      />
                    </div>

                    {/* <div
                      className={`cursor-pointer self-center rounded-full bg-black item-center justify-center w-full`}
                      style={{
                        height: `${brushSize}px`,
                        width: `${brushSize}px`,
                        borderRadius: "50%",
                      }}
                    ></div> */}
                  </div>

                  <button
                    type="button"
                    className="border-4 border-black rounded-2xl justify-center text-3xl flex items-center rounded-lg border-2 border-black px-2 mx-6 text-black hover:bg-description/80"
                    onClick={clear}
                  >
                    Clear
                  </button>
                </div>

                <div className="h-full cursor-pointer self-center p-1">
                  <ChromePicker
                    className="z-3 border-4 border-black rounded-2xl"
                    color={displayColor}
                    onChange={(e: ColorResult) => {
                      setColor(e.hex);
                      setDisplayColor(e.hex);
                    }}
                  />
                </div>
              </div>
                <div className="w-1/2">
                  <textarea
                    // onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-full resize-none items-start rounded-2xl border-4 border-[#8B8B8B] bg-[#FBEFDF] px-4 py-2 text-3xl"
                    placeholder="Type something..."
                    maxLength={50}
                  />
                </div>
            </div>

            <div className="mx-4 mb-4 grid grid-flow-col justify-stretch gap-6 text-5xl text-amber-700">
              <button
                disabled={loading}
                // onClick={handleConfirmDialog}
                className="justify-center rounded-2xl border-[5px] border-solid border-amber-700 bg-orange-300 px-4 py-2"
              >
                Next
              </button>
              <button
                disabled={loading}
                // onClick={handleConfirmDialog}
                className="justify-center rounded-2xl border-[5px] border-solid border-amber-700 bg-orange-300 px-4 py-2"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


//   return (
//     <div id="main-element" className="h-full">
//       <main className="h-min-full flex w-full flex-col bg-[#D1C3B9] xl:h-full">
//         <div className="mx-24 my-4 flex flex-col items-center gap-2 text-yellow-600 xl:flex-row">
//           <p className="text-6xl">{currentTopic}</p>
//           <div className="grow"></div>
//           <p className="text-4xl">deadline: {deadline}</p>
//         </div>

//         <div className="mx-24 hidden gap-5 xl:flex">
//           <div className="relative aspect-[3/2] w-3/5 rounded-2xl border-4 border-[#E6B555] md:w-1/2">
//             <div
//               // ref={elementRef}
//               className="flex h-full w-full justify-center rounded-2xl bg-white"
//             >
//               <canvas
//                 ref={canvasRef}
//                 onMouseDown={onMouseDown}
//                 onTouchMove={onTouchStart}
//                 className="h-full w-full rounded-2xl"
//               />
//             </div>
//           </div>
//           <div className="flex w-2/5 flex-col gap-4 md:w-1/2">
//             <div className="flex flex-row gap-4">
//               <div className="relative aspect-[1/3] w-1/5 rounded-3xl bg-[#D9D9D9]"></div>
//               <textarea
//                 // onChange={(e) => setDescription(e.target.value)}
//                 className="w-4/5 resize-none items-start rounded-2xl border-4 border-[#8B8B8B] bg-[#FBEFDF] px-4 py-2 text-4xl"
//                 placeholder="Type description for your story..."
//                 maxLength={100}
//               />
//             </div>
//             <div className="mx-4 grid grid-flow-col justify-stretch gap-6 text-5xl text-amber-700">
//               <button
//                 disabled={loading}
//                 // onClick={handleConfirmDialog}
//                 className="justify-center rounded-2xl border-[5px] border-solid border-amber-700 bg-orange-300 px-4 py-2"
//               >
//                 Next
//               </button>
//               <button
//                 disabled={loading}
//                 // onClick={handleConfirmDialog}
//                 className="justify-center rounded-2xl border-[5px] border-solid border-amber-700 bg-orange-300 px-4 py-2"
//               >
//                 Done
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="mx-24 flex flex-col gap-5 xl:hidden">
//           <div className="relative aspect-[3/2] rounded-2xl border-4 border-[#E6B555]">
//             <div
//               // ref={elementRef}
//               className="flex h-full w-full justify-center rounded-2xl bg-white"
//             >
//               <canvas
//                 ref={canvasRef}
//                 onMouseDown={onMouseDown}
//                 onTouchMove={onTouchStart}
//                 className="h-full w-full rounded-2xl"
//               />
//             </div>
//           </div>

//           <div className="flex flex-col gap-4">
//             <div className="flex flex-row gap-6">
//               <div className="flex flex-row gap-6">
//                 <div className="justify-center item-center">
//                   <div className="flex flex-row gap-10 justify-center item-center">
//                     <PiPaintBrushDuotone
//                       className={`h-[60px] w-[60px] cursor-pointer self-center rounded-full p-1 ${
//                         brush && "bg-slate-100/50"
//                       }`}
//                       onClick={() => {
//                         setEraser(false);
//                         setBrush(true);
//                         setColor(displayColor);
//                       }}
//                     />

//                     <BsEraser
//                       className={`h-[60px] w-[60px] cursor-pointer self-center rounded-full p-1 ${
//                         eraser && "bg-slate-100/50"
//                       }`}
//                       onClick={() => {
//                         setColor("#fff");
//                         setEraser(true);
//                         setBrush(false);
//                       }}
//                     />
//                   </div>
//                   <div className="flex flex-row gap-6">
//                     <div
//                       className={
//                         "mt-2 h-full w-4/5 cursor-pointer self-center p-1"
//                       }
//                     >
//                       <input
//                         type="range"
//                         min="1"
//                         max="30"
//                         value={brushSize}
//                         onChange={handleSizeChange}
//                       />
//                     </div>

//                     <div
//                       className={`cursor-pointer self-center rounded-full bg-black item-center justify-center w-full`}
//                       style={{
//                         height: `${brushSize}px`,
//                         width: `${brushSize}px`,
//                         borderRadius: "50%",
//                       }}
//                     ></div>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   className="border-4 border-black rounded-2xl justify-center text-3xl w-[200px] flex items-center rounded-lg border-2 border-black px-2 my-14 text-black hover:bg-description/80"
//                   onClick={clear}
//                 >
//                   Clear
//                 </button>

//                 <div className="h-full cursor-pointer self-center p-1">
//                   <ChromePicker
//                     className="z-3 border-4 border-black rounded-2xl"
//                     color={displayColor}
//                     onChange={(e: ColorResult) => {
//                       setColor(e.hex);
//                       setDisplayColor(e.hex);
//                     }}
//                   />
//                 </div>

//                 <div>
//                   <textarea
//                     // onChange={(e) => setDescription(e.target.value)}
//                     className="w-4/5 h-full resize-none items-start rounded-2xl border-4 border-[#8B8B8B] bg-[#FBEFDF] px-4 py-2 text-2xl"
//                     placeholder="Type description for your story..."
//                     maxLength={100}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="mx-4 mb-4 grid grid-flow-col justify-stretch gap-6 text-5xl text-amber-700">
//               <button
//                 disabled={loading}
//                 // onClick={handleConfirmDialog}
//                 className="justify-center rounded-2xl border-[5px] border-solid border-amber-700 bg-orange-300 px-4 py-2"
//               >
//                 Next
//               </button>
//               <button
//                 disabled={loading}
//                 // onClick={handleConfirmDialog}
//                 className="justify-center rounded-2xl border-[5px] border-solid border-amber-700 bg-orange-300 px-4 py-2"
//               >
//                 Done
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

{
  /* <AlertDialogContent>
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
        </AlertDialog> */
}

{
  /* <div className="flex flex-col gap-4">
<div className="flex flex-row gap-6">
  <div className="flex flex-row gap-6">

  <div className="w-1/5">
      <div className="flex flex-row gap-10 justify-center item-center">

        <PiPaintBrushDuotone
          className={`h-[60px] w-[60px] cursor-pointer self-center rounded-full p-1 ${
            brush && "bg-slate-100/50"
          }`}
          onClick={() => {
            setEraser(false);
            setBrush(true);
            setColor(displayColor);
          }}
        />

        <BsEraser
          className={`h-[60px] w-[60px] cursor-pointer self-center rounded-full p-1 ${
            eraser && "bg-slate-100/50"
          }`}
          onClick={() => {
            setColor("#fff");
            setEraser(true);
            setBrush(false);
          }}
        />

      </div>
      <div className="flex flex-row gap-6">

        <div className={"mt-2 h-full w-4/5 cursor-pointer self-center p-1"}>
            <input
              type="range"
              min="1"
              max="30"
              value={brushSize}
              onChange={handleSizeChange}
              />
        </div>

        <div
          className={`cursor-pointer self-center rounded-full bg-black item-center justify-center w-full`}
          style={{ height: `${brushSize}px`, width: `${brushSize}px`, borderRadius: "50%" }}
        ></div>
      </div>
    </div>


    <button
      type="button"
      className="border-4 border-black rounded-2xl justify-center text-3xl w-[200px] flex items-center rounded-lg border-2 border-black px-2 my-14 text-black hover:bg-description/80"
      onClick={clear}
      >
      Clear
    </button>

    <div className="h-full cursor-pointer self-center p-1">
      <ChromePicker
        className="z-3 border-4 border-black rounded-2xl"
        color={displayColor}
        onChange={(e: ColorResult) => {
          setColor(e.hex);
          setDisplayColor(e.hex);
        }}
      />
    </div>

  

  <div>
    <textarea
      // onChange={(e) => setDescription(e.target.value)}
      className="w-4/5 h-full resize-none items-start rounded-2xl border-4 border-[#8B8B8B] bg-[#FBEFDF] px-4 py-2 text-4xl"
      placeholder="Type something..."
      maxLength={50}
      />
  </div>

</div>
</div>

<div className="mx-4 mb-4 grid grid-flow-col justify-stretch gap-6 text-5xl text-amber-700">
<button
  disabled={loading}
  // onClick={handleConfirmDialog}
  className="justify-center rounded-2xl border-[5px] border-solid border-amber-700 bg-orange-300 px-4 py-2"
>
  Next
</button>
<button
  disabled={loading}
  // onClick={handleConfirmDialog}
  className="justify-center rounded-2xl border-[5px] border-solid border-amber-700 bg-orange-300 px-4 py-2"
>
  Done
</button>
</div>
</div>
</div>
</main>
</div> */
}

{
  /* <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-4">
              <div className="relative aspect-[2/3] w-1/5 rounded-3xl">

              <div className="flex flex-row gap-10 justify-center item-center">

                <PiPaintBrushDuotone
                  className={`h-[60px] w-[60px] cursor-pointer self-center rounded-full p-1 ${
                    brush && "bg-slate-100/50"
                  }`}
                  onClick={() => {
                    setEraser(false);
                    setBrush(true);
                    setColor(displayColor);
                  }}
                />

                <BsEraser
                  className={`h-[60px] w-[60px] cursor-pointer self-center rounded-full p-1 ${
                    eraser && "bg-slate-100/50"
                  }`}
                  onClick={() => {
                    setColor("#fff");
                    setEraser(true);
                    setBrush(false);
                  }}
                />

                </div>
                <div className="flex flex-row gap-6">

                <div className={"mt-2 h-full w-4/5 cursor-pointer self-center p-1"}>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={brushSize}
                      onChange={handleSizeChange}
                      />
                </div>

                <div
                  className={`cursor-pointer self-center rounded-full bg-black item-center justify-center w-full`}
                  style={{ height: `${brushSize}px`, width: `${brushSize}px`, borderRadius: "50%" }}
                ></div>
                </div>
                </div>


                <button
                type="button"
                className="border-4 border-black rounded-2xl justify-center text-3xl w-[200px] flex items-center rounded-lg border-2 border-black px-2 my-14 text-black hover:bg-description/80"
                onClick={clear}
                >
                Clear
                </button>

                <div className="h-full cursor-pointer self-center p-1">
                <ChromePicker
                className="z-3 border-4 border-black rounded-2xl"
                color={displayColor}
                onChange={(e: ColorResult) => {
                  setColor(e.hex);
                  setDisplayColor(e.hex);
                }}
                />
                </div>
                
              </div>
              <textarea
                // onChange={(e) => setDescription(e.target.value)}
                className="w-4/5 resize-none items-start rounded-2xl border-4 border-[#8B8B8B] bg-[#FBEFDF] px-4 py-2 text-4xl"
                placeholder="Type something..."
                maxLength={50}
              />
            </div>
            <div className="mx-4 mb-4 grid grid-flow-col justify-stretch gap-6 text-5xl text-amber-700">
              <button
                disabled={loading}
                // onClick={handleConfirmDialog}
                className="justify-center rounded-2xl border-[5px] border-solid border-amber-700 bg-orange-300 px-4 py-2"
              >
                Next
              </button>
              <button
                disabled={loading}
                // onClick={handleConfirmDialog}
                className="justify-center rounded-2xl border-[5px] border-solid border-amber-700 bg-orange-300 px-4 py-2"
              >
                Done
              </button>
            </div>
          </div>
      </main>
    </div> */
}
