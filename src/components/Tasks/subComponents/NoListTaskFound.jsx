import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NoListTaskFound = ({ colSpan }) => {
    return (
        <TableRow
            sx={{
                "&:last-child th": { border: 0 },
                width: "100%",
                bgcolor: "#FFFFFF",
            }}
        >
            <TableCell colSpan={colSpan}>
                <Box sx={{ textAlign: "center", padding: "10px" }}>
                    {/* <NoTasksIcon style={{ fontSize: 48, marginBottom: 10 }} /> */}
                    <Typography sx={{
                        fontSize: "1rem", // Adjust the font size as needed
                        color: "#555555", // Dark grey text color
                        padding: "16px",
                    }}>
                        No Task Found!
                    </Typography>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default NoListTaskFound;
