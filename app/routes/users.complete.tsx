import React, {useState} from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import {User} from "~/data/user";
import {json, redirect} from "@remix-run/node";
import {UserRepository} from "~/repository/user.repository";
import {useActionData} from "@remix-run/react";
import {validateUser} from "~/utils/validation";


export async function action({request}) {
   const formData = await request.formData();

   const userRequest: User = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      sportType: formData.get("sportType")?.toString() || "Football",
      age: parseInt(formData.get("age")?.toString() || "0", 10),
      position: formData.get("position")?.toString() || "GK",
      skillLevel: formData.get("skillLevel")?.toString() || "Beginner"
   }

   const errors = validateUser(userRequest);

   if (Object.keys(errors).length > 0) {
      return json({errors});
   }

   await UserRepository.createUser(userRequest);
   return redirect('/invitations');
}

export default function CompleteProfilePage() {
   const [user, setUser] = useState<User>({
      age: 0, email: "", name: "", skillLevel: "Beginner", sportType: "Football", position: 'GK'
   });

   const [clientErrors, setClientErrors] = useState({});
   const actionData = useActionData<typeof action>() || {};


   const handleChange = (e) => {
      const {name, value} = e.target;
      const newUser: User = { ...user, [name]: value };

      setClientErrors(validateUser(newUser));

      setUser(prevState => ({
         ...prevState,
         [name]: value
      }));
   };

   const getEmailErrors = (): string => {
      if (actionData.errors?.email) {
         return actionData.errors?.email;
      }
      return clientErrors.email;
   }

   const getAgeErrors = (): string => {
      if (actionData.errors?.age) {
         return actionData.errors?.age;
      }
      return clientErrors.age;
   }

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
                  error={!!getEmailErrors()}
                  helperText={getEmailErrors()}
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
               <FormControl fullWidth margin="normal">
                  <InputLabel id="position-label">Position</InputLabel>
                  <Select
                     labelId="position-label"
                     id="position"
                     name="position"
                     label="Position"
                     defaultValue="GK"
                     onChange={handleChange}
                  >
                     <MenuItem value="GK">GK</MenuItem>
                     <MenuItem value="DEF">DEF</MenuItem>
                     <MenuItem value="MID">MID</MenuItem>
                     <MenuItem value="FWD">FWD</MenuItem>
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
                  error={!!getAgeErrors()}
                  helperText={getAgeErrors()}
               />
               <FormControl fullWidth margin="normal">
                  <InputLabel id="skill-level-label">Skill Level</InputLabel>
                  <Select
                     labelId="skill-level-label"
                     id="skillLevel"
                     name="skillLevel"
                     label="Skill Level"
                     defaultValue="Beginner"
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
