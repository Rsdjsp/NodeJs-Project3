require("dotenv").config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  db_password: process.env.DB_PASSWORD,
  db_username: process.env.DB_USERNAME,
  db_host: process.env.DD_HOST,
  db_name: process.env.DB_NAME,
  callback_url:
    process.env.NODE_ENV === "dev"
      ? process.env.CALLBACK_URL_DEVELOPMENT + ":" + process.env.PORT
      : process.env.CALLBACK_URL,
  oauth_client_id: process.env.OAUTH_CLIENT_ID,
  oauth_client_secret: process.env.OAUTH_CLIENT_SECRET,
  facebook_app_id: process.env.FACEBOOK_APP_ID,
  facebook_app_secret: process.env.FACEBOOK_APP_SECRET,
  github_client_id: process.env.GITHUB_CLIENT_ID,
  github_client_secret: process.env.GITHUB_CLIENT_SECRET,
  stripe_sk: process.env.STRIPE_SK,
  stripe_pk: process.env.STRIPE_PK,
  enpoint_sct: process.env.ENPOINT_SCT,
  paypal_cid: process.env.PAYPAL_CID,
  paypal_cs: process.env.PAYPAL_CS,
  paypal_acnt: process.env.PAYPAL_ACNT,
};

module.exports = config;
