import {useLoaderData, useParams} from "@remix-run/react";
import {delay} from "~/utils/utils";
import {ExpandedInvitation} from "~/data/expanded.invitation";
import {
   Box,
   Button,
   Card,
   CardActions,
   CardContent,
   CardMedia,
   Container, Divider,
   Grid,
   List,
   ListItem,
   Typography
} from "@mui/material";
import {MapOutlined} from "@mui/icons-material";


export async function loader({params}) {
   const { invitationId } = params;
   // this should be call to db to get the Invitation
   // adding delay for the call
   await delay(1000);

   const invitation: ExpandedInvitation = {
      eventName: 'Football Game 1',
      location: 'City Park',
      date: '15-02-2024',
      time: '20:30',
      duration: 60,
      hostName: 'Stoyan Stoyanov',
      currentNumberOfPlayers: 5,
      maybePlayers: 2,
      maximumNumberOfPlayers: 12,
      description: "Цените са по 120 лв на час заради отоплението ‼️‼️‼️\n" +
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
      ],
      currentUserStatus: 'None'
   };
   return invitation;
}


export default function Invitation() {
   const invitation: ExpandedInvitation = useLoaderData<typeof  loader>();

   const imageUrl = 'https://images.expertreviews.co.uk/wp-content/uploads/2023/09/best-football-lead-scaled.jpg?width=626&height=352&fit=crop&format=webply';

   return (
      <Container maxWidth="lg">
         <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, bgcolor: 'background.default' }}>
            <Grid container spacing={3} alignItems="center">

               {/* Card 1: Event Information */}
               <Grid item xs={12}>
                  <Card sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                     <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={imageUrl}
                        alt="Event Image"
                     />
                     <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <Typography variant="h5">{invitation.eventName}</Typography>

                        {/* Action Buttons */}
                        <Box>
                           <Button variant="outlined">Accept</Button>
                           <Button variant="outlined">Maybe</Button>
                           <Button variant="outlined">Reject</Button>
                        </Box>
                     </Box>
                  </Card>
               </Grid>

               {/* Card 2: Event Description and Details */}
               <Grid item xs={12} md={6}>
                  <Card sx={{ p: 2 }}>
                     <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" gutterBottom>Details</Typography>
                        <Typography variant="body2" gutterBottom>{`Host: ${invitation.hostName}`}</Typography>
                        <Typography variant="body2" gutterBottom>{`Location: ${invitation.location}`}</Typography>
                        <Typography variant="body2" gutterBottom>Duration: {invitation.duration} min</Typography>
                        <Typography variant="body2" gutterBottom>Status: {invitation.eventStatus}</Typography>
                        <Divider sx={{ my: 2 }} />
                     </Box>
                     <Typography variant="body2">{invitation.description}</Typography>
                     {/* Event details */}
                  </Card>
               </Grid>

               {/* Card 3: Participants List */}
               <Grid item xs={12} md={6}>
                  <Card sx={{ p: 2, maxHeight: 300, overflow: 'auto' }}>
                     <CardContent sx={{flex: '1 0 auto'}}>
                        <Typography variant="h6" gutterBottom>Guest list</Typography>
                        <Box sx={{ mb: 2 }}>
                           <Grid container spacing={2}>
                              <Grid item xs={4}>
                                 <Typography variant="body2">Invited Players: {invitation.maximumNumberOfPlayers}</Typography>
                              </Grid>
                              <Grid item xs={4}>
                                 <Typography variant="body2">Accepted: {invitation.currentNumberOfPlayers}</Typography>
                              </Grid>
                              <Grid item xs={4}>
                                 <Typography variant="body2">Maybe: {invitation.maybePlayers}</Typography>
                              </Grid>
                           </Grid>
                           <Divider sx={{ my: 2 }} />
                        </Box>
                     </CardContent>
                     <Box sx={{ flex: '1 1 auto', maxHeight: '300px', overflowY: 'auto' }}>
                        <List>
                           {invitation.participants.map((participant, index) => (
                              <ListItem key={index}>{`${participant.name} (${participant.status})`}</ListItem>
                           ))}
                        </List>
                     </Box>
                  </Card>
               </Grid>

            </Grid>
         </Box>
      </Container>

   );
}