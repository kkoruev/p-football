import {Box, Button, List, ListItem, Modal, Typography} from "@mui/material";
import {ExpandedInvitation} from "~/data/invitation/expanded.invitation";

export default function GuestListExpanded({invitation, modalOpen, handleCloseModal}: {
   invitation: ExpandedInvitation,
   modalOpen: boolean,
   handleCloseModal: () => void
}) {
   return (
      <Modal
         open={modalOpen}
         onClose={handleCloseModal}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
         }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               Guest List
            </Typography>
            <List>
               {invitation.participants.map((participant, index) => (
                  <ListItem key={index}>
                     {`${participant.name} (${participant.status})`}
                  </ListItem>
               ))}
            </List>
            <Box textAlign="center" marginTop={2}>
               <Button variant="contained" onClick={handleCloseModal}>Close</Button>
            </Box>
         </Box>
      </Modal>
   )
}