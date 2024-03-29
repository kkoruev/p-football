import {CreateInvitationDb} from "~/data/invitation/create.invitation.db";
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
import EventRepository from "~/repository/event.repository";
import {CreateInvitationUi} from "~/data/invitation/create.invitation.ui";


export async function action({request}) {
   const formData = await request.formData();
   const date = formData.get("date")?.toString() || "";
   const time = formData.get("time")?.toString() || "";
   const dateTime = `${date}T${time}`;
   const invitation: CreateInvitationDb = {
      name: formData.get("eventName")?.toString() || "",
      location: formData.get("location")?.toString() || "",
      dateTime: new Date(dateTime),
      duration: parseInt(formData.get("duration")?.toString() || "0", 10),
      numberOfPlayers: parseInt(formData.get("numberOfPlayers")?.toString() || "0", 10),
      description: formData.get("description")?.toString() || "",
      backgroundImage: formData.get("backgroundImage")?.toString() || "",
      private: true
   };

   await EventRepository.createEvent(invitation);

   return redirect('/invitations');
}

export default function CreateInvitationsPage() {

   const backgroundImageOptions = [
      {
         label: 'Default',
         value: 'https://images.expertreviews.co.uk/wp-content/uploads/2023/09/best-football-lead-scaled.jpg?width=626&height=352&fit=crop&format=webply'
      },
      {label: 'Specific', value: 'https://img.freepik.com/free-photo/soccer-into-goal-success-concept_1150-5274.jpg?size=626&ext=jpg&ga=GA1.1.1700460183.1709510400&semt=ais'},
   ];

   const [invitation, setInvitation] = useState<CreateInvitationUi>({
      name: '',
      location: '',
      date: '',
      time: '',
      duration: 0,
      numberOfPlayers: 0,
      description: '',
      backgroundImage: backgroundImageOptions[0].value, // Default to the first image as an example
      private: true
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
         <Box component="form" method="post" sx={{mt: 1}}>
            <Typography variant="h5" sx={{ mb: 1, textAlign: 'center' }}>Create New Event</Typography>
            <TextField
               margin="normal"
               required
               fullWidth
               label="Event Name"
               name="name"
               value={invitation.name}
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