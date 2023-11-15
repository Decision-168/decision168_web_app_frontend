import { v4 as uuidv4 } from "uuid";

export const toDoTasks = [
  {
    id: uuidv4(),
    content: {
      id: 1,
      code: "AC-0001",
      projectName: "Project 1",
      title: "Task-1",
      description: "Task-1 Description ",
      assignee: "john doe",
      priority: "high",
      status: "to do",
      dueDate: "2023-11-18",
      note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.",
      subRows: [
        { id: "1A", code: "AC-0001A", title: "Subtask-1A", description: "Subtask-1A Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
        { id: "1B", code: "AC-0001B", title: "Subtask-1B", description: "Subtask-1B Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
      ],
      subTasksCount: 0,
    },
  },
  {
    id: uuidv4(),
    content: {
      id: 2,
      code: "AC-0002",
      projectName: "Project 2",
      title: "Task-2",
      description: "Task-2 Description ",
      assignee: "john doe",
      priority: "high",
      status: "to do",
      dueDate: "2023-11-18",
      note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.",
      subRows: [
        { id: "2A", code: "AC-0002A", title: "Subtask-2A", description: "Subtask-2A Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
        { id: "2B", code: "AC-0002B", title: "Subtask-2B", description: "Subtask-2B Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
      ],
      subTasksCount: 0,
    },
  },
];

export const inProgressTasks = [
  {
    id: uuidv4(),
    content: {
      id: 1,
      code: "AC-0001",
      projectName: "Project 1",
      title: "Task-1",
      description: "Task-1 Description ",
      assignee: "john doe",
      priority: "high",
      status: "in progress",
      dueDate: "2023-11-18",
      note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.",
      subRows: [
        { id: "1A", code: "AC-0001A", title: "Subtask-1A", description: "Subtask-1A Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
        { id: "1B", code: "AC-0001B", title: "Subtask-1B", description: "Subtask-1B Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
      ],
      subTasksCount: 0,
    },
  },
  {
    id: uuidv4(),
    content: {
      id: 2,
      code: "AC-0002",
      projectName: "Project 2",
      title: "Task-2",
      description: "Task-2 Description ",
      assignee: "john doe",
      priority: "high",
      status: "in progress",
      dueDate: "2023-11-18",
      note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.",
      subRows: [
        { id: "2A", code: "AC-0002A", title: "Subtask-2A", description: "Subtask-2A Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
        { id: "2B", code: "AC-0002B", title: "Subtask-2B", description: "Subtask-2B Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
      ],
      subTasksCount: 0,
    },
  },
];

export const inReviewTasks = [
  {
    id: uuidv4(),
    content: {
      id: 1,
      code: "AC-0001",
      projectName: "Project 1",
      title: "Task-1",
      description: "Task-1 Description ",
      assignee: "john doe",
      priority: "high",
      status: "in review",
      dueDate: "2023-11-18",
      note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.",
      subRows: [
        { id: "1A", code: "AC-0001A", title: "Subtask-1A", description: "Subtask-1A Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
        { id: "1B", code: "AC-0001B", title: "Subtask-1B", description: "Subtask-1B Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
      ],
      subTasksCount: 0,
    },
  },
  {
    id: uuidv4(),
    content: {
      id: 2,
      code: "AC-0002",
      projectName: "Project 2",
      title: "Task-2",
      description: "Task-2 Description ",
      assignee: "john doe",
      priority: "high",
      status: "in review",
      dueDate: "2023-11-18",
      note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.",
      subRows: [
        { id: "2A", code: "AC-0002A", title: "Subtask-2A", description: "Subtask-2A Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
        { id: "2B", code: "AC-0002B", title: "Subtask-2B", description: "Subtask-2B Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
      ],
      subTasksCount: 0,
    },
  },
];

export const doneTasks = [
  {
    id: uuidv4(),
    content: {
      id: 1,
      code: "AC-0001",
      projectName: "Project 1",
      title: "Task-1",
      description: "Task-1 Description ",
      assignee: "john doe",
      priority: "high",
      status: "done",
      dueDate: "2023-11-18",
      note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.",
      subRows: [
        { id: "1A", code: "AC-0001A", title: "Subtask-1A", description: "Subtask-1A Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
        { id: "1B", code: "AC-0001B", title: "Subtask-1B", description: "Subtask-1B Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
      ],
      subTasksCount: 0,
    },
  },
  {
    id: uuidv4(),
    content: {
      id: 2,
      code: "AC-0002",
      projectName: "Project 2",
      title: "Task-2",
      description: "Task-2 Description ",
      assignee: "john doe",
      priority: "high",
      status: "done",
      dueDate: "2023-11-18",
      note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.",
      subRows: [
        { id: "2A", code: "AC-0002A", title: "Subtask-2A", description: "Subtask-2A Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
        { id: "2B", code: "AC-0002B", title: "Subtask-2B", description: "Subtask-2B Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo." },
      ],
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
