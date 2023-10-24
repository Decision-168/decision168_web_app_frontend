import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(label, value) {
  return { label, value };
}

const rows = [createData("Full Name :", "Arshad Khan"), createData("E-mail Address :", "arshad@oxcytech.com")];

export default function BasicTable() {
  return (
    <TableContainer component={Paper} elevation={0} style={{ maxWidth: "100%", overflowX: "auto" }}>
      <Table aria-label="simple table">
        {/* <TableHead>
          <TableRow>
            <TableCell>heading 1</TableCell>
            <TableCell align="right">heading </TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{ fontWeight: "500" }}>
                {row.label}
              </TableCell>
              <TableCell align="left">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
