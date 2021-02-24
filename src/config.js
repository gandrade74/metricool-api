import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  mongo: {
    url: process.env.MONGODB_URL,
    databaseName: process.env.MONGODB_DBNAME,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PWD
  },
  rabbitMQ: {
    url: process.env.RABBITMQ_URL,
    exchanges: [
      {
        id: 'deadLetter',
        name: process.env.DEAD_LETTER_EXCHANGE,
        queues: [
          {
            id: 'default',
            name: process.env.DEAD_LETTER_QUEUE
          }
        ]
      },
      {
        id: 'gossip',
        name: process.env.GOSSIP_EXCHANGE,
        queues: [
          {
            id: 'sendMessage',
            name: process.env.GOSSIP_SEND_MESSAGE_QUEUE,
            routingKey: process.env.GOSSIP_SEND_MESSAGE_ROUTING_KEY
          }
        ]
      }
    ]
  },
  templates: {
    problemReceived: process.env.PROBLEM_RECEIVED_TEMPLATE,
    contactReceived: process.env.CONTACT_RECEIVED_TEMPLATE,
    complainReceived: process.env.COMPLAIN_RECEIVED_TEMPLATE
  }
};
