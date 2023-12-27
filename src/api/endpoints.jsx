const api = {
  //-----------------------------User Module Start----------------

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

  //update Auth User Password inside the App by user id
  updateAuthUserPassword:"user/update-password/",

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


  //update bell icon clear all alert notifications by user_id
  clearAllNotificaions : "user/update-all-alert-notifications/",

  //get countries
  countries: "user/get-countries",

  //-----------------------------Goal & KPI Modlue Start----------------

  //AllGoalList
  AllGoalList: "goal/get-all-goals-list/",

  //check_PortfolioMemberActive
  PortfolioMemberActive: "goal/check-portfolio-member-active/",

  // //getGoalCount
  // GoalCount: "goal/get-goal-count/",

  // //getStrategiesCount
  // StrategiesCount: "goal/get-strategies-count/",

  //goal-request
  GoalRequest: "goal-request/",

  // //goal-invite-reject-request
  // GoalInviteRejectRequest: "goal-invite-reject-request/",

  //goal-overview-request
  GoalOverviewRequest: "goal/goal-overview-request/",

  //getGoalMemberDetailbyGID
  GoalMemberDetailbyGID: "goal/goal-member-detail/",

  //GoalsAllStrategiesList
  GoalsAllStrategiesList: "goal/goal-all-strategies-list/",

  //GoalDetail
  GoalDetail: "goal/goal-detail/",

  //view_history_date_goal
  ViewHistoryDateGoal: "goal/view-history-date-goal/",

  //StrategyAllProjectsList
  StrategyAllProjectsList: "goal/get-strategy-all-projects-list/",

  // //CheckProjectTeamMember
  // ProjectTeamMember: "goal/check-project-team-member/",

  // //getProjectCount
  // ProjectCount: "goal/get-project-count/",

  //getAccepted_PortTM_GoalList
  Accepted_PortTM_GoalList:
    "goal/get-all-accepted-portfolio-team-member-goal-list/",

  //view_history_date_wise_goal
  ViewHistoryDateWiseGoal: "goal/view-history-date-wise-goal/",

  // //view_history_date_range_goal
  // ViewHistoryDateRangeGoal: "goal/view-history-date-range-goal/",

  // //view_all_history_goal
  // ViewAllHistoryGoal: "goal/view-all-history-goal/",

  //StrategyDetail
  StrategyDetail: "goal/strategy-detail/",

  //view_history_date_strategy
  ViewHistoryDateStrategy: "goal/view-history-date-strategy/",

  //view_history_date_wise_strategy
  ViewHistoryDateWiseStrategy: "goal/view-history-date-wise-strategy/",

  // //view_history_date_range_strategy
  // ViewHistoryDateRangeStrategy: "goal/view-history-date-range-strategy/",

  // //view_all_history_strategy
  // ViewAllHistoryStrategy: "goal/view-all-history-strategy/",

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

  //FileItGoal
  FileItGoal: "file-cabinet/file-it/goal/",

  //FileItKPI
  FileItKPI: "file-cabinet/file-it/kpi/",

  //TrashGoal
  TrashGoal: "trash/delete/goal/",

  //TrashKPI
  TrashKPI: "trash/delete/kpi/",

  //-----------------------------Porfolio Modlue Start----------------

  //All portfolio by email_address
  getAllPorfolios: "portfolio/all-portfolios/",

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
  getPortfolioCount: "portfolio/get-portfolio-count/",

  //-----------------------------Task Modlue Start----------------

  //Dashboard All tasks (List View)
  getDashboardAlltaskListView: "task/all-tasks-subtasks-list-view/",

  //Dashboard All tasks (Grid View)
  getDashboardAlltaskGridView: "task/all-tasks-subtasks-grid-view/",

  //Task and subtask Editable fields by portfolio id
  editTaskAndSubtask: "task/table-editable/",

  // Change task Status by user id
  changeTaskStatus: "task/change-status/",

  // Change task Status by user id
  changeSubTaskStatus: "subtask/change-status/",

  // Change task Status on checkbox by user id
  changeTaskStatusCheckox: "task/checkbox-change-status/",

  // Change Subtask Status on checkbox by user id
  changeSubTaskStatusCheckox: "subtask/checkbox-change-status/",

  //get Task Details by task_id
  getTaskDetails: "task/task-detail/",

  //get SubTask Details by subtask_id
  getSubTaskDetails: "subtask/subtask-detail/",

  //get portfolio tasks by portfolio id (portfoli-tasks) from the portfolio page
  getPortfolioTasksListView: "task/portfolio-tasks/",

  //get Portfolio Tasks and Subtasks (portfolio-tasks-list)  by portfolio id and reg_id (LIST VIEW)
  getPortfolioTasksSubtasksListView: "task/portfolio-tasks-subtasks-list-view/",

  //get Portfolio Tasks and Subtasks (portfolio-tasks-list)  by portfolio id and reg_id (GRID VIEW)
  getPortfolioTasksSubtasksGridView: "task/portfolio-tasks-subtasks-grid-view/",

  //File It Task by  task_id  and user_id
  fileItTask: "file-cabinet/file-it/task/",

  //File It Task by  subtask_id  and user_id
  fileItSubTask: "file-cabinet/file-it/subtask/",

  // Insert Task by user id
  insertTask: "task/insert-task/",

  // Insert Subtask by portfolio id user id
  insertSubtask: "subtask/insert-subtask/",

  //Update Task  by user id
  updateTask: "task/edit-task/",

  //Update Subtask  by user id
  updateSubtask: "subtask/edit-subtask/",

  //get projects by portfolio_id and user_id
  getProjectsForSelectMenu: "get-projects-list/",

  //get project team members by pid
  getProjectTeamMembers: "project/project-team-members/",

  //Duplicate task
  duplicateTask: "task/duplicate-task",

  //Duplicate Subtask
  duplicateSubtask: "subtask/duplicate-subtask",

  //Change Task Status in Grid View (Drag and Drop) by user id
  changeTaskStatusDND: "task/change-status/",

  //Change Subtask Status in Grid View (Drag and Drop) by user id
  changeSubtaskStatusDND: "subtask/change-status/",

  //get all accepted active portfolio team members(Assignee dropdown) by portfolio id
  activePotfolioTeamMembers:
    "portfolio/get-all-accepted-active-portfolio-team-members/",

  //get all Goal team members without read_more status (Assignee dropdown) by gid
  getGoalTeamMembers: "goal/goal-team-member/",

  //get goal details for (Date Picker Date) by gid
  getGoalDetails: "goal/goal-details/",

  //insert Task file by user id
  insertTaskFile: "task/insert-task-file/",

  //insert Subtask file by user id
  insertSubtaskFile: "subtask/insert-subtask-file/",

  //get Task comments by tid and userid
  getTaskComments: "task/get-task-comments/",

  //get Subask comments by stid and userid
  geSubtaskComments: "subtask/get-subtask-comments/",

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

  //-----------------------------Project Module Start----------------

  // Project List / Grid
  getProjectList: "project/get-project-list/",

  // Portfolio Project List / Grid
  getPortfolioProjectList: "project/get-portfolio-projects-list/",

  // Dashboard Project List / Grid
  getDashboardProjectList: "project/get-dashboard-project-list/",

  // Project Detail
  getProjectById: "project/get-project-by-id/",

  // Task Links
  getProjectTaskLinks: "project/get-project-tasks-links/",

  // Subtask Links
  getProjectSubtaskLinks: "project/get-project-subtasks-links/",

  // Project Task Assignees
  getProjectTaskAssignees: "project/get-project-task-assignee/",

  // Project Files
  getProjectFiles: "project/project-files/",

  //Project History
  ViewHistoryDateProject: "project/view-history-date-project/",

  //Project History Date Wise
  ViewHistoryDateWiseProject: "project/view-history-date-wise-project/",

  //Project History Date Range Wise
  ViewHistoryDateRangeProject: "project/view-history-date-range-project/",

  //All Project History
  ViewAllHistoryProject: "project/view-all-history-project/",

  //Project Comments
  getProjectComments: "project/get-project-comments/",

  //Project Mention List
  getProjectMentionList: "project/mention-list/",

  // FileIt Project
  fileCabinetFileitProject: "file-cabinet/file-it/project/",

  // Duplicate Project
  postCopyProject: "project/duplicate-project/",

  // Insert Comment
  insertProjectComment: "task/insert-comment/",

  // Delete Comment
  deleteProjectComment: "task/delete-comment/",

  // Project Member Data
  projectMemberData: "project/get-project-member-data/",

  // Project Request
  projectRequest: "project-request/",

  // Insert Project Files
  insertProjectFiles: "project/insert-project-files/",

  //Assign Project Manager
  AssignProjectManager: "project/assign-project-manager/",

  //Delete Project Member
  DeleteProjectMember: "project/remove-project-member/",

  //Delete Project Invited Member
  DeleteInvitedProjectMember: "project/remove-project-invited-member",

  //Add Suggested Project Member
  AddSuggestedProjectMember: "project/add-suggested-project-member/",

  //Add Suggested Project Invited Member
  AddSuggestedInvitedProjectMember:
    "project/add-invited-suggested-project-member/",

  //Direct Remove Project Manager
  DirectRemoveProjectManager: "project/direct-remove-project-manager/",

  //Accepted Portfolio team member project list
  Accepted_PortTM_ProjectList:
    "project/get-all-accepted-portfolio-team-member-project-list/",

  //Accepted Goal team member project list
  Accepted_GoalTM_ProjectList:
    "project/get-all-accepted-goal-team-member-project-list/",

  //Insert Project Member
  InsertProjectMember: "project/insert-project-member",

  //Insert Project Suggested Team Member
  InsertProjectSuggestTMember: "project/insert-project-suggest-team-member",

  //project_open_work_new_assignee
  ProjectOpenWorkNewAssignee: "project/project-open-work-new-assignee",

  //getProjectCreateDD
  ProjectCreateDD: "project/get-project-create-dd/",

  //Update Project
  UpdateProject: "project/update-project",

  //Insert Project
  InsertProject: "project/insert-project",

  //Insert Project Links
  updateProjectLink: "project/update-project-links",

  //-----------------------------Upgrade Plan Modlue Start----------------

  //getAllPack
  AllPack: "upgrade-plan/get-all-pack/",

  //get_active_coupons
  ActiveCoupons: "upgrade-plan/get-active-coupons",

  //free_trial_account_access
  FreeTrialAccountAccess: "upgrade-plan/free-trial-account-access",

  //insert_ContactSales
  InsertContactSales: "upgrade-plan/insert-contact-sales",

  //checkout_payment_session_initialize
  CheckoutPaymentSessionInitialize: "upgrade-plan/create-checkout-session",

  //insert_checkout_payment_data
  InsertCheckoutPaymentData: "upgrade-plan/insert-checkout-payment-data",

  //update_subscription
  UpdateSubscription: "upgrade-plan/update-subscription",

  //downgrade_plan
  DowngradePlan: "upgrade-plan/downgrade-plan",

  //UpdateAllUsersPackageDetails
  UpdateAllUsersPackageDetails: "updtae-all-users-package-details",
};
export default api;
