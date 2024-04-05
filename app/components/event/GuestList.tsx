import {
   Avatar,
   Box,
   Button,
   Card,
   CardActions,
   CardContent, Chip,
   Divider,
   Grid,
   List,
   ListItem,
   ListItemAvatar, ListItemText,
   Typography
} from "@mui/material";

import * as React from 'react';
import {ExpandedInvitation} from "~/data/invitation/expanded.invitation";

export default function GuestList({invitation, handleOpenModal}: {
   invitation: ExpandedInvitation,
   handleOpenModal: () => void
}) {
   const displayedGuests = invitation.participants?.slice(0, 5);
   const avatarImg = 'https://shorturl.at/iksOV';

   const getStatusColor = (status: string) => {
      switch (status) {
         case 'Accepted':
            return 'success';
         case 'Maybe':
            return 'warning';
         case 'Rejected':
            return 'error';
         default:
            return 'default';
      }
   };


   return (
      <Card sx={{p: 2}}>
         <CardContent sx={{flex: '1 0 auto'}}>
            <Typography variant="h5" gutterBottom>Guest list</Typography>
            <Box sx={{mb: 2}}>
               <Grid container spacing={2}>
                  <Grid item xs={4}>
                     <Box textAlign="center">
                        <Typography variant="h4">{invitation.numberOfPlayers}</Typography>
                        <Typography variant="caption">Invited</Typography>
                     </Box>
                  </Grid>
                  <Grid item xs={4}>
                     <Box textAlign="center">
                        <Typography variant="h4">{invitation.currentNumberOfPlayers ?? 0}</Typography>
                        <Typography variant="caption">Accepted</Typography>
                     </Box>
                  </Grid>
                  <Grid item xs={4}>
                     <Box textAlign="center">
                        <Typography variant="h4">{invitation.maybePlayers ?? 0}</Typography>
                        <Typography variant="caption">Maybe</Typography>
                     </Box>
                  </Grid>
               </Grid>
               <Divider sx={{my: 2}}/>
            </Box>
         </CardContent>
         {displayedGuests && (
            <List>
               {displayedGuests.map((participant, index) => (
                  <ListItem key={index}>
                     <ListItemAvatar>
                        <Avatar src={avatarImg}></Avatar>
                     </ListItemAvatar>
                     <ListItemText
                        primary={<Typography variant="body1">{participant.name}</Typography>}
                     />
                     <Chip label={participant.status} size="small" variant="outlined"
                           color={getStatusColor(participant.status)}/>
                  </ListItem>
               ))}
            </List>
         )}
         <CardActions>
            <Button onClick={handleOpenModal}>View All Guests</Button>
         </CardActions>
      </Card>
   )
}