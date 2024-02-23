import {CreateInvitation} from "~/data/invitation/create.invitation";
import {useState} from "react";
import {
   Box,
   Button, Card, CardMedia,
   Container,
   FormControl,
   Grid,
   InputLabel,
   MenuItem,
   Select,
   TextField,
   Typography
} from "@mui/material";
import {redirect} from "@remix-run/node";
import {delay} from "~/utils/utils";
import {addInvitation} from "~/database/inMemoryInvitations";
import {ExpandedInvitation} from "~/data/invitation/expanded.invitation";


export async function action({request}) {
   const formData = await request.formData();
   const invitation: CreateInvitation = {
      id: 3,
      eventName: formData.get("eventName")?.toString() || "",
      location: formData.get("location")?.toString() || "",
      date: formData.get("date")?.toString() || "",
      time: formData.get("time")?.toString() || "",
      duration: parseInt(formData.get("duration")?.toString() || "0", 10),
      numberOfPlayers: parseInt(formData.get("numberOfPlayers")?.toString() || "0", 10),
      description: formData.get("description")?.toString() || "",
      backgroundImage: formData.get("backgroundImage")?.toString() || ""
   };

   addInvitation({...invitation, currentNumberOfPlayers: 0, participants: []} as ExpandedInvitation);

   await delay(2000);
   return redirect('/invitations');
}

export default function CreateInvitationsPage() {

   const backgroundImageOptions = [
      {
         label: 'Default',
         value: 'https://images.expertreviews.co.uk/wp-content/uploads/2023/09/best-football-lead-scaled.jpg?width=626&height=352&fit=crop&format=webply'
      },
      {label: 'Specific', value: 'https://shorturl.at/kmtvG'},
   ];

   const [invitation, setInvitation] = useState<CreateInvitation>({
      id: 0,
      eventName: '',
      location: '',
      date: '',
      time: '',
      duration: 0,
      numberOfPlayers: 0,
      description: '',
      backgroundImage: backgroundImageOptions[0].value // Default to the first image as an example
   });

   const handleChange = (e) => {
      const {name, value} = e.target;
      setInvitation(prevState => ({
         ...prevState,
         [name]: value
      }));
   };

   return (
      <Container maxWidth="md">
         <Box component="form" method="post" noValidate sx={{mt: 1}}>
            <Typography variant="h5" sx={{ mb: 1, textAlign: 'center' }}>Create New Event</Typography>
            <TextField
               margin="normal"
               required
               fullWidth
               label="Event Name"
               name="eventName"
               value={invitation.eventName}
               onChange={handleChange}
            />
            <TextField
               margin="normal"
               required
               fullWidth
               label="Location"
               name="location"
               value={invitation.location}
               onChange={handleChange}
            />
            <TextField
               margin="normal"
               required
               fullWidth
               type="date"
               label="Date"
               name="date"
               InputLabelProps={{shrink: true}}
               value={invitation.date}
               onChange={handleChange}
            />
            <TextField
               margin="normal"
               required
               fullWidth
               type="time"
               label="Time"
               name="time"
               InputLabelProps={{shrink: true}}
               value={invitation.time}
               onChange={handleChange}
            />
            <TextField
               margin="normal"
               required
               fullWidth
               label="Duration (minutes)"
               name="duration"
               type="number"
               value={invitation.duration}
               onChange={handleChange}
            />
            <TextField
               margin="normal"
               required
               fullWidth
               label="Number of Players"
               name="numberOfPlayers"
               type="number"
               value={invitation.numberOfPlayers}
               onChange={handleChange}
            />
            <TextField
               margin="normal"
               required
               fullWidth
               label="Description"
               name="description"
               multiline
               rows={4}
               value={invitation.description}
               onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
               <InputLabel id="background-image-select-label">Background Image</InputLabel>
               <Select
                  labelId="background-image-select-label"
                  id="backgroundImage"
                  name="backgroundImage"
                  value={invitation.backgroundImage}
                  label="Background Image"
                  onChange={handleChange}
               >
                  {backgroundImageOptions.map((option) => (
                     <MenuItem key={option.value} value={option.value}>
                        {option.label}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <Grid container justifyContent="start" sx={{ my: 1 }}>
               <Card>
                  <CardMedia
                     component="img"
                     image={invitation.backgroundImage}
                     alt="Selected background"
                     sx={{ width: 256, height: 144, objectFit: 'cover' }}
                  />
               </Card>
            </Grid>
            <Button
               type="submit"
               fullWidth
               variant="contained"
               sx={{mt: 3, mb: 2}}
            >
               Create Event
            </Button>
         </Box>
      </Container>
   );
}