import React, {useEffect, useState} from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import {FbProfile, SessionUser, User} from "~/data/user";
import {json, redirect} from "@remix-run/node";
import {FbUserRepository} from "~/repository/fb.user.repository";
import {useActionData, useLoaderData} from "@remix-run/react";
import {validateUser} from "~/utils/validation";
import {ErrorMessages} from "~/utils/error.util";
import {ValidationError} from "~/errors/validation.error";
import {commitUserSession, destroyUserSession, getUserSession} from "~/sessions/user.session";

export async function loader({request}) {
   console.log("In loader");
   console.log(request);

   const session = await getUserSession(
      request.headers.get("Cookie")
   );

   console.log(session.data);

   if (!session.has("name")) {
      return redirect("/");
   }

   const sessionUser: SessionUser = {...session.data};
   return json({sessionUser});
}

export async function action({request}) {
   console.log("In action");
   const formData = await request.formData();

   const userRequest: User = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || null,
      sportType: formData.get("sportType")?.toString() || "Football",
      age: parseInt(formData.get("age")?.toString() || "0", 10),
      city: formData.get("city")?.toString() || "Sofia",
      position: formData.get("position")?.toString() || "GK",
      skillLevel: formData.get("skillLevel")?.toString() || "Beginner"
   }

   const fbProfile: FbProfile = {
      fbId: formData.get("fbId")?.toString() || null
   }

   let errors = validateUser(userRequest);
   console.error(errors);

   if (Object.keys(errors).length > 0) {
      // put the session key here of course.
      return json({errors, values: userRequest});
   }

   try {
      console.log(userRequest);
      await FbUserRepository.createUser(userRequest, fbProfile);
   }  catch (error) {
      if (error instanceof ValidationError) {
         errors = error.errors;
         return json({errors, values: userRequest});
      }
      console.log(error);
      // handle different kind of errors here
   }

   const session = await getUserSession(
      request.headers.get("Cookie")
   );
   return redirect('/invitations', {
      status: 302,
      headers: {
         "Set-Cookie": await commitUserSession(session),
      }});
}

export default function CompleteProfilePage() {
   const data = useLoaderData<typeof loader>();
   const sessionUser = data?.sessionUser;

   // check how to store the fbId here to save it in the DB.
   const [user, setUser] = useState<User>({
       age: "", email: sessionUser.email || "", name: sessionUser.name || "", skillLevel: "Beginner", sportType: "Football", position: 'GK', fbId: sessionUser.fbId
   } as User);

   const [clientErrors, setClientErrors] = useState({});
   const actionData = useActionData<typeof action>() || {};

   useEffect(() => {
      if (actionData?.values) {
         setUser(actionData.values);
      }
   }, [actionData]);

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
         return ErrorMessages[actionData.errors?.email];
      }
      return ErrorMessages[clientErrors.email];
   }

   const getAgeErrors = (): string => {
      if (actionData.errors?.age) {
         return ErrorMessages[actionData.errors?.age]
      }
      return ErrorMessages[clientErrors.age];
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
                  value={user.name}
                  onChange={handleChange}
               />
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={user.email}
                  onChange={handleChange}
                  error={!!getEmailErrors()}
                  helperText={getEmailErrors()}
                  disabled="true"
               />
               <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={user.age}
                  onChange={handleChange}
                  error={!!getAgeErrors()}
                  helperText={getAgeErrors()}
               />
               <FormControl fullWidth margin="normal">
                  <InputLabel id="city-label">City</InputLabel>
                  <Select
                     labelId="city-label"
                     id="city"
                     required
                     name="city"
                     label="Position"
                     defaultValue="Sofia"
                     value={user.city}
                     onChange={handleChange}
                  >
                     <MenuItem value="Sofia">Sofia</MenuItem>
                     <MenuItem value="Plovdiv">Plovdiv</MenuItem>
                     <MenuItem value="Varna">Varna</MenuItem>
                  </Select>
               </FormControl>
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
                     value={user.position}
                     onChange={handleChange}
                  >
                     <MenuItem value="GK">GK</MenuItem>
                     <MenuItem value="DEF">DEF</MenuItem>
                     <MenuItem value="MID">MID</MenuItem>
                     <MenuItem value="FWD">FWD</MenuItem>
                  </Select>
               </FormControl>
               <FormControl fullWidth margin="normal">
                  <InputLabel id="skill-level-label">Skill Level</InputLabel>
                  <Select
                     labelId="skill-level-label"
                     id="skillLevel"
                     name="skillLevel"
                     label="Skill Level"
                     defaultValue="Beginner"
                     value={user.skillLevel}
                     onChange={handleChange}
                  >
                     <MenuItem value="Beginner">Beginner</MenuItem>
                     <MenuItem value="Intermediate">Intermediate</MenuItem>
                     <MenuItem value="Advanced">Advanced</MenuItem>
                     <MenuItem value="Professional">Professional</MenuItem>
                  </Select>
                  <input type="hidden" name="fbId" value={user.fbId} />
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
