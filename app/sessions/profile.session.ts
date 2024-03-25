import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
   id: number;
   name: string;
};

type SessionFlashData = {

};


export const { getSession: getProfileSession, destroySession: destroyProfileSession, commitSession: commitProfileSession } = createCookieSessionStorage<SessionData, SessionFlashData>(
   {
      cookie: {
         name: "__profile_session",

         httpOnly: true,
         maxAge: 1800,
         path: "/",
         sameSite: "lax",
         secrets: ["s3cret1"],
         secure: true,
      }
   }
);