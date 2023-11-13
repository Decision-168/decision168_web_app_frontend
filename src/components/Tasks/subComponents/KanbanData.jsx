import { v4 as uuidv4 } from "uuid";

export const toDoTasks = [
  {
    id: uuidv4(),
    content: {
      id: 1,
      code: "AC-2560",
      projectName: "Test project name 1",
      description: "Design Portfolio Design Portfolio",
      assignee: "john doe",
      priority: "high",
      status: "in review",
      dueDate: "2023-11-18",
      subRows: [
        { id: "1A", code: "AC-2822", description: "Forgot password", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18" },
        { id: "1B", code: "AC-2999", description: "Forgot password", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18" },
      ],
      subTasksCount: 0,
    },
  },
  {
    id: uuidv4(),
    content: {
      id: 2,
      code: "AC-2499",
      projectName: "Test project name 2",
      description: "Design Portfolio",
      assignee: "john doe",
      priority: "medium",
      status: "in review",
      dueDate: "2023-11-18",
      subRows: [],
      subTasksCount: 0,
    },
  },
];

export const inProgressTasks = [
  {
    id: uuidv4(),
    content: {
      id: 1,
      code: "AC-2560",
      projectName: "Test project name 1",
      description: "Design Portfolio Design Portfolio",
      assignee: "john doe",
      priority: "high",
      status: "in review",
      dueDate: "2023-11-18",
      subRows: [
        { id: "1A", code: "AC-2822", description: "Forgot password", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18" },
        { id: "1B", code: "AC-2999", description: "Forgot password", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18" },
      ],
      subTasksCount: 0,
    },
  },
  {
    id: uuidv4(),
    content: {
      id: 2,
      code: "AC-2499",
      projectName: "Test project name 2",
      description: "Design Portfolio",
      assignee: "john doe",
      priority: "medium",
      status: "in review",
      dueDate: "2023-11-18",
      subRows: [],
      subTasksCount: 0,
    },
  },
];

export const inReviewTasks = [
  {
    id: uuidv4(),
    content: {
      id: 1,
      code: "AC-2560",
      projectName: "Test project name 1",
      description: "Design Portfolio Design Portfolio",
      assignee: "john doe",
      priority: "high",
      status: "in review",
      dueDate: "2023-11-18",
      subRows: [
        { id: "1A", code: "AC-2822", description: "Forgot password", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18" },
        { id: "1B", code: "AC-2999", description: "Forgot password", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18" },
      ],
      subTasksCount: 0,
    },
  },
  {
    id: uuidv4(),
    content: {
      id: 2,
      code: "AC-2499",
      projectName: "Test project name 2",
      description: "Design Portfolio",
      assignee: "john doe",
      priority: "medium",
      status: "in review",
      dueDate: "2023-11-18",
      subRows: [],
      subTasksCount: 0,
    },
  },
];

export const doneTasks = [
  {
    id: uuidv4(),
    content: {
      id: 1,
      code: "AC-2560",
      projectName: "Test project name 1",
      description: "Design Portfolio Design Portfolio",
      assignee: "john doe",
      priority: "high",
      status: "in review",
      dueDate: "2023-11-18",
      subRows: [
        { id: "1A", code: "AC-2822", description: "Forgot password", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18" },
        { id: "1B", code: "AC-2999", description: "Forgot password", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18" },
      ],
      subTasksCount: 0,
    },
  },
  {
    id: uuidv4(),
    content: {
      id: 2,
      code: "AC-2499",
      projectName: "Test project name 2",
      description: "Design Portfolio",
      assignee: "john doe",
      priority: "medium",
      status: "in review",
      dueDate: "2023-11-18",
      subRows: [],
      subTasksCount: 0,
    },
  },
];

export const kanbanColumns = {
  [uuidv4()]: {
    name: "To Do",
    color: "#FFC0CB",
    items: toDoTasks,
  },
  [uuidv4()]: {
    name: "In Progress",
    color: "#9370DB",
    items: inProgressTasks,
  },
  [uuidv4()]: {
    name: "In Review",
    color: "#FFD700",
    items: inReviewTasks,
  },
  [uuidv4()]: {
    name: "Done",
    color: "#98FB98",
    items: doneTasks,
  },
};
