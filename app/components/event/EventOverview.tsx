import {Box, Button, Card, CardMedia, Chip, Grid, Typography} from "@mui/material";
import {ExpandedInvitation} from "~/data/expanded.invitation";
import {
   AccessTime, AccessTimeFilledRounded,
   CalendarToday,
   CalendarTodayOutlined,
   CalendarTodayRounded, CalendarTodaySharp,
   CalendarTodayTwoTone
} from "@mui/icons-material";

export default function EventOverview({invitation, imageUrl} : {
   invitation: ExpandedInvitation,
   imageUrl: string
}) {
   return (
      <Grid item xs={12} sx={{ display: 'flex'}}>
         <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, maxWidth: { sm: '75%'}, width: '100%' }}>
            <CardMedia
               component="img"
               sx={{ width: { xs: '100%', sm: '30%'}, height: { xs: 200, sm: 'auto' } }}
               image={imageUrl}
               alt="Event Image"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, m: 2 , justifyContent: 'space-between'}}>
               <Typography variant="h5" sx={{mb: 2}}>{invitation.eventName}</Typography>
               <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
                  <Chip icon={<CalendarTodayRounded />} label={`Date: ${invitation.date}`} color="primary" variant="outlined" />
                  <Chip icon={<AccessTimeFilledRounded />} label={`Time: ${invitation.time}`} color="primary" variant="outlined" />
               </Box>
               {/* Action Buttons */}
               <Box sx={{ mt: 'auto', display: 'flex', gap: 4 }}>
                  <Button variant="contained">Accept</Button>
                  <Button variant="contained" color="secondary">Maybe</Button>
                  <Button variant="outlined" color="error">Reject</Button>
               </Box>
            </Box>
         </Card>
      </Grid>
   )
}