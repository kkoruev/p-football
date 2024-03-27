import {ExpandedInvitation} from "~/data/invitation/expanded.invitation";

let invitations: ExpandedInvitation[] = [
   {
      id: 1,
      name: 'Футбол Вторник ||',
      location: 'City Park',
      date: '15-02-2024',
      time: '20:30',
      duration: 60,
      hostName: 'Stoyan Stoyanov',
      currentNumberOfPlayers: 1,
      maybePlayers: 5,
      numberOfPlayers: 12,
      description: "ИГРАЕМ ОТ 20:30 на Winbet Sport & Event Centre!!! \n\n" +
         "Цените са по 120 лв на час заради отоплението ‼️‼️‼️\n" +
         "Носете кеш (или Револют) - 10 лв на човек\n" +
         "Бъдете навреме, за да започнем навреме.\n" +
         "В описанието и таговете може да намерите адреса на мястото, но за по-сигурно, ще го оставя и тук:\n" +
         "ул. Хан Омуртаг 42",
      eventStatus: 'Upcoming',
      participants: [
         {name: 'Kris K', status: 'None'},
         {name: 'Kris P', status: 'Accepted'},
         {name: 'Stoyan S', status: 'Rejected'},
         {name: 'Dimitar P', status: 'Accepted'},
         {name: 'Marto P', status: 'None'},
         {name: 'Marto St', status: 'None'},
         {name: 'Marto Cho', status: 'None'},
         {name: 'Krasi G', status: 'None'},
         {name: 'Andrey I', status: 'None'},
         {name: 'Marto P', status: 'None'},
         {name: 'Marto St', status: 'None'},
         {name: 'Marto Cho', status: 'None'},
         {name: 'Marto Cho', status: 'None'},
      ],
      currentUserStatus: 'None'
   },
   {
      id: 2,
      name: 'Футбол Вторник ||',
      location: 'City Park',
      date: '25-02-2024',
      time: '20:30',
      duration: 60,
      hostName: 'Georgi Ivanov',
      currentNumberOfPlayers: 5,
      maybePlayers: 2,
      numberOfPlayers: 12,
      description: "Това е тестово кратко описание.",
      eventStatus: 'Upcoming',
      participants: [
         {name: 'Kris K', status: 'None'},
         {name: 'Kris P', status: 'Accepted'},
         {name: 'Stoyan S', status: 'Rejected'},
         {name: 'Dimitar P', status: 'Accepted'},
         {name: 'Marto P', status: 'None'},
         {name: 'Marto St', status: 'None'},
         {name: 'Marto Cho', status: 'None'},
         {name: 'Krasi G', status: 'None'},
      ],
      currentUserStatus: 'None'
   },
];

export const getInvitations = (): ExpandedInvitation[] => {
   return invitations;
};

export const addInvitation = (invitation: ExpandedInvitation): void => {
   invitations = [...invitations, invitation];
   console.log("Invitation has been added! Current list: " + invitations);
};

export const updateInvitation = (id: number, update: Partial<ExpandedInvitation>): void => {
   const index = invitations.findIndex(invitation => invitation.id === id);
   if (index !== -1) {
      invitations[index] = { ...invitations[index], ...update };
   }
};

export const findById = (id: number): ExpandedInvitation | null => {
   return invitations.find(invitation => invitation.id === Number(id)) || null;
};