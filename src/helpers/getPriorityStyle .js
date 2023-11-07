import { taskPriorities } from "../components/Tasks/subComponents/TasksData";


// Function to get the style based on the selected status
export const getPriorityStyle = (selectedPriority) => {
    const selectedPriorityData = taskPriorities.find((priority) => priority.value === selectedPriority);

    if (selectedPriorityData) {
        return {
            backgroundColor: selectedPriorityData.bgColor,
            color: selectedPriorityData.textColor,
        };
    }

    // Default style if status is not found
    return {
        backgroundColor: '#EBEBEB',
        color: 'black',
    };
};