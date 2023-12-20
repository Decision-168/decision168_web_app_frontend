import { v4 as uuidv4 } from "uuid";

export const filterDataByStatus = (data, status) => {
    return data
      .filter(task => task.tstatus === status)
      .map(task => ({
        id: uuidv4(),
        content: {
          ...task,
          subTasks: task.subTasks
        }
      }))
  };


  
// export const filterDataByStatus = (data, status) => {
//   return data
//     .filter(task => task.tstatus === status)
//     .map(task => ({
//       id: uuidv4(),
//       content: {
//         ...task,
//         subTasks: task.subTasks.filter(subtask => subtask.ststatus === status)
//       }
//     }))
// };
