import { createTransport, getTestMessageUrl } from "nodemailer";

export default async function sendEmailToUserEmail(todoData, userEmail) {
  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "myles.west@ethereal.email",
      pass: "5bv6TbKDdTQ3vSeJWX",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: "<ToDoApp@gmail.com>",
      to: userEmail,
      subject: "New ToDo Item Created",
      text: `A new ToDo item has been created: ${todoData.title}`,
      html: `A new ToDo item has been created: <b>${todoData.title}</b>`,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}
