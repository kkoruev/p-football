import React, {useState} from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import {User} from "~/data/user";
import {redirect} from "@remix-run/node";
import {UserRepository} from "~/repository/user.repository";



export async function action({request}) {
   // await UserRepository.createUser("");

   return redirect('/invitations');
}

export default function CompleteProfilePage() {
   // State and handlers

   const [user, setUser] = useState<User>({
      age: 0, email: "", name: "", skillLevel: "Beginner", sportType: "Football"
   });

   const handleChange = (e) => {
      const {name, value} = e.target;
      setUser(prevState => ({
         ...prevState,
         [name]: value
      }));
      console.log(user);
   };

   return (
      <Container maxWidth="md">
         <Box sx={{ mt: 4, mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" textAlign="center">Complete Your Profile</Typography>
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
               Help us tailor your experience by providing a bit more about your sports preferences and abilities.
            </Typography>
            <Box component="form" method="post" sx={{ mt: 3, width: '100%' }}>
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  autoComplete="name"
                  onChange={handleChange}
               />
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
               />
               <FormControl fullWidth margin="normal">
                  <InputLabel id="sport-type-label">Sport Type</InputLabel>
                  <Select
                     labelId="sport-type-label"
                     id="sportType"
                     name="sportType"
                     label="Sport Type"
                     defaultValue="Football" // Assuming single sport type for now
                     disabled={true}
                  >
                     <MenuItem value="Football">Football</MenuItem>
                  </Select>
               </FormControl>
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  onChange={handleChange}
               />
               <FormControl fullWidth margin="normal">
                  <InputLabel id="skill-level-label">Skill Level</InputLabel>
                  <Select
                     labelId="skill-level-label"
                     id="skillLevel"
                     name="skillLevel"
                     label="Skill Level"
                     defaultValue=""
                     onChange={handleChange}
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
