import axios from "axios";
import api from "../endpoints";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllGoalList = async (user_id, portfolio_id) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.AllGoalList}${user_id}/${portfolio_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkPortfolioMemberActive = async (email_id, portfolio_id) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.PortfolioMemberActive}${email_id}/${portfolio_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getGoalCount = async (user_id, portfolio_id) => {
//   try {
//     const response = await axios.get(
//       `${apiUrl}${api.GoalCount}${user_id}/${portfolio_id}`
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getStrategiesCount = async (user_id, gid, portfolio_id) => {
//   try {
//     const response = await axios.get(
//       `${apiUrl}${api.StrategiesCount}${user_id}/${gid}/${portfolio_id}`
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getGoalRequest = async (gid, gmid, flag) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.GoalRequest}${gid}/${gmid}/${flag}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getGoalInviteRejectRequest = async (gid, igm_id, flag) => {
//   try {
//     const response = await axios.get(
//       `${apiUrl}${api.GoalInviteRejectRequest}${gid}/${igm_id}/${flag}`
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getGoalOverviewRequest = async (user_id, gid) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.GoalOverviewRequest}${user_id}/${gid}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGoalMemberDetailbyGID = async (user_id, gid) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.GoalMemberDetailbyGID}${user_id}/${gid}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGoalsAllStrategiesList = async (gid) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.GoalsAllStrategiesList}${gid}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGoalDetail = async (gid) => {
  try {
    const response = await axios.get(`${apiUrl}${api.GoalDetail}${gid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getViewHistoryDateGoal = async (gid) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.ViewHistoryDateGoal}${gid}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStrategyAllProjectsList = async (sid) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.StrategyAllProjectsList}${sid}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const checkProjectTeamMember = async (user_id, pid) => {
//   try {
//     const response = await axios.get(
//       `${apiUrl}${api.ProjectTeamMember}${user_id}/${pid}`
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getProjectCount = async (user_id, portfolio_id) => {
//   try {
//     const response = await axios.get(
//       `${apiUrl}${api.ProjectCount}${user_id}/${portfolio_id}`
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getAccepted_PortTM_GoalList = async (portfolio_id, gid) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.Accepted_PortTM_GoalList}${portfolio_id}/${gid}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getViewHistoryDateWiseGoal = async (gid, hdate) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.ViewHistoryDateWiseGoal}${gid}/${hdate}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getViewHistoryDateRangeGoal = async (
//   gid,
//   start_date,
//   end_date
// ) => {
//   try {
//     const response = await axios.get(
//       `${apiUrl}${api.ViewHistoryDateRangeGoal}${gid}`,
//       {
//         start_date: start_date,
//         end_date: end_date,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getViewAllHistoryGoal = async (gid) => {
//   try {
//     const response = await axios.get(
//       `${apiUrl}${api.ViewAllHistoryGoal}${gid}`
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const getStrategyDetail = async (sid) => {
  try {
    const response = await axios.get(`${apiUrl}${api.StrategyDetail}${sid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getViewHistoryDateStrategy = async (sid) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.ViewHistoryDateStrategy}${sid}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getViewHistoryDateWiseStrategy = async (sid, hdate) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.ViewHistoryDateWiseStrategy}${sid}/${hdate}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const getViewHistoryDateRangeStrategy = async (
//   sid,
//   start_date,
//   end_date
// ) => {
//   try {
//     const response = await axios.get(
//       `${apiUrl}${api.ViewHistoryDateRangeStrategy}${sid}`,
//       {
//         start_date: start_date,
//         end_date: end_date,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getViewAllHistoryStrategy = async (sid) => {
//   try {
//     const response = await axios.get(
//       `${apiUrl}${api.ViewAllHistoryStrategy}${sid}`
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const InsertGoalData = async (formData) => {
  try {
    const response = await axios.post(`${apiUrl}${api.InsertGoal}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const InsertStrategiesData = async (formData) => {
  try {
    const response = await axios.post(
      `${apiUrl}${api.InsertStrategies}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CopyGoal = async (formData) => {
  try {
    const response = await axios.post(
      `${apiUrl}${api.DuplicateGoal}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddGoalMember = async (formData) => {
  try {
    const response = await axios.post(
      `${apiUrl}${api.InsertGoalMember}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CopyStrategy = async (formData) => {
  try {
    const response = await axios.post(
      `${apiUrl}${api.DuplicateStrategy}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddGoalSuggestTMember = async (formData) => {
  try {
    const response = await axios.post(
      `${apiUrl}${api.InsertGoalSuggestTMember}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const EditGoal = async (formdata) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.UpdateGoal}`, formdata);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DirectlyRemoveGoalManager = async (gid, gmember_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.DirectRemoveGoalManager}${gid}/${gmember_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const RemoveGMember = async (gmid) => {
  try {
    const response = await axios.patch(`${apiUrl}${api.DeleteGMember}${gmid}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateGoalOpenWorkNewAssignee = async (formdata) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.GoalOpenWorkNewAssignee}`,
      formdata
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddGoalManager = async (gid, gmember_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.AssignGoalManager}${gid}/${gmember_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const RemoveIGMember = async (formdata) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.DeleteIGMember}`,
      formdata
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const InsertSuggestedGMember = async (user_id, gid, suggest_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.AddSuggestedGMember}${user_id}/${gid}/${suggest_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const InsertSuggestedIGmember = async (user_id, gid, suggest_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.AddSuggestedIGmember}${user_id}/${gid}/${suggest_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const EditStrategy = async (formdata) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.UpdateStrategy}`,
      formdata
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGoalCreateDD = async (portfolio_id, user_id) => {
  try {
    const response = await axios.get(
      `${apiUrl}${api.GoalCreateDD}${portfolio_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CallFileItGoal = async (goal_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.FileItGoal}${goal_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CallFileItKPI = async (strategy_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.FileItKPI}${strategy_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CallTrashGoal = async (goal_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.TrashGoal}${goal_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CallTrashKPI = async (strategy_id, user_id) => {
  try {
    const response = await axios.patch(
      `${apiUrl}${api.TrashKPI}${strategy_id}/${user_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
