import {destroyProfileSession, getProfileSession} from "~/sessions/profile.session";
import {redirect} from "@remix-run/node";


export async function loader() {
   return redirect("/");
}

export async function action({request}) {
   console.log("Logging out..");
   const session = await getProfileSession(request.headers.get("Cookie"));
   return redirect("/", {
      headers: {
         "Set-Cookie": await destroyProfileSession(session),
      }
   });
}

export default function Logout() {

   return null;
}