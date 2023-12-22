import React, { memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const NoGridTaskFound = ({ status }) => {
    return (
        <Card
            style={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#F5F5F5", // Light gray background color
                borderRadius: "0.5rem",
                padding: "16px",
                marginBottom: "16px",
            }}
        >
            <CardContent
                style={{
                    fontSize: "0.8rem", // Adjust the font size as needed
                    color: "#555555", // Dark grey text color
                    padding: "16px",
                }}
            >
                No tasks in {status}
            </CardContent>
        </Card>
    );
};

export default memo(NoGridTaskFound);
