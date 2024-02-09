import {Invitation} from "~/data/invitation";

let invitations: Invitation[] = [
   {
      id: 1,
      eventName: 'Football Game 1',
      location: 'City Park',
      maxPlayers: 10,
      currentPlayers: 5,
      dateTime: '2024-02-01T18:00:00',
   },
   {
      id: 2,
      eventName: 'Football Game 2',
      location: 'City Park 2',
      maxPlayers: 10,
      currentPlayers: 8,
      dateTime: '2024-02-02T18:00:00',
   },
];

export const getInvitations = (): Invitation[] => {
   return invitations;
};

export const updateInvitation = (id: number, update: Partial<Invitation>): void => {
   const index = invitations.findIndex(invitation => invitation.id === id);
   if (index !== -1) {
      invitations[index] = { ...invitations[index], ...update };
   }
};