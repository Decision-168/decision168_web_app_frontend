import { taskStatuses } from "../components/Tasks/subComponents/TasksData";


// Function to get the style based on the selected status
export const getStatusStyle = (selectedStatus) => {
    const selectedStatusData = taskStatuses.find((status) => status.value === selectedStatus);

    if (selectedStatusData) {
        return {
            backgroundColor: selectedStatusData.bgColor,
            color: selectedStatusData.textColor,
        };
    }

    // Default style if status is not found
    return {
        backgroundColor: '#EBEBEB',
        color: 'black',
    };
};