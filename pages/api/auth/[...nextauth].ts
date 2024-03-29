import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import userSchema from "../../../mongoDB/Models/user";
import * as dotenv from "dotenv";
import userConn from "../../../mongoDB/usersConnect";

const bcyrpt = require("bcrypt");

dotenv.config();

export const authOptions = {
  // NEXTAUTH_URL= DOMAIN NAME ==== THIS IS FOR WHEN PUSHING TO PRODUCTION //
  // secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  providers: [
    Credentials({
      // Name displayed on the sign in form
      name: "Username or Email",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "email",
          placeholder: "weeblove21",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // establish input credentials.
        const formUsername = credentials?.username;
        const formPassword = credentials?.password;

        // console.log("creds: ", credentials);

        // Connect to Mongoose DB of users.
        let User = userConn.model("user_model", userSchema);
        // under MONGOOSE docs it says to export schemas instead of MODELS due to connections being only one per model. etc LOOK AT DOCS TO FIX
        const response = await User.find({ username: formUsername }).exec();

        let mongoUser = null;

        if (response.length > 0) {
          let usersArray = await JSON.parse(JSON.stringify(response));
          // if empty array don't run comparison //
          let comparisonCheck = await bcyrpt.compare(
            formPassword,
            usersArray[0].password
          );
          mongoUser = comparisonCheck;
        }

        // check and compare that both username and password hash are valid from mongoDB search, return array where both are true;

        if (mongoUser) {
          // Any object returned will be saved in `user` property of the JWT
          return mongoUser;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error("invalid-credentials");
          // return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
