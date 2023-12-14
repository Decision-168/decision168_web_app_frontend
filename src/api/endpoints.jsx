const api = {
  //user register api
  userRegister: "user/register",

  //user verify api
  userVerification: "user/verify/",

  //user login api
  userLogin: "user/login",

  //user forgot-password api
  userForgotPass: "user/forgot-password",

  //user change-password api
  userChangePass: "user/change-password/",

  //-----------------------------Dashboard Module Start----------------

  //user details by user id
  userDetails: "user/get-user/",

  //user package details by pack id
  userPackageDetails: "user/get-package/",

  //user all counts by email id and user id
  userAllCounts: "user/get-all-counts/",

  //get motivator
  userMotivator: "user/get-motivator",

  //get package details
  userPackage: "user/get-package/",

  //update profile by user id
  updateProfile: "user/update-profile/",

  //get dashboard(my day + my next168) recent 5 notifications by user id
  userRecentNotifications: "user/get-recent-notifications/",

  //get My Alert and notifications
  userAlertsAndNotifications: "user/get-alert-notifications/",

  //update dashboard + bell icon clear alert notifications by different id's, user id and type
  updateAlertsAndNotifications: "user/update-alert-notifications/",

  //get countries
  countries: "user/get-countries",

  //-----------------------------Goal & KPI Modlue Start----------------

  // //GoalsList
  // CreatedGoalList: "goal/get-goals-list/",

  // //AcceptedGoalsAllList
  // AcceptedGoalList: "goal/get-accepted-goals-list/",

  // //PendingGoalsAllList
  // PendingGoalList: "goal/get-pending-goals-list/",

  // //ReadMoreGoalsAllList
  // ReadMoreGoalList: "goal/get-readmore-goals-list/",

  //AllGoalList
  AllGoalList: "goal/get-all-goals-list/",

  //check_PortfolioMemberActive
  PortfolioMemberActive: "goal/check-portfolio-member-active/",

  //getGoalCount
  GoalCount: "goal/get-goal-count/",

  //Goal_tasks
  GoalTasks: "goal/get-goal-tasks/",

  //Goal_subtasks
  GoalSubtasks: "goal/get-goal-subtasks/",

  // //Goalprogress_done
  // GoalTasksProgressDone: "goal/get-goal-task-progress-done/",

  // //Goalprogress_total
  // GoalTasksProgressTotal: "goal/get-goal-task-progress-total/",

  // //Goalsub_progress_done
  // GoalSubtasksProgressDone: "goal/get-goal-subtask-progress-done/",

  // //Goalsub_progress_total
  // GoalSubtasksProgressTotal: "goal/get-goal-subtask-progress-total/",

  // //GoalProgress
  // GoalProgress: "goal/get-goal-progress/",

  //getStrategiesCount
  StrategiesCount: "goal/get-strategies-count/",

  //goal-request
  GoalRequest: "goal-request/",

  //goal-invite-reject-request
  GoalInviteRejectRequest: "goal-invite-reject-request/",

  //goal-overview-request
  GoalOverviewRequest: "goal/goal-overview-request/",

  //getGoalMemberDetailbyGID
  GoalMemberDetailbyGID: "goal/goal-member-detail/",

  //get_PDepartment
  PDepartment: "goal/get-department-name/",

  // //GoalTeamMember
  // GoalTeamMember: "goal/goal-team-member/",

  // //InvitedGoalMember
  // InvitedGoalMember: "goal/goal-invited-member/",

  //GoalsAllStrategiesList
  GoalsAllStrategiesList: "goal/goal-all-strategies-list/",

  //GoalDetail
  GoalDetail: "goal/goal-detail/",

  //view_history_date_goal
  ViewHistoryDateGoal: "goal/view-history-date-goal/",

  //GoalDetailAccepted
  GoalDetailAccepted: "goal/goal-detail-accepted/",

  //file_itStrategy_tasks
  FileItStrategyTasks: "goal/file-it-strategy-tasks/",

  //file_itStrategy_subtasks
  FileItStrategySubtasks: "goal/file-it-strategy-subtasks/",

  // //Strategyprogress_done
  // StrategyTasksProgressDone: "goal/get-strategy-task-progress-done/",

  // //Strategyprogress_total
  // StrategyTasksProgressTotal: "goal/get-strategy-task-progress-total/",

  // //Strategysub_progress_done
  // StrategySubtasksProgressDone: "goal/get-strategy-subtask-progress-done/",

  // //Strategysub_progress_total
  // StrategySubtasksProgressTotal: "goal/get-strategy-subtask-progress-total/",

  // //StrategyProgress
  // StrategyProgress: "goal/get-strategy-progress/",

  //StrategyAllProjectsList
  StrategyAllProjectsList: "goal/get-strategy-all-projects-list/",

  //p_tasks
  ProjectTasks: "goal/get-project-tasks/",

  //p_subtasks
  ProjectSubtasks: "goal/get-project-subtasks/",

  // //progress_done
  // ProjectTasksProgressDone: "goal/get-project-task-progress-done/",

  // //progress_total
  // ProjectTasksProgressTotal: "goal/get-project-task-progress-total/",

  // //sub_progress_done
  // ProjectSubtasksProgressDone: "goal/get-project-subtask-progress-done/",

  // //sub_progress_total
  // ProjectSubtasksProgressTotal: "goal/get-project-subtask-progress-total/",

  // //ProjectProgress
  // ProjectProgress: "goal/get-project-progress/",

  //CheckProjectTeamMember
  ProjectTeamMember: "goal/check-project-team-member/",

  //getProjectCount
  ProjectCount: "goal/get-project-count/",

  //check_notify_goal_suggested
  NotifyGoalSuggested: "goal/check-notify-goal-suggested/",

  // //SuggestedGoalMember
  // SuggestedGoalMember: "goal/goal-suggested-member/",

  // //SuggestedInviteGoalMember
  // SuggestedInviteGoalMember: "goal/goal-suggested-invite-member/",

  // //check_gm
  // CheckGM: "goal/check-gm/",

  //getAccepted_PortTM_GoalList
  Accepted_PortTM_GoalList: "goal/get-all-accepted-portfolio-team-member-goal-list/",

  //getProjectById
  ProjectById: "goal/get-project-by-id/",

  //view_history_date_wise_goal
  ViewHistoryDateWiseGoal: "goal/view-history-date-wise-goal/",

  //view_history_date_range_goal
  ViewHistoryDateRangeGoal: "goal/view-history-date-range-goal/",

  //view_all_history_goal
  ViewAllHistoryGoal: "goal/view-all-history-goal/",

  //GoalTeamMemberAccepted
  GoalTeamMemberAccepted: "goal/get-goal-team-member-accepted/",

  //Strategy_tasks
  StrategyTasks: "goal/strategy-tasks/",

  //Strategy_subtasks
  StrategySubtasks: "goal/strategy-subtasks/",

  //StrategyDetail
  StrategyDetail: "goal/strategy-detail/",

  //view_history_date_strategy
  ViewHistoryDateStrategy: "goal/view-history-date-strategy/",

  //view_history_date_wise_strategy
  ViewHistoryDateWiseStrategy: "goal/view-history-date-wise-strategy/",

  //view_history_date_range_strategy
  ViewHistoryDateRangeStrategy: "goal/view-history-date-range-strategy/",

  //view_all_history_strategy
  ViewAllHistoryStrategy: "goal/view-all-history-strategy/",

  //InsertGoals
  InsertGoal: "goal/insert-goal",

  //InsertStrategies
  InsertStrategies: "goal/insert-strategies",

  //DuplicateGoal
  DuplicateGoal: "goal/duplicate-goal",

  //gdetail_AddMember
  InsertGoalMember: "goal/insert-goal-member",

  //DuplicateStrategy
  DuplicateStrategy: "goal/duplicate-strategy",

  //gdetail_SuggestTMember
  InsertGoalSuggestTMember: "goal/insert-goal-suggest-team-member",

  //UpdateGoals
  UpdateGoal: "goal/update-goal",

  //direct_remove_goalmanager
  DirectRemoveGoalManager: "goal/direct-remove-goal-manager/",

  //delete_gMember
  DeleteGMember: "goal/remove-goal-member/",

  //goal_open_work_new_assignee
  GoalOpenWorkNewAssignee: "goal/goal-open-work-new-assignee",

  //assign_goalmanager
  AssignGoalManager: "goal/assign-goal-manager/",

  //delete_iGMember
  DeleteIGMember: "goal/remove-goal-invited-member",

  //add_SuggestedGMember
  AddSuggestedGMember: "goal/add-suggested-goal-member/",

  //add_Suggested_IGmember
  AddSuggestedIGmember: "goal/add-invited-suggested-goal-member/",

  //UpdateStrategies
  UpdateStrategy: "goal/update-strategies",
  
  //get country by country code
  country: "user/get-country/",

  //getGoalCreateDD
  GoalCreateDD: "goal/get-goal-create-dd/",

  //-----------------------------Porfolio Modlue Start----------------

  //get all portfolio by email_address
  porfolios: "portfolio/get-all-portfolios/",

  //get project and task count by portfolio_id
  projectAndTaskCount: "portfolio/get-project-and-task-count/",

  //get all accepted portfolio team members by portfolio_id
  portfolioTeamMembers: "portfolio/get-all-accepted-portfolio-team-members/",

  //change portfolio member status by pim_id and portfolio_id
  portfolioMemberStatus: "portfolio/change-portfolio-member-status/",

  // assing open work to other team member
  assignOpenWorkToMember: "portfolio/open-work-new-assignee/",

  //get portfolio details by portfolio_id
  portfolioDetails: "portfolio/get-portfolio-details/",

  //insert portfolio department
  insertPortfolioDepartment: "portfolio/insert-project-portfolio-department",

  //get portfolio departments by portfolio_id
  portfolioDepartments: "portfolio/get-portfolio-departments/",

  //update project portfolio department by department id
  portfolioDepartmentUpdate: "portfolio/update-portfolio-department/",

  //insert project portfolio member
  insertPortfolioMember: "portfolio/insert-project-portfolio-member",

  //portfolio-invite-request by portfolio_id,pim_id,flag
  portfolioInviteRequest: "portfolio-invite-request/",

  // update project portfolio member by pim_id
  updateProjectPortfolioMember: "portfolio/update-portfolio-member/",

  //insert portfolio
  insertPortfolio: "portfolio/insert-portfolio",

  //update portfolio by portfolio_id
  updatePortfolio: "portfolio/update-portfolio/",

  //get portfolio count by portfolioId
  getPortfolioCount:"portfolio/get-portfolio-count/",

    //-----------------------------File Cabinet Module Start----------------

  // Get All portfolio departments wise modules
  fileCabinetTreeData: "file-cabinet/data/",

  // Get Goal Data
  fileCabinetGoalData: "file-cabinet/goal-detail/",

  // Get Department Data
  fileCabinetDepartmentData: "file-cabinet/department-detail/",

  // Get User Data
  fileCabinetUserData: "file-cabinet/get-student-detail/",

  // Get Goals KPI Data
  fileCabinetGoalKPIData: "file-cabinet/goal-kpi-detail/",

  // Get KPI Data
  fileCabinetKPIData: "file-cabinet/kpi-detail/",

  // Get KPI Project Data
  fileCabinetKpiProjectData: "file-cabinet/kpi-project-detail/",

  // Get Project Data
  fileCabinetProjectData: "file-cabinet/project-detail/",

  // Get Task Data
  fileCabinetTaskData: "file-cabinet/task-detail/",

  // Get Task Subtask Data
  fileCabinetTaskSubtaskData: "file-cabinet/task-subtask-detail/",

  // Get Subtask Data
  fileCabinetSubtaskData: "file-cabinet/subtask-detail/",

  // Get Portfolio Data
  fileCabinetPortfolioData: "file-cabinet/portfolio-detail/",

  // Get Recent files Data
  fileCabinetRecentFilesData: "file-cabinet/recent-files/",

  // Reopen Goal
  fileCabinetReopenGoal: "file-cabinet/reopen/goal/",

  // Reopen KPI
  fileCabinetReopenKpi: "file-cabinet/reopen/kpi/",

  // Reopen Project
  fileCabinetReopenProject: "file-cabinet/reopen/project/",

  // Reopen Task
  fileCabinetReopenTask: "file-cabinet/reopen/task/",

  // Reopen Subtask
  fileCabinetReopenSubtask: "file-cabinet/reopen/subtask/",

  //-----------------------------Archive Module Start----------------

  // Archive Portfolio
  archivePortfolio: "archive/portfolio/",

  // Archive Goal
  archiveGoal: "archive/goal/",

  // Archive KPI
  archiveKpi: "archive/kpi/",

  // Archive Project
  archiveProject: "archive/project/",

  // Archive Task
  archiveTask: "archive/task/",

  // Archive Subtask
  archiveSubtask: "archive/subtask/",

  // All Archive Data
  allArchiveData: "archive/all-data/",

  // Goal Archive Data
  goalArchiveData: "archive/goal-data/",

  // Kpi Archive Data
  kpiArchiveData: "archive/kpi-data/",

  // Project Archive Data
  projectArchiveData: "archive/project-data/",

  // Task Archive Data
  taskArchiveData: "archive/task-data/",

  // UnArchive Portfolio
  unarchivePortfolio: "archive/reopen/portfolio/",

  // UnArchive Goal
  unarchiveGoal: "archive/reopen/goal/",

  // UnArchive KPI
  unarchiveKpi: "archive/reopen/kpi/",

  // UnArchive Project
  unarchiveProject: "archive/reopen/project/",

  // UnArchive Task
  unarchiveTask: "archive/reopen/task/",

  // UnArchive Subtask
  unarchiveSubtask: "archive/reopen/subtask/",

  //-----------------------------Trash Module Start----------------

  // Delete Portfolio
  deletePortfolio: "trash/delete/portfolio/",

  // Delete Goal
  deleteGoal: "trash/delete/goal/",

  // Delete KPI
  deleteKpi: "trash/delete/kpi/",

  // Delete Project
  deleteProject: "trash/delete/project/",

  // Delete Task
  deleteTask: "trash/delete/task/",

  // Delete Subtask
  deleteSubtask: "trash/delete/subtask/",

  // Delete Project File
  deleteProjectFile: "trash/delete/project-file/",

  // Delete Task File
  deleteTaskFile: "trash/delete/task-file/",

  // Delete Subtask File
  deleteSubtaskFile: "trash/delete/subtask-file/",

  // All Delete Data
  allDeleteData: "trash/all-data/",

  // Goal Delete Data
  goalDeleteData: "trash/goal-data/",

  // Kpi Delete Data
  kpiDeleteData: "trash/kpi-data/",

  // Project Delete Data
  projectDeleteData: "trash/project-data/",

  // Task Delete Data
  taskDeleteData: "trash/task-data/",

  // Files Delete Data
  filesDeleteData: "trash/files-data/",

  // Retrieve Portfolio
  retrievePortfolio: "trash/retrieve/portfolio/",

  // Retrieve Goal
  retrieveGoal: "trash/retrieve/goal/",

  // Retrieve KPI
  retrieveKpi: "trash/retrieve/kpi/",

  // Retrieve Project
  retrieveProject: "trash/retrieve/project/",

  // Retrieve Task
  retrieveTask: "trash/retrieve/task/",

  // Retrieve Subtask
  retrieveSubtask: "trash/retrieve/subtask/",

  // Retrieve Project File
  retrieveProjectFile: "trash/retrieve/project-file/",

  // Retrieve Task File
  retrieveTaskFile: "trash/retrieve/task-file/",

  // Retrieve Subtask File
  retrieveSubtaskFile: "trash/retrieve/subtask-file/",

  // Delete forever Goal
  deleteForeverGoal: "trash/delete-forever/goal/",

  // Delete forever KPI
  deleteForeverKpi: "trash/delete-forever/kpi/",

  // Delete forever Project
  deleteForeverProject: "trash/delete-forever/project/",

  // Delete forever Task
  deleteForeverTask: "trash/delete-forever/task/",

  // Delete forever Subtask
  deleteForeverSubtask: "trash/delete-forever/subtask/",

  // Delete forever Project File
  deleteForeverProjectFile: "trash/delete-forever/project-file/",

  // Delete forever Task File
  deleteForeverTaskFile: "trash/delete-forever/task-file/",

  // Delete forever Subtask File
  deleteForeverSubtaskFile: "trash/delete-forever/subtask-file/",

};
export default api;