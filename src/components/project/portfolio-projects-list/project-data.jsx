export const createData = [
  {
    project: {
      name: "ABC Project 1 Strategy 1",
      description: "ABC Project 1 Strategy 1 desc",
    },
    acceptedTeam: ["Alim Mohammad", "Arshad Khan"],
    invitedTeam: ["Jameel Syed"],
    type: "created-project",
    projectType: 0,
  },
  {
    project: {
      name: "Seasons Projects",
      description: null,
    },
    acceptedTeam: ["Sohail Shaikh", "Arshad Syed"],
    invitedTeam: ["Amin Syed"],
    type: "created-project",
    projectType: 1,
  },
];

export const acceptedData = [
  {
    project: {
      name: "test p",
      description: null,
    },
    acceptedTeam: [],
    invitedTeam: ["Amin Syed"],
    type: "accepted-project",
    projectType: 1,
  },
  {
    project: {
      name: "test p1",
      description: "Lorem ipsum dolor sit amet placerat blandit V...",
    },
    acceptedTeam: ["Sohail Shaikh", "Arshad Syed"],
    invitedTeam: [],
    type: "accepted-project",
    projectType: 0,
  },
];

export const pendingRequest = [
  {
    project: {
      name: "test project for developer",
      description: null,
    },
    acceptedTeam: ["Jameel Syed"],
    invitedTeam: ["Amin Syed"],
    type: "pending-requests",
    projectType: 0,
  },
  {
    project: {
      name: "test project",
      description: null,
    },
    acceptedTeam: [],
    invitedTeam: [],
    type: "pending-requests",
    projectType: 1,
  },
];

export const moreInfoRequest = [
  {
    project: {
      name: "Final Changes Upload and Test all functionality",
      description: "Lorem ipsum dolor sit amet placerat blandit V...",
    },
    acceptedTeam: ["Sohail Shaikh"],
    invitedTeam: ["Jameel Syed"],
    type: "more-info-requests",
    projectType: 1,
  },
  {
    project: {
      name: "Final Changes Upload ",
      description: "Lorem ipsum dolor sit amet placerat blandit V...",
    },
    acceptedTeam: ["Sohail Shaikh"],
    invitedTeam: ["Jameel Syed"],
    type: "more-info-requests",
    projectType: 1,
  },
];
