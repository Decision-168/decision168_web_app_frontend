import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(currentPackage, packagePrice, amtPaid, startDate, endDate) {
  return { currentPackage, packagePrice, amtPaid, startDate, endDate };
}

const rows = [createData("Solo", 0, "---", "29th Mar 2023 1:33 AM", "---")];

export default function PlanTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Current Package</TableCell>
            <TableCell>Package Price</TableCell>
            <TableCell>Amount Paid</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.currentPackage}
              </TableCell>
              <TableCell>{row.packagePrice}</TableCell>
              <TableCell>{row.amtPaid}</TableCell>
              <TableCell>{row.startDate}</TableCell>
              <TableCell>{row.endDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
