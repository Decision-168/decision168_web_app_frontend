// import React, { memo, useState } from "react";
// import {
//   DialogActions,
//   DialogContent,
//   Grid,
//   Button,
//   Divider,
//   Chip,
//   FormControlLabel,
//   Checkbox,
//   Typography,
// } from "@mui/material";
// import { closeModal } from "../../../../redux/action/modalSlice";
// import { useTheme } from "@emotion/react";
// import { useDispatch } from "react-redux";
// import CustomDatePicker from "../../../common/CustomDatePicker";
// import * as XLSX from "xlsx";
// import { toast } from "react-toastify";
// const ExportOptions = ({ name, data }) => {
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   const [formValues, setFormValues] = useState({
//     date: null,
//     startDate: null,
//     endDate: null,
//     allHistory: false,
//   });
//   const handleDob = (date) => {
//     setFormValues({
//       ...formValues,
//       date: date,
//     });
//   };

//   const handleStartDateChange = (date) => {
//     setFormValues({
//       ...formValues,
//       startDate: date,
//     });
//   };

//   const handleEndDateChange = (date) => {
//     setFormValues({
//       ...formValues,
//       endDate: date,
//     });
//   };
//   const exportExcelData = (data, filename) => {
//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
//     XLSX.writeFile(wb, filename);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const options = {
//       weekday: "short",
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     };
//     return date.toLocaleDateString("en-US", options);
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     const options = {
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//     };
//     return date.toLocaleTimeString("en-US", options);
//   };

//   const ExportData = (data) => {
//     const exportData = data.map((item) => ({
//       Date: formatDate(item.h_date),
//       Time: formatTime(item.h_date),
//       Resource: item.h_resource,
//       Activity: item.h_description,
//     }));
//     exportExcelData(exportData, `${name}.xlsx`);
//   };

//   const handleExport = () => {
//     const specificDate = formatDate(formValues?.date, "YYYY-MM-DD");
//     const startDate = formatDate(formValues?.startDate, "YYYY-MM-DD");
//     const endDate = formatDate(formValues?.endDate, "YYYY-MM-DD");
//     if (formValues?.date) {
//       const isDatePresent = data.some((item) => {
//         const formattedDate = formatDate(item.h_date);
//         return formattedDate === specificDate;
//       });
//       if (isDatePresent) {
//         const filteredData = data.filter((item) => {
//           const formattedDate = formatDate(item.h_date, "YYYY-MM-DD");
//           return formattedDate === specificDate;
//         });
//         ExportData(filteredData);
//       } else {
//         toast.error("Unavailable date");
//       }
//     } else if (formValues?.startDate && formValues?.endDate) {
//       if (!startDate || !endDate) {
//         toast.error("Invalid date range");
//         return;
//       }

//       if (new Date(startDate) > new Date(endDate)) {
//         toast.error("Invalid date range: Start date must be before end date");
//         return;
//       }

//       const filteredData = data.filter((item) => {
//         const formattedDate = formatDate(item.h_date, "ddd, MMMM DD, YYYY");
//         const startDateObj = new Date(startDate);
//         const endDateObj = new Date(endDate);
//         const formattedDateObj = new Date(formattedDate);
//         return (
//           formattedDateObj >= startDateObj && formattedDateObj <= endDateObj
//         );
//       });
//       ExportData(filteredData);
//     } else if (formValues?.allHistory === true) {
//       ExportData(data);
//     } else {
//       toast.error("Please Select any option");
//     }
//   };

//   return (
//     <>
//       <DialogContent>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <CustomDatePicker
//               label="Date"
//               value={formValues.date}
//               onChange={handleDob}
//             />
//           </Grid>
//           <Grid item xs={12} alignSelf={"center"}>
//             <Divider>
//               <Chip label="OR" />
//             </Divider>
//           </Grid>
//           <Grid item xs={6}>
//             <CustomDatePicker
//               label="Start Date"
//               value={formValues.startDate}
//               onChange={handleStartDateChange}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <CustomDatePicker
//               label="End Date"
//               value={formValues.endDate}
//               onChange={handleEndDateChange}
//             />
//           </Grid>
//           <Grid item xs={12} alignSelf={"center"}>
//             <Divider>
//               <Chip label="OR" />
//             </Divider>
//           </Grid>
//           <Grid item xs={12}>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={formValues.allHistory}
//                   onChange={(e) =>
//                     setFormValues({
//                       ...formValues,
//                       allHistory: e.target.checked,
//                     })
//                   }
//                   size="small"
//                 />
//               }
//               label={
//                 <Typography
//                   sx={{
//                     color: theme.palette.secondary.main,
//                     fontSize: "13px",
//                   }}
//                 >
//                   All History
//                 </Typography>
//               }
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Grid container>
//           <Grid item xs={12} sm={12} px={2} py={2} textAlign="end">
//             <Button
//               onClick={() => dispatch(closeModal())}
//               size="small"
//               variant="contained"
//               sx={{
//                 mr: 2,
//                 backgroundColor: theme.palette.secondary.main,
//                 color: theme.palette.secondary.light,
//                 "&:hover": { backgroundColor: theme.palette.secondary.dark },
//               }}
//             >
//               Close
//             </Button>

//             <Button variant="contained" size="small" onClick={handleExport}>
//               Export To Excel
//             </Button>
//           </Grid>
//         </Grid>
//       </DialogActions>
//     </>
//   );
// };
// export default memo(ExportOptions);
