"use client";

import { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa6";

// import { PDFDocument, rgb } from 'pdf-lib';
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import DialogInput from "./DialogInput";
import { sendCustomEmail } from "./email";

type EmailDialogProps = {
  bookId: string;
  bookTopic: string;
};

// const createPDF = async(pages: Page[]) => {
//   console.log("[createPDF]");
//   const pdfDoc = await PDFDocument.create();

//   for (const page of pages) {
//     // add pages into pdfDoc
//     const pdfPage = pdfDoc.addPage();
//     const { width, height } = pdfPage.getSize();

//     // add image on the current page
//     const imgBytes = await fetch(page.image).then((res) => res.arrayBuffer());
//     const img = await pdfDoc.embedPng(imgBytes);
//     const imgDims = img.scale(1);
//     pdfPage.drawImage(img, {
//       x: 50,
//       y: height - 100,
//       width: imgDims.width,
//       height: imgDims.height,
//     });

//     // add description on the current page
//     pdfPage.drawText(page.description, {
//       x: 50,
//       y: height - imgDims.height - 100,
//       size: 24,
//       color: rgb(0, 0, 0),
//     });

//     const pdfBytes = await pdfDoc.save();
//     return pdfBytes;
//   }
// }

function EmailDialog({ bookId, bookTopic }: EmailDialogProps) {
  const [email, setEmail] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check if email or password is empty
    if (!email || !author) return;

    if (email && author) {
      try {
        // create PDF file
        // const pdfFile = await createPDF(pages);
        // if (pdfFile) {
        //   const fileSizeInMB = pdfFile.length / (1024);
        //   console.log(fileSizeInMB);
        // }

        // send email
        const result = await sendCustomEmail({
          email,
          author,
          book: bookTopic,
        });

        // update send status
        if (result == "success") {
          await fetch("/api/email", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ bookId }),
          });
        }

        router.refresh();
      } catch (e) {
        console.log(e);
        // router.push("/auth/login");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex aspect-[1/1] h-[60px] items-center justify-center rounded-full bg-[#D9D9D9] md:h-[75px] 2xl:h-[90px]">
          <FaRegPaperPlane className="text-[30px] text-[#373737] md:text-[45px] 2xl:text-[60px]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-3 text-5xl text-[#D88253]">
            Send Email ...
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-row items-center justify-center gap-4">
            <DialogInput
              placeholder="His/Her email"
              label="To"
              type="email"
              value={email}
              setValue={setEmail}
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <DialogInput
              placeholder="How he/she calls you"
              label="From"
              type="author"
              value={author}
              setValue={setAuthor}
            />
          </div>
          <Button
            type="submit"
            className="items-center rounded-full border-4 border-[#A8450F] bg-[#F4C2A7] py-6 text-4xl text-[#A8450F] hover:bg-[#DDB085]"
          >
            Send
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EmailDialog;
