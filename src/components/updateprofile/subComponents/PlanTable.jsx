import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getPackageDetails } from "../../../api/modules/dashboardModule";
import { selectUserDetails } from "../../../redux/action/userSlice";
import { useSelector } from "react-redux";
import moment from "moment";

function createData(currentPackage, packagePrice, amtPaid, startDate, endDate) {
  return { currentPackage, packagePrice, amtPaid, startDate, endDate };
}

const rows = [createData("Solo", 0, "---", "29th Mar 2023 1:33 AM", "---")];

export default function PlanTable() {
  const [loading, setLoading] = useState(true);
  const [pack, setPack] = useState({});
  const user = useSelector(selectUserDetails);

  useEffect(() => {
    const packageDetails = async () => {
      try {
        const response = await getPackageDetails(user?.package_id);
        setPack(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    packageDetails();
  }, [user?.package_id]);

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
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              {pack?.pack_name}
            </TableCell>
            <TableCell>${pack?.pack_price}</TableCell>
            <TableCell>---</TableCell>
            <TableCell>{moment(pack?.pack_created_date).format("Do MMMM YYYY, h:mm a")}</TableCell>
            <TableCell>---</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
