import {redirect} from "@remix-run/node";
import {delay} from "~/utils/utils";
import {Form,useNavigation} from "@remix-run/react";


export async function loader() {
   await delay(3000);
   return null;
}

export async function action({ request }) {
   await delay(2000);
   return redirect("/test");
}


export default function Test() {
   const navigation = useNavigation();

   return (
      <div>
         <Form method="post">
            <button type="submit">
               {navigation.state !== "idle" ? "In progress..." : "Submit it"}
            </button>
         </Form>
      </div>
   );
}