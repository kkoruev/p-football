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


export async function loader({params}) {
   const {invitationId} = params;
   // this should be call to db to get the Invitation
   // adding delay for the call
   await delay(1000);

   const invitation: ExpandedInvitation = {
      id: 1,
      eventName: 'Футбол Вторник ||',
      location: 'City Park',
      date: '15-02-2024',
      time: '20:30',
      duration: 60,
      hostName: 'Stoyan Stoyanov',
      currentNumberOfPlayers: 5,
      maybePlayers: 2,
      maxPlayers: 12,
      description: "ИГРАЕМ ОТ 20:30 на Winbet Sport & Event Centre!!! \n\n" +
         "Цените са по 120 лв на час заради отоплението ‼️‼️‼️\n" +
         "Носете кеш (или Револют) - 10 лв на човек\n" +
         "Бъдете навреме, за да започнем навреме.\n" +
         "В описанието и таговете може да намерите адреса на мястото, но за по-сигурно, ще го оставя и тук:\n" +
         "ул. Хан Омуртаг 42",
      eventStatus: 'Upcoming',
      participants: [
         {name: 'Kris K', status: 'None'},
         {name: 'Kris P', status: 'Accepted'},
         {name: 'Stoyan S', status: 'Rejected'},
         {name: 'Dimitar P', status: 'Accepted'},
         {name: 'Marto P', status: 'None'},
         {name: 'Marto St', status: 'None'},
         {name: 'Marto Cho', status: 'None'},
         {name: 'Krasi G', status: 'None'},
         {name: 'Andrey I', status: 'None'},
         {name: 'Marto P', status: 'None'},
         {name: 'Marto St', status: 'None'},
         {name: 'Marto Cho', status: 'None'},
         {name: 'Marto Cho', status: 'None'},
      ],
      currentUserStatus: 'None'
   };
   return invitation;
}


export default function Invitation() {
   const invitation: ExpandedInvitation = useLoaderData<typeof loader>();

   const imageUrl = 'https://images.expertreviews.co.uk/wp-content/uploads/2023/09/best-football-lead-scaled.jpg?width=626&height=352&fit=crop&format=webply';
   const imageUrl2 = 'https://shorturl.at/kmtvG';

   const [modalOpen, setModalOpen] = useState(false);
   const handleOpenModal = () => setModalOpen(true);
   const handleCloseModal = () => setModalOpen(false);

   return (
      <Container maxWidth="lg">
         <Box sx={{display: 'flex', justifyContent: 'center', p: 2, bgcolor: 'background.default'}}>
            <Grid container spacing={3} alignItems="center">

               {/* Card 1: Event Information */}
               <Grid item xs={12} sx={{display: 'flex'}}>
                  <EventOverview invitation={invitation} imageUrl={imageUrl2}/>
               </Grid>

               {/* Card 2: Event Description and Details */}
               <Grid item xs={12} md={6}>
                  <EventDescription invitation={invitation}/>
               </Grid>
               {/* Card 3: Participants List */}
               <Grid item xs={12} md={6}>
                  <GuestList invitation={invitation} handleOpenModal={handleOpenModal}/>
               </Grid>

            </Grid>
            <GuestListExpanded invitation={invitation} modalOpen={modalOpen} handleCloseModal={handleCloseModal}/>
         </Box>
      </Container>

   );
}