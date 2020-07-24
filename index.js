const jwt = require("jsonwebtoken");
const fs = require("fs");
const qs = require("querystring");
const axios = require("axios");

const privateKey = fs.readFileSync("sample_key.p8");

const iat = Math.ceil(new Date().getTime() / 1000);
const exp = iat + 15777000;

const clientSecret = jwt.sign(
  {
    iss: "YOUR_APPLE_ISS",
    iat,
    exp,
    aud: "https://appleid.apple.com",
    sub: "YOUR_APPLE_CLIENT_ID", // example: com.host.exampleApp
  },
  privateKey,
  {
    header: {
      alg: "ES256",
      kid: "YOUR_APPLE_KID",
    },
  }
);

axios
  .post(
    `https://appleid.apple.com/auth/token`,
    qs.stringify({
      grant_type: "authorization_code",
      client_secret: clientSecret,
      client_id: "YOUR_APPLE_CLIENT_ID",
      code: "YOUR_AUTHORIZATION_CODE",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
  .then((response) => {
    console.log({ response });
  });
