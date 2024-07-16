import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import { useState } from "react";


export default function InviteGuest({ open, handleClose }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const hardcodedResults = [
        { id: 1, name: 'Stoyan Stoyanov', avatar: 'https://shorturl.at/iksOV' },
        { id: 2, name: 'Kris Koruev', avatar: 'https://shorturl.at/iksOV' },
        { id: 3, name: 'Konstantin Kovachev', avatar: 'https://shorturl.at/iksOV' },
    ];

    const filteredResults = hardcodedResults.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );



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
                <List>
                    {filteredResults.map(user => (
                        <ListItem key={user.id}>
                            <ListItemAvatar>
                                <Avatar src={user.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={user.name} />
                            <Button variant="outlined" color="primary">Invite</Button>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => { /* Add invite logic */ }}>Invite</Button>
            </DialogActions>
        </Dialog>
    );
}