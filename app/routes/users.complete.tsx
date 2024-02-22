import React from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

export default function CompleteProfilePage() {
   // State and handlers

   return (
      <Container maxWidth="md">
         <Box sx={{ mt: 4, mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" textAlign="center">Complete Your Profile</Typography>
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
               Help us tailor your experience by providing a bit more about your sports preferences and abilities.
            </Typography>
            <Box component="form" sx={{ mt: 3, width: '100%' }}>
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  autoComplete="username"
               />
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  autoComplete="email"
               />
               <FormControl fullWidth margin="normal">
                  <InputLabel id="sport-type-label">Sport Type</InputLabel>
                  <Select
                     labelId="sport-type-label"
                     id="sportType"
                     name="sportType"
                     label="Sport Type"
                     defaultValue="Football/Soccer" // Assuming single sport type for now
                  >
                     <MenuItem value="Football/Soccer">Football/Soccer</MenuItem>
                  </Select>
               </FormControl>
               <FormControl fullWidth margin="normal">
                  <InputLabel id="position-label">Position</InputLabel>
                  <Select
                     labelId="position-label"
                     id="position"
                     name="position"
                     label="Position"
                     defaultValue=""
                  >
                     <MenuItem value="Goalkeeper">Goalkeeper</MenuItem>
                     <MenuItem value="Defender">Defender</MenuItem>
                     <MenuItem value="Midfielder">Midfielder</MenuItem>
                     <MenuItem value="Forward">Forward</MenuItem>
                  </Select>
               </FormControl>
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
               />
               <FormControl fullWidth margin="normal">
                  <InputLabel id="skill-level-label">Skill Level</InputLabel>
                  <Select
                     labelId="skill-level-label"
                     id="skillLevel"
                     name="skillLevel"
                     label="Skill Level"
                     defaultValue=""
                  >
                     <MenuItem value="Beginner">Beginner</MenuItem>
                     <MenuItem value="Intermediate">Intermediate</MenuItem>
                     <MenuItem value="Advanced">Advanced</MenuItem>
                     <MenuItem value="Professional">Professional</MenuItem>
                  </Select>
               </FormControl>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
               >
                  Complete Profile
               </Button>
            </Box>
         </Box>
      </Container>
   );
}
