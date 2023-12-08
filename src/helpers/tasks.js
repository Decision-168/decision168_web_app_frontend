// Utility function to format assignee text
export const formatAssigneeText = (assigneeId , regId) => {
    // Replace this logic with your actual logic for displaying the assignee text
    if (assigneeId === regId) {
        return "To Me";
    }
    // Replace 'user1', 'user2', etc., with your actual user identifiers
    const matchingAssignee = taskAssignees.find((assignee) => assignee.value === assigneeId);
    return matchingAssignee ? matchingAssignee.text : "";
};

// Utility function to format priority text
export const formatPriority = (priority) => {
    return priority?.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Utility function to convert status with underscores to user-friendly format
export const formatStatus = (status) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
