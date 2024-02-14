import {Box, Button, Card, CardActions, CardContent, Divider, Grid, List, ListItem, Typography} from "@mui/material";
import {ExpandedInvitation} from "~/data/expanded.invitation";

export default function GuestList({invitation, handleOpenModal}: {
   invitation: ExpandedInvitation,
   handleOpenModal: () => void
}) {
   const displayedGuests = invitation.participants.slice(0, 5);

   return (
      <Grid item xs={12} md={6}>
         <Card sx={{ p: 2 }}>
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
            <List>
               {displayedGuests.map((participant, index) => (
                  <ListItem key={index}>{`${participant.name} (${participant.status})`}</ListItem>
               ))}
            </List>
            <CardActions>
               <Button onClick={handleOpenModal}>View All Guests</Button>
            </CardActions>
         </Card>
      </Grid>
   )
}