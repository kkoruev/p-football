import {useLoaderData, useNavigate} from "@remix-run/react";
import {json} from "@remix-run/node";
import {redirect} from '@remix-run/node';
import {
   AppBar,
   Box,
   Button,
   Checkbox,
   Container,
   Drawer, Fab, FormControl,
   FormControlLabel, IconButton, InputLabel, MenuItem,
   Pagination, Select,
   TextField, Toolbar,
   Typography
} from "@mui/material";
import InvitationEntryCard, {
   links as invitationEntryCardLinks
} from "~/components/invitation-entry-card/InvitationEntryCard";

import invitationStyles from '~/styles/invitationsPage.css'
import {getInvitations, updateInvitation} from "~/database/inMemoryInvitations";
import {delay} from "~/utils/utils";
import {ExpandedInvitation} from "~/data/invitation/expanded.invitation";
import EventRepository from "~/repository/event.repository";
import {EventInvitationDb} from "~/data/invitation/event.invitation.db";
import {fromInvitationDbToExpandedInvitation} from "~/utils/invitation.adapter.util";
import {getCurrentUserId} from "~/utils/session.util";
import {Add, Menu} from "@mui/icons-material";

interface InvitationsLoaderData {
   invitations: EventInvitationDb[],
   actionResult: string,
   invitationId: string,
   page: number,
   totalPages: number
}

export async function loader({request}) {
   const userId: number = await getCurrentUserId(request);
   if (!userId) {
      return redirect("/");
   }

   const url = new URL(request.url);
   const actionResult = url.searchParams.get('actionResult');
   const invitationId = url.searchParams.get('id');
   const page = parseInt(url.searchParams.get('page') || '1', 10);
   const limit = 3;
   const skip = (page - 1) * limit;

   const [invitations, total] = await Promise.all([
      EventRepository.getEvents(skip, limit),
      EventRepository.countEvents()
   ]);

   const totalPages = Math.ceil(total / limit);

   return json({invitations, actionResult, invitationId, page, totalPages});
}

export async function action({request}) {
   const formData = await request.formData();
   const action = formData.get("action");
   const invitationId = Number(formData.get('invitationId'));
   const invitations: ExpandedInvitation[] = getInvitations();
   const invitation: ExpandedInvitation = invitations.find(invitation => invitation.id === invitationId);

   // Perform actions based on the form submission
   switch (action) {
      case "Accept":
         // Handle the "Accept" action

         updateInvitation(invitationId, {currentNumberOfPlayers: (invitation.currentNumberOfPlayers + 1)});
         break;
      case "Maybe":
         // Handle the "Maybe" action
         console.log("ListInvitation maybe");
         break;
      case "Reject":
         // Handle the "Reject" action
         updateInvitation(invitationId, {currentNumberOfPlayers: (invitation.currentNumberOfPlayers - 1)});
         break;
      default:
         // Handle other actions or errors
         break;
   }

   // Redirect to avoid resubmitting the form on page refresh
   return redirect(`/invitations?actionResult=${action}&id=${invitationId}`);
}

export default function InvitationsPage() {
   const navigate = useNavigate();
   const {invitations, actionResult, invitationId, page, totalPages} = useLoaderData<InvitationsLoaderData>();

   const handlePageChange = (event, value: number) => {
      navigate(`/invitations?page=${value}`);
   };

   return (
      <Container sx={{bgcolor: 'background.default'}} className="invitations-container">

         <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, bgcolor: 'lightblue' }}>
            <FormControl variant="outlined" sx={{ minWidth: 120, marginRight: 2 }}>
               <InputLabel id="city-select-label">City</InputLabel>
               <Select
                  labelId="city-select-label"
                  id="city-select"
                  label="City"
               >
                  <MenuItem value="">
                     <em>None</em>
                  </MenuItem>
                  <MenuItem value="New York">New York</MenuItem>
                  <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                  <MenuItem value="Chicago">Chicago</MenuItem>
               </Select>
            </FormControl>
         </Box>

         <Box className="invitation-card-container">
            {!invitations.length && (
               <Typography variant="body1">You have no upcoming invitations. Join a football event now!</Typography>
            )}

            { invitations.length && (
               invitations
                  .map((invitation: EventInvitationDb) => fromInvitationDbToExpandedInvitation(invitation))
                  .map((invitation: ExpandedInvitation) => (
                  <InvitationEntryCard key={invitation.id} invitation={invitation}
                                       isLoading="false" actionResult={invitation.id.toString() === invitationId ? actionResult : null}>
                  </InvitationEntryCard>
               ))
            )}
            {totalPages > 0 && (
               <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <Pagination count={totalPages} page={page} onChange={handlePageChange} />
               </Box>
            )}
         </Box>
      </Container>
   )
}

export function links() {
   return [...invitationEntryCardLinks(), {rel: "stylesheet", href: invitationStyles}];
}