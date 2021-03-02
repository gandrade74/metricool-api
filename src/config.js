import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  jiraApiKey: process.env.JIRA_API_KEY,
  postgres: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  }
};
