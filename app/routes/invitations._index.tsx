import { useLoaderData } from "@remix-run/react";
import {json} from "@remix-run/node";
import { redirect } from '@remix-run/node';
import {Box, Container, Typography} from "@mui/material";
import InvitationEntryCard, {links as invitationEntryCardLinks} from "~/components/invitation-entry-card/InvitationEntryCard";

import invitationStyles from '~/styles/invitationsPage.css'
import {getInvitations, updateInvitation} from "~/database/inMemoryInvitations";
import {Invitation} from "~/data/invitation";
import {delay} from "~/utils/utils";

export async function loader({request}) {
   const url = new URL(request.url);
   const actionResult = url.searchParams.get('actionResult');
   const invitationId = url.searchParams.get('id');

   const invitations = getInvitations();
   await delay(2000);
   return json({invitations, actionResult, invitationId});
}

export async function action({ request }) {
   const formData = await request.formData();
   const action = formData.get("action");
   const invitationId = Number(formData.get('invitationId'));
   const invitations: Invitation[] = getInvitations();
   const invitation: Invitation = invitations.find(invitation => invitation.id === invitationId);

   // Perform actions based on the form submission
   switch (action) {
      case "Accept":
         // Handle the "Accept" action

         updateInvitation(invitationId, {currentPlayers: (invitation.currentPlayers + 1)});
         break;
      case "Maybe":
         // Handle the "Maybe" action
         console.log("Invitation maybe");
         break;
      case "Reject":
         // Handle the "Reject" action
         updateInvitation(invitationId, {currentPlayers: (invitation.currentPlayers - 1)});
         break;
      default:
         // Handle other actions or errors
         break;
   }

   // Redirect to avoid resubmitting the form on page refresh
   return redirect(`/invitations?actionResult=${action}&id=${invitationId}`);
}

export default function InvitationsPage() {
   const { invitations, actionResult, invitationId } = useLoaderData<typeof loader>();

   return (
      <Container sx={{bgcolor: 'background.default'}}  className="invitations-container">
         <Typography variant="h4" gutterBottom className="header-text">
            My Invitations
         </Typography>

         <Box className="invitation-card-container">
            { !invitations.length && (
               <Typography variant="body1">You have no upcoming invitations. Join a football event now!</Typography>
            )}

            { invitations.length && (
               invitations.map((invitation: Invitation) => (
                  <InvitationEntryCard key={invitation.id} invitation={invitation}
                                       isLoading="false" actionResult={invitation.id.toString() === invitationId ? actionResult : null}>
                  </InvitationEntryCard>
               ))
            )}
         </Box>
      </Container>
   )
}

export function links() {
   return [...invitationEntryCardLinks(), {rel: "stylesheet", href: invitationStyles}];
}