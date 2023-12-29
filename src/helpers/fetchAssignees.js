import { activePotfolioTeamMembers, getGoalTeamMembers } from "../api/modules/taskModule";

export const fetchAssignees = async (gid, portfolioId, regId, setAssignees) => {
  try {
    const getAssignees = async (gid, portfolio_id) => {
      try {
        if (gid === 0) {
          // Call the activePotfolioTeamMembers API
          const response = await activePotfolioTeamMembers(portfolio_id);
          return response;
        } else {
          // Call the getGoalTeamMembers API with specific gid
          const response = await getGoalTeamMembers(gid);
          return response;
        }
      } catch (error) {
        throw new Error(`Error fetching team members: ${error.message}`);
      }
    };

    const teamMembers = await getAssignees(gid, portfolioId);

    // Assuming storedRegId is the value you want to compare with reg_id
    const storedRegId = regId;

    // Find the index of the team member with reg_id equal to storedRegId
    const indexOfStoredRegId = teamMembers.findIndex((member) => member.reg_id === storedRegId);

    // If the member with storedRegId is found, replace its name with "Assign to me"
    const updatedTeamMembers = [...teamMembers];
    if (indexOfStoredRegId !== -1) {
      updatedTeamMembers[indexOfStoredRegId].name = "Assign to me";

      // Sort the array so that "Assign to me" is always the first option
      updatedTeamMembers.sort((a, b) => (a.name === "Assign to me" ? -1 : b.name === "Assign to me" ? 1 : 0));

      setAssignees(updatedTeamMembers);
    } else {
      setAssignees(teamMembers);
    }
  } catch (error) {
    console.error(`Error in fetchAssignees: ${error.message}`);
  }
};

//usage
//   useEffect(() => {
//     fetchAssignees(gID, portfolioId, regId, setAssignees);
//   }, [gID, portfolioId]);
