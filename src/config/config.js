const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    mongoUri: process.env.MONGO_DEV_CONNECTION_STRING,
    kafkaDevBrokerURL1: process.env.KAFKA_DEV_BROKER_URL1,
    kafkaDevBrokerURL2: process.env.KAFKA_DEV_BROKER_URL2,
    kafkaDevBrokerURL3: process.env.KAFKA_DEV_BROKER_URL3,
    port: process.env.PORT,
  },
  production: {
    mongoUri: process.env.MONGO_PROD_CONNECTION_STRING,
    port: process.env.PORT,
    kafkaProdBrokerURL1: process.env.KAFKA_DEV_BROKER_URL1,
    kafkaProdBrokerURL2: process.env.KAFKA_DEV_BROKER_URL2,
    kafkaProdBrokerURL3: process.env.KAFKA_DEV_BROKER_URL3,
  },
};
