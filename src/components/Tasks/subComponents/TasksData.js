export const tasks = [
  {
    id: 1,
    code: "AC-0001",
    projectName: "Project 1",
    title: "Task-1",
    description: "Task-1 Description",
    assignee: "john doe",
    priority: "high",
    status: "in review",
    dueDate: "2023-11-18",
    note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.",
    subRows: [{ id: "1A", code: "AC-0001A", title: "Subtask-1A", description: "Subtask-1A Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.", isParentRow: false }, { id: "1B", code: "AC-0001B", title: "Subtask-1B", description: "Subtask-1B Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.", isParentRow: false }],
    subTasksCount: 0,
    isParentRow: true
  },
  {
    id: 2,
    code: "AC-0002",
    projectName: "Project 2",
    title: "Task-2",
    description: "Task-2 Description",
    assignee: "john doe",
    priority: "high",
    status: "in review",
    dueDate: "2023-11-18",
    note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.",
    subRows: [{ id: "2A", code: "AC-0002A", title: "Subtask-2A", description: "Subtask-2A Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.", isParentRow: false }, { id: "2B", code: "AC-0002B", title: "Subtask-2B", description: "Subtask-2B Description", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18", note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, nemo.", isParentRow: false }],
    subTasksCount: 0,
    isParentRow: true
  },
];

export const taskAssignees = [
  { value: "to me", text: "To Me", selected: true },
  { value: "john doe", text: "Jhon Doe", selected: false },
  { value: "smith", text: "Smith", selected: false },
];

export const taskStatuses = [
  { value: "to do", text: "To Do", selected: true, bgColor: "#FFC0CB", textColor: "white" },
  { value: "in progress", text: "In Progress", selected: false, bgColor: "#9370DB", textColor: "white" },
  { value: "in review", text: "In Review", selected: false, bgColor: "#FFD700", textColor: "white" },
  { value: "done", text: "Done", selected: false, bgColor: "#98FB98", textColor: "white" },
];

export const taskPriorities = [
  { value: "high", text: "High", selected: true, bgColor: "#FF5733", textColor: "white" },
  { value: "medium", text: "Medium", selected: false, bgColor: "#F7DC6F", textColor: "white" },
  { value: "low", text: "Low", selected: false, bgColor: "#85C1E9", textColor: "white" },
]




