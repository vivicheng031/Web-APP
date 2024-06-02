import emailjs from "@emailjs/browser";

export const sendCustomEmail = async (details) => {
  console.log("[Sending mail]");
  // console.log(details.email);
  // console.log(details.author);
  try {
    // initialize with user ID of email
    emailjs.init("CG6wWsHK9mARUR0AJ");

    // send email with specific service ID and template ID
    // [template]
    // Hi there,
    // I hope this email finds you well!
    // I am excited to share that I've just completed a new picture book, [book], on the New World website. I really enjoyed the process of creating it, and I hope you'll enjoy the journey of this book with me.
    // If you're interested, I'd love for you to come take a look and discuss it with me. Looking forward to hearing your thoughts!
    // Best regards,
    // [author]
    // [template]
    const response = await emailjs.send("service_1o1xydb", "template_4tc9vqo", {
      email: details.email,
      book: details.book,
      author: details.author,
      // file: details.file
    });

    console.log(response);
    return "success";
  } catch (error) {
    console.log("Failed to send email:", error);
    return "fail";
  }
};
