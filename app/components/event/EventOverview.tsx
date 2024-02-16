import {Box, Button, Card, CardMedia, Typography} from "@mui/material";
import {ExpandedInvitation} from "~/data/invitation/expanded.invitation";
import {
   AccessTimeFilledRounded,
   CalendarTodayRounded,
} from "@mui/icons-material";

export default function EventOverview({invitation, imageUrl}: {
   invitation: ExpandedInvitation,
   imageUrl: string
}) {

   return (
      <Card sx={{position: 'relative', width: '100%', maxWidth: '100%'}}>
         <CardMedia
            component="img"
            image={imageUrl}
            alt="Event Image"
            sx={{height: {xs: 200, sm: 300}, objectFit: 'cover'}}
         />
         <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.2)', // semi-transparent overlay for better text visibility
            color: 'white',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 2
         }}>
            <Typography variant="h4">{invitation.eventName}</Typography>
            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
               <CalendarTodayRounded/>
               <Typography variant="body1">{`${invitation.date}`}</Typography>
               <AccessTimeFilledRounded/>
               <Typography variant="body1">{`${invitation.time}`}</Typography>
            </Box>
            <Box sx={{display: 'flex', gap: 2}}>
               <Button variant="contained" color="primary">Accept</Button>
               <Button variant="contained" color="secondary">Maybe</Button>
               <Button variant="contained" color="error">Reject</Button>
            </Box>
         </Box>
      </Card>
   )
}