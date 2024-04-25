import {CreateInvitationDb, RepetitionFrequency} from "~/data/invitation/create.invitation.db";
import React, {useState} from "react";
import {
   Box,
   Button,
   Card,
   CardMedia,
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
import {getCurrentUserId} from "~/utils/session.util";
import {City} from "~/data/user";

const MAX_NUMBER_OF_EVENTS: number = 30;

export async function loader({request}) {
   const userId: number = await getCurrentUserId(request);
   if (!userId) {
      return redirect("/");
   }
   return null;
}

export async function action({request}) {
   const userId: number = await getCurrentUserId(request);
   if (!userId) {
      return redirect("/");
   }

   const formData = await request.formData();
   const date = formData.get("date")?.toString() || "";
   const time = formData.get("time")?.toString() || "";
   const dateTime = `${date}T${time}`;
   const invitation: CreateInvitationDb = {
      name: formData.get("name")?.toString() || "",
      location: formData.get("location")?.toString() || "",
      googleMapsLink: formData.get("googleMapsLink")?.toString() || "",
      city: formData.get("city")?.toString() || City.SOFIA,
      dateTime: new Date(dateTime),
      repeatFrequency: formData.get("repeatFrequency")?.toString() || RepetitionFrequency.NONE,
      repeatCount: parseInt(formData.get("repeatCount")?.toString() || "0", 10),
      duration: parseInt(formData.get("duration")?.toString() || "0", 10),
      numberOfPlayers: parseInt(formData.get("numberOfPlayers")?.toString() || "0", 10),
      description: formData.get("description")?.toString() || "",
      backgroundImageUrl: formData.get("backgroundImageUrl")?.toString() || "",
      private: false
   };

   await EventRepository.createEvent(invitation, userId);

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
      googleMapsLink: '',
      city: '',
      date: '',
      time: '',
      repeatCount: 0,
      repeatFrequency: RepetitionFrequency.NONE,
      duration: 0,
      numberOfPlayers: 0,
      description: '',
      backgroundImageUrl: backgroundImageOptions[0].value, // Default to the first image as an example
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
            <FormControl fullWidth margin="normal">
               <InputLabel id="city-label">City</InputLabel>
               <Select
                  labelId="city-label"
                  id="city"
                  required
                  name="city"
                  label="City"
                  defaultValue="Sofia"
                  onChange={handleChange}
               >
                  <MenuItem value={City.SOFIA}>{City.SOFIA}</MenuItem>
                  <MenuItem value={City.PLOVDIV}>{City.PLOVDIV}</MenuItem>
                  <MenuItem value={City.VARNA}>{City.VARNA}</MenuItem>
               </Select>
            </FormControl>
            <TextField
               margin="normal"
               required
               fullWidth
               label="Google Maps Link"
               name="googleMapsLink"
               value={invitation.googleMapsLink}
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
            <FormControl fullWidth margin="normal">
               <InputLabel id="repeat-frequency-label">Repeat Frequency</InputLabel>
               <Select
                  labelId="repeat-frequency-label"
                  id="repeatFrequency"
                  name="repeatFrequency"
                  value={invitation.repeatFrequency || RepetitionFrequency.NONE}
                  label="Repeat Frequency"
                  onChange={handleChange}
               >
                  <MenuItem value={RepetitionFrequency.NONE}>{RepetitionFrequency.NONE}</MenuItem>
                  <MenuItem value={RepetitionFrequency.WEEKLY}>{RepetitionFrequency.WEEKLY}</MenuItem>
                  <MenuItem value={RepetitionFrequency.MONTHLY}>{RepetitionFrequency.MONTHLY}</MenuItem>
               </Select>
            </FormControl>
            {invitation.repeatFrequency && invitation.repeatFrequency !== RepetitionFrequency.NONE && (
               <TextField
                  margin="normal"
                  fullWidth
                  required
                  type="number"
                  label="Number of Occurrences"
                  name="repeatCount"
                  InputLabelProps={{ shrink: true }}
                  value={invitation.repeatCount}
                  onChange={handleChange}
               />
            )}
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
                  id="backgroundImageUrl"
                  name="backgroundImageUrl"
                  value={invitation.backgroundImageUrl}
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
                     image={invitation.backgroundImageUrl}
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