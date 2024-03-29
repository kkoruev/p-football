import {getProfileSession} from "~/sessions/profile.session";
import {Session} from "@remix-run/node";

export async function extractProfileSession(request: Request): Promise<Session> {
   const cookie = request.headers.get("Cookie");
   return getProfileSession(cookie);
}

export async function isUserLoggedIn(request: Request): Promise<boolean> {
   const session: Session = await extractProfileSession(request);
   return session.has("name");
}

export async function getCurrentUserId(request: Request): Promise<number> {
   const session: Session = await extractProfileSession(request);
   return session.get("id");
}