import { AddCircle, CheckCircle } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { User } from "~/data/user";


export default function InviteGuest({ open, handleClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [invitedUsers, setInvitedUsers] = useState([]);
    const [sentInvitations, setSentInvitations] = useState([
        { id: 1, name: 'Georgi Todorov', avatar: 'https://shorturl.at/iksOV' }, // example pre-sent invitations
    ]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleInvite = (user) => {
        setInvitedUsers([...invitedUsers, user]);
    };

    const hardcodedResults = [
        { id: 1, name: 'Stoyan Stoyanov', avatar: 'https://shorturl.at/iksOV' },
        { id: 2, name: 'Kris Koruev', avatar: 'https://shorturl.at/iksOV' },
        { id: 3, name: 'Konstantin Kovachev', avatar: 'https://shorturl.at/iksOV' },
    ];

    const filteredResults = searchQuery.length >= 2
        ? hardcodedResults.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase())
            && !invitedUsers.some(invited => invited.id === user.id))
        : [];


    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Invite Friends</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Search for friends"
                    type="text"
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearchChange}
                />

                <Box sx={{ display: 'flex', mt: 2 }}>
                    <Box sx={{ flex: 1, mr: 2 }}>
                        <Typography variant="h6">Search Results</Typography>
                        <List>
                            {filteredResults.map(user => (
                                <ListItem key={user.id}>
                                    <ListItemAvatar>
                                        <Avatar src={user.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={user.name} />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddCircle />}
                                        onClick={() => handleInvite(user)}
                                    >
                                        Invite
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6">Invited Users</Typography>
                        <List>
                            {sentInvitations.map(user => (
                                <ListItem key={user.id}>
                                    <ListItemAvatar>
                                        <Avatar src={user.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={user.name} />
                                    <Chip
                                        label=" Sent"
                                        color="success"
                                        icon={<CheckCircle />}
                                    />
                                </ListItem>
                            ))}
                            {invitedUsers.map(user => (
                                <ListItem key={user.id}>
                                    <ListItemAvatar>
                                        <Avatar src={user.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText primary={user.name} />
                                    <Chip
                                        label="Added"
                                        color="primary"
                                        icon={<AddCircle />}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => { /* Add invite logic */ }}>Invite</Button>
            </DialogActions>
        </Dialog>
    );
}