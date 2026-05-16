import amqp from "amqplib";

let channel;
let connection;

const connectToRabbitMQ = async () => {
  try {
    connection = await amqp.connect("amqp://rabbitmq");
    channel = await connection.createChannel();
    await channel.assertQueue("todo_created", { durable: true });
    console.log("Connected to RabbitMQ and channel created");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
};

const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }

  return channel;
};

export { connectToRabbitMQ, getChannel };
