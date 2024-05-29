import emailjs from "@emailjs/browser";

const sendCustomEmail = (details) => {
  console.log("Load file...");

  const reader = new FileReader();

  console.log(details.file);
  reader.readAsDataURL(details.file);

  reader.onload = async () => {
    console.log("Send mail...");

    emailjs.init("CG6wWsHK9mARUR0AJ");
    emailjs
      .send("service_1o1xydb", "template_4tc9vqo", {
        to_email: details.to_email,
        parent_name: details.parent_name,
        child_name: details.child_name,
        file: reader.result,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export { sendCustomEmail };
