import {
   Alert,
   Button,
   Card, CardActionArea,
   CardActions,
   CardContent,
   CardHeader,
   CircularProgress,
   Typography
} from "@mui/material";
import {Check, EventAvailable, ThumbDown, ThumbUp} from "@mui/icons-material";

import styles from './invitationEntryCard.css';
import '~/styles/global.css'
import {Invitation} from '~/data/invitation'
import {Form, Link, useNavigation} from "@remix-run/react";


export default function InvitationEntryCard({invitation, actionResult}: {
   invitation: Invitation,
   isLoading: boolean,
   actionResult: string | null,
}) {
   const navigation = useNavigation();
   const isSubmitting = navigation.state !== 'idle';
   const shouldShowLoadingIndicator = isSubmitting && (Number(navigation.formData?.get('invitationId')) === invitation.id);

   return (
      <>
         <Card className="invitation-card" variant="outlined">
            <Link to={`/invitations/${invitation.id}`} reloadDocument className='link-inherit'>
               <CardActionArea>
                  <CardHeader title={invitation.eventName} subheader={invitation.location} className="card-header">
                  </CardHeader>
                  <CardContent className="card-content">
                     <Typography variant="body2">Max Players: {invitation.maxPlayers}</Typography>
                     <Typography variant="body2">Current Players: {invitation.currentPlayers}</Typography>
                     <Typography variant="body2">Date and Time: {invitation.dateTime}</Typography>
                  </CardContent>
               </CardActionArea>
            </Link>
            <CardActions className="card-actions">
               {actionResult ? (
                  <Alert sx={{ width: '100%' }} icon={<Check fontSize="inherit" />}  severity="success" action={
                     <Button color="inherit" size="small">
                        UNDO
                     </Button>
                  }>
                     {`${actionResult}`}
                  </Alert>
               ) : shouldShowLoadingIndicator ? (
                  <>
                     <CircularProgress size={24}/>
                  </>
               ) : (
                  <Form method="post">
                        <input type="hidden" name="invitationId" value={invitation.id}/>
                        <Button sx={{ mx: 1 }} variant="outlined" disabled={isSubmitting} name="action" value="Accept" type="submit" size="small" startIcon={<ThumbUp/>}>
                           Accept
                        </Button>
                        <Button sx={{ mx: 1 }} variant="outlined" disabled={isSubmitting} name="action" value="Maybe" type="submit" size="small" startIcon={<EventAvailable/>}>
                           Maybe
                        </Button>
                        <Button sx={{ mx: 1 }} variant="outlined" disabled={isSubmitting} name="action" value="Reject" type="submit" size="small" startIcon={<ThumbDown/>}>
                           Reject
                        </Button>
                  </Form>
               )}
            </CardActions>
         </Card>
      </>
   )
}

export function links() {
   return [{rel: 'stylesheet', href: styles}];
}