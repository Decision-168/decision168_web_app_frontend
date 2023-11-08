export const tasks = [
  {
    id: 1,
    code: "AC-2560",
    projectName: "Test project name 1",
    description: "Design Portfolio Design Portfolio",
    assignee: "john doe",
    priority: "high",
    status: "in review",
    dueDate: "2023-11-18",
    subRows: [{ id: "1A", code: "AC-2822", description: "Forgot password", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18" }, { id: "1B", code: "AC-2999", description: "Forgot password", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18" }],
    subTasksCount: 0,
  },
  {
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




