export const tasks = [
  {
    id: 1,
    code: "AC-2560",
    description: "Design Portfolio Design Portfolio",
    assignee: "john doe",
    priority: "high",
    status: "in review",
    dueDate: "2023-11-18",
    subRows: [{ id: "1A", code: "AC-2822", description: "Forgot password", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18" }, { id: "1B", code: "AC-2999", description: "Forgot password", assignee: "John Doe", priority: "low", status: "in progress", dueDate: "2023-11-18" }],
  },
  {
    id: 2,
    code: "AC-2499",
    description: "Design Portfolio",
    assignee: "john doe",
    priority: "medium",
    status: "in review",
    dueDate: "2023-11-18",
    subRows: [],

  },
];

export const taskAssignees = [
  { value: "to me", text: "To Me", selected: true },
  { value: "john doe", text: "Jhon Doe", selected: false },
  { value: "smith", text: "Smith", selected: false },
];

export const taskStatuses = [
  { value: "to do", text: "To Do", selected: true, bgColor: "gray", textColor: "white" },
  { value: "in progress", text: "In Progress", selected: false, bgColor: "blue", textColor: "white" },
  { value: "in review", text: "In Review", selected: false, bgColor: "orange", textColor: "white" },
  { value: "done", text: "Done", selected: false, bgColor: "green", textColor: "white" },
];

export const taskPriorities = [
  { value: "high", text: "High", selected: true, bgColor: "red", textColor: "white" },
  { value: "medium", text: "Medium", selected: false, bgColor: "purple", textColor: "white" },
  { value: "low", text: "Low", selected: false, bgColor: "pink", textColor: "white" },
]
