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
   Container,
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
      hostName: 'Stoyan Stoyanov',
      currentNumberOfPlayers: 5,
      maybePlayers: 2,
      maximumNumberOfPlayers: 12,
      description: "Have fun",
      eventStatus: 'Upcoming',
      participants: [{name: 'Kris Koruev', status: 'None'}],
      currentUserStatus: 'None'
   };
   return invitation;
}


export default function Invitation() {
   const invitation: ExpandedInvitation = useLoaderData<typeof  loader>();

   const imageUrl = 'https://images.expertreviews.co.uk/wp-content/uploads/2023/09/best-football-lead-scaled.jpg?width=626&height=352&fit=crop&format=webply';
   // Use the invitationId to fetch data or for other logic
   // return (
   //    <Box sx={{ flexGrow: 1, m: 2 }}>
   //       <Grid container spacing={3}>
   //          {/* Event Details Section */}
   //          <Grid item xs={12}>
   //             <Card raised>
   //                <CardContent>
   //                   <Typography variant="h5" component="div">
   //                      {invitation.eventName}
   //                   </Typography>
   //                   <Typography sx={{ mb: 1.5 }} color="text.secondary">
   //                      {`${invitation.date} at ${invitation.time}`}
   //                   </Typography>
   //                   <Typography variant="body2">
   //                      Location: {invitation.location} <MapOutlined sx={{ fontSize: "small" }} />
   //                   </Typography>
   //                   <Typography variant="body2">
   //                      Hosted by: {invitation.hostName}
   //                   </Typography>
   //                </CardContent>
   //             </Card>
   //          </Grid>
   //
   //          {/* Participation Details */}
   //          <Grid item xs={12}>
   //             <Card raised>
   //                <CardContent>
   //                   <Typography variant="body1">{invitation.description}</Typography>
   //                   <Typography sx={{ mt: 1.5 }} variant="body2">
   //                      {`${invitation.currentNumberOfPlayers}/${invitation.maximumNumberOfPlayers} Players have joined, ${invitation.maybePlayers} Maybe`}
   //                   </Typography>
   //                </CardContent>
   //             </Card>
   //          </Grid>
   //
   //          {/* User Action Section - Conditional rendering based on currentUserStatus */}
   //          <Grid item xs={12}>
   //             <CardActions>
   //                {invitation.currentUserStatus === 'None' && (
   //                   <>
   //                      <Button variant="contained" color="success">Accept</Button>
   //                      <Button variant="outlined">Maybe</Button>
   //                      <Button variant="outlined" color="error">Reject</Button>
   //                   </>
   //                )}
   //                {/* Implement logic to show current status and potentially an "Undo" action */}
   //             </CardActions>
   //          </Grid>
   //       </Grid>
   //    </Box>
   // );

   return (
      <Container maxWidth="lg">
         <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, bgcolor: 'background.default' }}>
            <Grid container spacing={2} direction="column" alignItems="center">

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
                        <Typography>{`Location: ${invitation.location}`}</Typography>
                        <Typography>{`Host: ${invitation.hostName}`}</Typography>
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
                     <Typography variant="body1">{invitation.description}</Typography>
                     {/* Event details */}
                  </Card>
               </Grid>

               {/* Card 3: Participants List */}
               <Grid item xs={12} md={6}>
                  <Card sx={{ maxHeight: 300, overflow: 'auto' }}>
                     <List>
                        {invitation.participants.map((participant, index) => (
                           <ListItem key={index}>{`${participant.name} (${participant.status})`}</ListItem>
                        ))}
                     </List>
                  </Card>
               </Grid>

            </Grid>
         </Box>
      </Container>

   );
}