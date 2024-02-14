import {Box, Button, Card, CardMedia, Grid, Typography} from "@mui/material";
import {ExpandedInvitation} from "~/data/expanded.invitation";

export default function EventOverview({invitation, imageUrl} : {
   invitation: ExpandedInvitation,
   imageUrl: string
}) {
   return (
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
   )
}