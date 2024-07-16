import {useLoaderData, useParams} from "@remix-run/react";
import {delay} from "~/utils/utils";
import {ExpandedInvitation} from "~/data/invitation/expanded.invitation";
import {
   Box,
   Container,
   Grid,
} from "@mui/material";
import {useState} from "react";
import EventOverview from "~/components/event/EventOverview";
import EventDescription from "~/components/event/EventDescription";
import GuestList from "~/components/event/GuestList";
import GuestListExpanded from "~/components/event/GuestListExpanded";
import {findById} from "~/database/inMemoryInvitations";
import EventRepository from "~/repository/event.repository";
import {fromInvitationDbToExpandedInvitation} from "~/utils/invitation.adapter.util";
import InviteGuest from "~/components/event/InviteGuest";

export async function loader({params}) {
   const {invitationId} = params;
   const invitation = await EventRepository.getEvent(parseInt(invitationId));

   const exp =  fromInvitationDbToExpandedInvitation(invitation);
   console.log(exp);
   return exp;
}


export default function Invitation() {
   const invitation: ExpandedInvitation = useLoaderData<typeof loader>();

   const [modalOpen, setModalOpen] = useState(false);
   const [isInviteModalOpen, setInviteModalOpen] = useState(false);

   const handleOpenModal = () => setModalOpen(true);
   const handleCloseModal = () => setModalOpen(false);
   const handleOpenInviteModal = () => setInviteModalOpen(true);
   const handleCloseInviteModal = () => setInviteModalOpen(false);

   return (
      <Container maxWidth="lg">
         <Box sx={{display: 'flex', justifyContent: 'center', p: 2, bgcolor: 'background.default'}}>
            <Grid container spacing={3} alignItems="center">

               {/* Card 1: Event Information */}
               <Grid item xs={12} sx={{display: 'flex'}}>
                  <EventOverview invitation={invitation} imageUrl={invitation.backgroundImageUrl}/>
               </Grid>

               {/* Card 2: Event Description and Details */}
               <Grid item xs={12} md={6}>
                  <EventDescription invitation={invitation}/>
               </Grid>
               {/* Card 3: Participants List */}
               <Grid item xs={12} md={6}>
                  <GuestList invitation={invitation} handleOpenModal={handleOpenModal} handleInviteFriendsModal={handleOpenInviteModal}/>
               </Grid>

            </Grid>
            <GuestListExpanded invitation={invitation} modalOpen={modalOpen} handleCloseModal={handleCloseModal}/>
            <InviteGuest open={isInviteModalOpen} handleClose={handleCloseInviteModal}/>
         </Box>
      </Container>

   );
}