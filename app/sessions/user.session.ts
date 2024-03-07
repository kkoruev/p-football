import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

type SessionData = {
  fbId: string;
  name: string;
  email: string;
};

type SessionFlashData = {

};

export const { getSession: getUserSession, destroySession: destroyUserSession, commitSession: commitUserSession } = createCookieSessionStorage<SessionData, SessionFlashData>(
   {
      cookie: {
         name: "__user_session",

         // all of these are optional
         domain: "localhost",

         httpOnly: true,
         maxAge: 300,
         path: "/",
         sameSite: "lax",
         secrets: ["s3cret1"],
         secure: true,
      }
   }
);