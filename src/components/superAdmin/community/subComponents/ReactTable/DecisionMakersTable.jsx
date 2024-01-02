/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useMemo, memo, useCallback, useState, useEffect } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Button, Chip, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../redux/action/modalSlice";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { mkConfig, generateCsv, download } from "export-to-csv";
import ReduxDialog from "../../../common/ReduxDialog";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import DecisionMakerDetail from "../DecisionMakerDetail";
import { getDecisionMakers } from "./../../../../api/modules/communityModule";
import { getDecisionMakerDetail } from "./../../../../api/modules/communityModule";
import StatusSwitch from "../../../common/StatusSwitch";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const DecisionMakersTable = () => {
  const dispatch = useDispatch();

  // get decision makers
  const [allDecisionMakers, setAllDecisionMakers] = useState([]);
  const [decisionMakerDetail, setDecisionMakerDetail] = useState([]);

  const fetchAllDecisionMakers = async () => {
    try {
      const response = await getDecisionMakers();
      setAllDecisionMakers(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllDecisionMakers();
  }, []);

  // get decision maker detail
  const fetchDetail = async (id) => {
    try {
      const response = await getDecisionMakerDetail(id);
      setDecisionMakerDetail(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = useCallback(() => {
    dispatch(
      openCnfModal({
        modalName: "activeModal",
        title: "Are you sure?",
        description: `You want to change the Status`,
      })
    );
  }, [dispatch]);

  const handleView = useCallback(
    (id) => {
      dispatch(openModal("viewDetailModal"));

      fetchDetail(id);
    },
    [dispatch]
  );

  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("Decision Makers List Decision168 Super-Admin.pdf");
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const data = useMemo(
    () =>
      allDecisionMakers &&
      allDecisionMakers.map((decisionMaker, ind) => ({
        sr_no: ind + 1,
        name: `${decisionMaker?.first_name} ${decisionMaker?.middle_name} ${decisionMaker?.last_name}`,
        email: decisionMaker?.email_address,
        status: "",
        expert_approve: decisionMaker?.expert_approve,
        expert: decisionMaker?.expert,
        admin_approve: decisionMaker?.admin_approve,
        applied_on: `${decisionMaker?.expert_apply_date}`.slice(0, 19).replace("T", " "),
        approved_on: `${decisionMaker?.expert_approved_date}`.slice(0, 19).replace("T", " "),
        active: decisionMaker?.expert_status,
        detail: "",
        reg_id: decisionMaker?.reg_id,
      })),
    [allDecisionMakers]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "sr_no",
        header: "Sr. No",
        size: 70,
        enableColumnFilter: false,
        enableEditing: true,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 120,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 90,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        enableEditing: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}>
            {row?.original?.expert_approve === 1 && row?.original?.expert === 1 ? (
              <Chip
                label="Approved & Agreed to Terms"
                color="success"
                size="small"
                sx={{
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                    paddingInline: "4px",
                  },
                  height: "auto",
                  fontSize: "10px",
                  borderRadius: "5px",
                  background: "#34c38f2e",
                  color: "#34c38f",
                }}
              />
            ) : row?.original?.admin_approve === 1 && row?.original?.expert_approve === 0 ? (
              <Chip
                label="Approved By Admin"
                color="success"
                size="small"
                sx={{
                  "& .MuiChip-label": {
                    display: "block",
                    whiteSpace: "normal",
                    paddingInline: "4px",
                  },
                  height: "auto",
                  fontSize: "10px",
                  borderRadius: "5px",
                  background: "#34c38f2e",
                  color: "#34c38f",
                }}
              />
            ) : (
              <Button
                sx={{ mr: 1, minWidth: "36px", padding: "2px 5px", fontSize: "12px" }}
                size="small"
                variant="contained"
                onClick={() => console.log("approve")}>
                Approve
              </Button>
            )}
          </Box>
        ),
      },
      {
        accessorKey: "applied_on",
        header: "Applied On",
        size: 100,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "approved_on",
        header: "Approved On",
        size: 100,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 100,
        enableColumnFilter: false,
        enableEditing: false,
        Cell: ({ row }) => (
          <Box
            onClick={handleChange}
            sx={{
              display: "flex",
            }}>
            <StatusSwitch status={row?.original?.active === "active" ? true : false} />
          </Box>
        ),
      },
      {
        accessorKey: "detail",
        header: "Detail",
        size: 90,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}>
            <Button
              sx={{ mr: 1, minWidth: "36px", padding: "2px 5px", fontSize: "12px" }}
              size="small"
              variant="contained"
              onClick={() => handleView(row?.original?.reg_id)}>
              View
            </Button>
          </Box>
        ),
      },
    ],
    [handleChange, handleView]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      showGlobalFilter: true,
    },
    paginationDisplayMode: "pages",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "primary",
      rowsPerPageOptions: [10, 25, 50, 100],
      shape: "rounded",
      variant: "outlined",
    },
    muiTableProps: {
      sx: {
        padding: 0.5,
      },
    },

    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#f5f5f5",
        fontSize: "13px",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: "13px",
      },
    },
    columnFilterDisplayMode: "popover",

    renderTopToolbarCustomActions: ({ table }) => (
      <Stack direction={"row"} spacing={1}>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          sx={{ color: "#eff2f7", paddingInline: "5px", minWidth: "60px", textTransform: "uppercase" }}
          onClick={handleExportData}>
          Excel
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          sx={{ color: "#eff2f7", paddingInline: "5px", minWidth: "50px", textTransform: "uppercase" }}
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}>
          pdf
        </Button>
      </Stack>
    ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <ConfirmationDialog value={"activeModal"} />
      <ReduxDialog value={"viewDetailModal"} modalTitle={"View Details"} showModalButton={false} modalSize={"md"}>
        <DecisionMakerDetail detail={decisionMakerDetail} />
      </ReduxDialog>
    </>
  );
};

export default memo(DecisionMakersTable);
