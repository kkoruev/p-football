import { useParams } from "@remix-run/react";

export default function Invitation() {
   const params = useParams();
   const invitationId = params.invitationId; // This should match the dynamic segment of your route's file name

   // Use the invitationId to fetch data or for other logic
   return <div>Invitation ID: {invitationId}</div>;
}