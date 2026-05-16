import amqp from "amqplib";
import sendEmailToUserEmail from "./util/sendEmail.js";

async function start() {
  try {
    let connection = await amqp.connect("amqp://rabbitmq");
    let channel = await connection.createChannel();
    await channel.assertQueue("todo_created", { durable: true });
    console.log("Email Service is listening for messages...");

    channel.consume("todo_created", (msg) => {
      const todoData = JSON.parse(msg.content.toString());
      console.log("NOTIFICATION: new todo item:", todoData);

      // send email logic
      sendEmailToUserEmail(todoData, todoData.userEmail);

      channel.ack(msg);
    });
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
}

start();
