export const DashboardLayoutStyle = () => {
    const nav = {
        // "&::-webkit-scrollbar": {
        //   width: "4px",
        // },
        // "&::-webkit-scrollbar-thumb": {
        //   // background: "primary.main", // Change this to your desired color
        //   background: "#B9B8B9",
        //   borderRadius: "6px",
        // },
        // "&::-webkit-scrollbar-thumb:hover": {
        //   background: "primary.dark", // Change this to your desired hover color
        // },
        // "&::-webkit-scrollbar-track": {
        //   background: "background.paper", // Change this to your desired background color
        // },
        position: "relative",
        "&::before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "12px", // Adjust the width as needed
            background: "white", // Change this to your desired color
            borderRadius: "6px",
        },
        "&::-webkit-scrollbar": {
            width: 0, // Set the default scrollbar width to 0
        },
        "&::-webkit-scrollbar-thumb": {
            width: 0,
        },
        "&::-webkit-scrollbar-track": {
            width: 0,
        },
        "&::-webkit-scrollbar-thumb:hover": {
            width: 0,
        },
        height: "90vh",
        overflowY: "auto",
        overflowX: "hidden",
        color: "#B9B8B9",
        backgroundColor: "#383838",
    }

    return { nav }
}