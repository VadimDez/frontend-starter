/**
 * Created by Vadym Yatsyuk on 21.08.18
 */
const path = require("path");
const fs = require("fs");

if (fs.existsSync(path.join(__dirname, ".env"))) {
  require("dotenv-safe").config({
    allowEmptyValues: process.env.NODE_ENV === "production",
    path: path.join(__dirname, ".env"),
    example: path.join(__dirname, ".env.example")
  });
  require("dotenv-safe").load({
    path: path.join(__dirname, ".env"),
    sample: path.join(__dirname, ".env.example")
  });
}

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  DISABLE_LOGIN: process.env.DISABLE_LOGIN,
  APP_ID: {
    SECRET: process.env.APP_ID_SECRET,
    OAUTH_SERVER_URL: process.env.APP_ID_OAUTH_SERVER_URL,
    TENTANT_ID: process.env.APP_ID_TENTANT_ID,
    CLIENT_ID: process.env.APP_ID_CLIENT_ID
  }
};
