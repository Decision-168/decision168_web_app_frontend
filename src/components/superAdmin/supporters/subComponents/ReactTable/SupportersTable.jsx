/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useMemo, memo, useCallback, useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Chip, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../../../../../redux/action/modalSlice";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { mkConfig, generateCsv, download } from "export-to-csv";
import ReduxDialog from "../../../common/ReduxDialog";
import { openCnfModal } from "../../../../../redux/action/confirmationModalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import {
  getAllSupporters,
  getSupporterDetail,
} from "./../../../../../api/super-admin-modules/supportersModule";
import StatusSwitch from "./../../../common/StatusSwitch";
import SupporterDetail from "../SupporterDetail";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const SupportersTable = () => {
  const dispatch = useDispatch();

  // get all supporters
  const [allSupporters, setAllSupporters] = useState([]);
  const [supporterDetail, setSupporterDetail] = useState({});

  const fetchAllSupporters = async () => {
    try {
      const response = await getAllSupporters();
      setAllSupporters(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllSupporters();
  }, []);

  // get supporter detail
  const fetchSupporterDetail = async (id) => {
    try {
      const response = await getSupporterDetail(id);
      setSupporterDetail(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = useCallback(
    (id) => {
      dispatch(
        openCnfModal({
          modalName: "activeModal",
          title: "Are you sure?",
          description: `You want to change the Status of ${id}`,
        })
      );
    },
    [dispatch]
  );

  const handleView = useCallback(
    (id) => {
      dispatch(openModal("viewDetailModal"));

      fetchSupporterDetail(id);
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
      allSupporters &&
      allSupporters.map((supporter, ind) => ({
        sr_no: ind + 1,
        name: `${supporter?.first_name} ${supporter?.middle_name} ${supporter?.last_name}`,
        email: supporter?.email_address,
        invitation_status: "",
        supporter_mail: supporter?.supporter_mail,
        supporter_approve: supporter?.supporter_approve,
        reg_date: `${supporter?.reg_date}`.slice(0, 19).replace("T", " "),
        last_login: `${supporter?.last_login}`.slice(0, 19).replace("T", " "),
        active: supporter?.supporter_status,
        detail: "",
        reg_id: supporter?.reg_id,
      })),
    [allSupporters]
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
        size: 90,
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
        accessorKey: "invitation_status",
        header: "Invitation Status",
        size: 100,
        enableEditing: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}
          >
            {row?.original?.supporter_mail === 1 &&
            row?.original?.supporter_approve === "" ? (
              <Chip
                label="Invited"
                color="primary"
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
                }}
              />
            ) : row?.original?.supporter_mail === 1 &&
              row?.original?.supporter_approve === "no" ? (
              <Chip
                label="Denied"
                color="error"
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
                }}
              />
            ) : row?.original?.supporter_mail === 1 &&
              row?.original?.supporter_approve === "yes" ? (
              <Chip
                label="Approved"
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
            ) : null}
          </Box>
        ),
      },
      {
        accessorKey: "reg_date",
        header: "Reg. Date",
        size: 100,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "last_login",
        header: "Last Login",
        size: 100,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "active",
        header: "Active",
        size: 80,
        enableColumnFilter: false,
        enableEditing: false,
        Cell: ({ row }) => (
          <Box
            onClick={() => handleChange(row?.original?.reg_id)}
            sx={{
              display: "flex",
            }}
          >
            <StatusSwitch
              status={row?.original?.active === "active" ? true : false}
            />
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
            }}
          >
            <Button
              sx={{
                mr: 1,
                minWidth: "36px",
                padding: "2px 5px",
                fontSize: "12px",
              }}
              size="small"
              variant="contained"
              onClick={() => handleView(row?.original?.reg_id)}
            >
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
          sx={{
            color: "#eff2f7",
            paddingInline: "5px",
            minWidth: "60px",
            textTransform: "uppercase",
          }}
          onClick={handleExportData}
        >
          Excel
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          sx={{
            color: "#eff2f7",
            paddingInline: "5px",
            minWidth: "50px",
            textTransform: "uppercase",
          }}
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
        >
          pdf
        </Button>
      </Stack>
    ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <ConfirmationDialog value={"activeModal"} />
      <ReduxDialog
        value={"viewDetailModal"}
        modalTitle={
          supporterDetail &&
          `${supporterDetail?.supporterDetailResult?.first_name} ${supporterDetail?.supporterDetailResult?.middle_name} ${supporterDetail?.supporterDetailResult?.last_name}`
        }
        showModalButton={false}
        modalSize={"md"}
      >
        <SupporterDetail detail={supporterDetail ? supporterDetail : {}} />
      </ReduxDialog>
    </>
  );
};

export default memo(SupportersTable);
