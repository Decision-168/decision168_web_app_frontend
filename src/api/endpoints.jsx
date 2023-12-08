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
  
  //get country by country code
  country: "user/get-country/",

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

};
export default api;