import {Box, Card, Divider, Grid, Typography} from "@mui/material";
import {ExpandedInvitation} from "~/data/expanded.invitation";

export default function EventDescription({invitation}: {
   invitation: ExpandedInvitation
}) {
   return (
      <Card sx={{p: 2}}>
         <Box sx={{mb: 2}}>
            <Typography variant="h6" gutterBottom>Details</Typography>
            <Typography variant="body2" gutterBottom>{`Host: ${invitation.hostName}`}</Typography>
            <Typography variant="body2" gutterBottom>{`Location: ${invitation.location}`}</Typography>
            <Typography variant="body2" gutterBottom>Duration: {invitation.duration} min</Typography>
            <Typography variant="body2" gutterBottom>Status: {invitation.eventStatus}</Typography>
            <Divider sx={{my: 2}}/>
         </Box>
         <Typography variant="body2">{invitation.description}</Typography>
      </Card>
   )
}