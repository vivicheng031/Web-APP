"use client";

import { useRef, useState, useEffect } from "react";
import * as React from "react";

import { ChromePicker } from "react-color";
import type { ColorResult } from "react-color";
import { BsEraser } from "react-icons/bs";
import { PiPaintBrushDuotone } from "react-icons/pi";
import { useDraw } from "@/hooks/useDraw";
import { usePost } from "@/hooks/usePost";
import type { Draw } from "@/lib/types/shared_types";

import "./style.css";

export default function Painting() {
  const [color, setColor] = useState<string>("#000000");
  const [displayColor, setDisplayColor] = useState<string>("#000000");
  // const [showPicker, setShowPicker] = useState(false);
  const { canvasRef, onMouseDown, onTouchStart, clear } = useDraw(drawLine);
  const elementRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // console.log(setLoading);

  // const [isExpanded, setIsExpanded] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [brush, setBrush] = useState(false);
  const [eraser, setEraser] = useState(false);

  const [topic, setTopic] = useState("");
  const [topicId, setTopicId] = useState("");
  const [description, setDescription] = useState<string>("");
  const { postPicture, postLastPicture, postBook, postPicBook, getTopic } =
    usePost();

  // console.log("painting...");

  useEffect(() => {
    const getCurrentTopic = async () => {
      console.log("[getCurrentTopic]");
      try {
        const currentTopic = await getTopic();
        setTopic(currentTopic.topic);
        setTopicId(currentTopic.topicId);
      } catch (error) {
        console.error("Error fetching the topic:", error);
      }
    };
    getCurrentTopic();
  }, []);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setBrushSize(newSize);
    // console.log(brushSize);
  };

  const handleNextClick = async () => {
    if (elementRef.current) {
      try {
        setLoading(true);

        const dataUrl = canvasRef.current?.toDataURL("image/png");
        if (!dataUrl) return;
        const base64Img = dataUrl.replace(/^data:.+base64,/, "");

        const result = await fetch("/api/paint/image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Img }),
        });
        const response = await result.json(); // response.data is an object containing the image URL

        await postPicture({
          topicId: topicId,
          description: description,
          image: response.image.data.link,
        });
      } catch (error) {
        console.error("Error exporting canvas:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDoneClick = async () => {
    // POST on picture table
    if (elementRef.current) {
      try {
        setLoading(true);

        const dataUrl = canvasRef.current?.toDataURL("image/png");
        if (!dataUrl) return;
        const base64Img = dataUrl.replace(/^data:.+base64,/, "");

        const result = await fetch("/api/paint/image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Img }),
        });
        const response = await result.json(); // response.data is an object containing the image URL

        await postLastPicture({
          topicId: topicId,
          description: description,
          image: response.image.data.link,
        });
      } catch (error) {
        console.error("Error exporting canvas:", error);
      } finally {
        setLoading(false);
      }
    }

    // POST on book table
    const bookId = await postBook({
      topic: topic,
    });

    // POST on pictures_to_book table and update done status of topic table
    await postPicBook({
      book: bookId,
      topicId: topicId,
    });
  };

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

  return (
    <div id="main-element" className="h-full">
      <main className="h-min-full flex w-full flex-col">
        <div className="mx-24 my-4 flex flex-col justify-center items-center gap-2 text-yellow-600 xl:flex-row">
          <p className="text-6xl">{topic}</p>
          {/* <div className="grow"></div>
          <p className="text-4xl">deadline: {deadline}</p> */}
        </div>

        {/* <div className="mx-24 mb-12 gap-5 flex flex-col xl:flex-row">
          <div className="relative aspect-[3/2] w-full xl:w-3/5 rounded-2xl border-[5px] border-[#E6B555]">
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
          <div className="flex w-full xl:w-2/5 flex-col gap-4 xl:justify-around">
            <div className="flex flex-row gap-4">
              <div className="relative aspect-[1/2] xl:aspect-[1/3] w-1/4 rounded-3xl bg-[#D9D9D9] justify-center items-center">
                <div className="flex flex-col gap-5 xl:gap-10 justify-center item-center h-full">
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
                className="justify-center rounded-2xl border-[5px] border-solid border-amber-700 bg-orange-300 px-4 py-2 xl:py-4"
              >
                Next
              </button>
              <button
                disabled={loading}
                // onClick={handleConfirmDialog}
                className="justify-center rounded-2xl border-[5px] border-solid border-amber-700 bg-orange-300 px-4 py-2 xl:py-4"
              >
                Done
              </button>
            </div>
          </div>
        </div> */}

        <div className="mx-24 flex flex-col gap-5 flex flex-col xl:flex-row">
          <div className="relative aspect-[3/2] xl:w-3/5 xl:mb-12 rounded-2xl border-4 border-[#E6B555]">
            <div
              ref={elementRef}
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

          <div className="flex flex-col gap-4 xl:w-2/5 xl:mb-12">
            <div className="flex flex-row xl:flex-col w-7/8 gap-4 justify-center item-center mx-4 xl:mx-0 xl:my-2">
              <div className="flex flex-row w-1/2 xl:w-full justify-around xl:rounded-3xl xl:bg-[#D9D9D9] xl:p-6 xl:justify-evenly">
                <div className="gap-1 xl:gap-6 flex flex-col xl:flex-row justify-center item-center">
                  <div className="xl:flex xl:flex-col xl:justify-between">
                    <div className="flex flex-row gap-2 justify-center item-center xl:justify-evenly xl:h-1/2">
                      <PiPaintBrushDuotone
                        className={`h-[60px] w-[60px] xl:h-full cursor-pointer self-center rounded-full p-1 ${
                          brush && "bg-slate-100/50"
                        }`}
                        onClick={() => {
                          setEraser(false);
                          setBrush(true);
                          setColor(displayColor);
                        }}
                      />

                      <BsEraser
                        className={`h-[60px] w-[60px] xl:h-full cursor-pointer self-center rounded-full p-1 ${
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
                        className={
                          "my-1 h-full xl:w-full cursor-pointer self-center p-3"
                        }
                      >
                        <input
                          className="w-full"
                          type="range"
                          min="1"
                          max="30"
                          value={brushSize}
                          onChange={handleSizeChange}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="border-4 border-black rounded-2xl justify-center text-3xl flex items-center rounded-lg border-2 border-black px-2 mx-6 xl:my-3 xl:py-2 xl:px-4 text-black hover:bg-description/80"
                    onClick={clear}
                  >
                    Clear
                  </button>
                </div>
                <div className="h-full cursor-pointer self-center justify-center item-center p-1">
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
              <div className="w-1/2 xl:w-full xl:aspect-[2/1]">
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-full resize-none items-start rounded-2xl border-4 border-[#8B8B8B] bg-[#FBEFDF] px-4 py-2 text-3xl"
                  placeholder="Type description for your story..."
                  maxLength={100}
                />
              </div>
            </div>

            <div className="mx-4 mb-4 grid grid-flow-col justify-stretch gap-6 text-5xl text-amber-700">
              <button
                disabled={loading}
                onClick={handleNextClick}
                className="justify-center rounded-2xl border-[5px] border-solid border-amber-700 bg-orange-300 px-4 py-2"
              >
                Next
              </button>
              <button
                disabled={loading}
                onClick={handleDoneClick}
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
