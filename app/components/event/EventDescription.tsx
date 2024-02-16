import {Box, Button, Card, Divider, Grid, Link, Typography} from "@mui/material";
import {ExpandedInvitation} from "~/data/invitation/expanded.invitation";
import {
   AccessTimeFilledSharp,
   AccessTimeSharp, EventAvailableSharp, EventBusySharp,
   LocationOnSharp,
   PersonOutline,
   PersonOutlineOutlined,
   PersonSharp
} from "@mui/icons-material";
import {useState} from "react";

export default function EventDescription({invitation}: {
   invitation: ExpandedInvitation
}) {

   const [isExpanded, setIsExpanded] = useState(false);
   const displayDescription = isExpanded ? invitation.description : `${invitation.description.slice(0, 150)}...`;

   const toggleDescription = () => {
      setIsExpanded(!isExpanded);
   };

   return (
      <Card sx={{p: 2}}>
         <Box sx={{mb: 2}}>
            <Typography variant="h5" gutterBottom>Details</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
               <PersonSharp sx={{ mr: 0.5 }} />
               <Typography variant="body2">
                  Created by <strong>{invitation.hostName}</strong>
               </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
               <LocationOnSharp sx={{ mr: 0.5 }} />
               <Link href="#" variant="body2" >{invitation.location}</Link>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
               <AccessTimeFilledSharp sx={{ mr: 0.5 }} />
               <Typography variant="body2">Duration: {invitation.duration} min</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
               {invitation.eventStatus !== 'Cancelled' ? <EventAvailableSharp sx={{ mr: 0.5}} /> : <EventBusySharp sx={{ mr: 0.5 }} />}
               <Typography variant="body2" >Status: {invitation.eventStatus}</Typography>
            </Box>
            <Divider sx={{my: 2}}/>
         </Box>
         <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {displayDescription}
         </Typography>
         {invitation.description.length > 150 && (
            <Box textAlign="center">
               <Button color="primary" onClick={toggleDescription}>
                  {isExpanded ? "Read Less" : "Read More"}
               </Button>
            </Box>
         )}
      </Card>
   )
}