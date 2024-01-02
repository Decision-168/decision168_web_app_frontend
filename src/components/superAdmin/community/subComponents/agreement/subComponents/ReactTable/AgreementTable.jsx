/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useMemo, memo, useCallback, useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { openCnfModal } from "../../../../../../../redux/action/confirmationModalSlice";
import { openModal } from "../../../../../../../redux/action/modalSlice";
import ConfirmationDialog from "../../../../../common/ConfirmationDialog";
import ReduxDialog from "../../../../../common/ReduxDialog";
import { Delete, Edit } from "@mui/icons-material";
import AddEditAgreementForm from "../AddEditAgreementForm";
import { getDecisionMakerAgreement } from "../../../../../../../api/super-admin-modules/communityModule";
import StatusSwitch from "../../../../../common/StatusSwitch";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const AgreementTable = () => {
  const dispatch = useDispatch();

  // get decision makers
  const [allDecisionMakerAgreement, setAllDecisionMakerAgreement] = useState(
    []
  );

  const fetchDecisionMakerAgreement = async () => {
    try {
      const response = await getDecisionMakerAgreement();
      setAllDecisionMakerAgreement(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDecisionMakerAgreement();
  }, []);

  const handleDelete = useCallback(() => {
    dispatch(
      openCnfModal({
        modalName: "deleteModal",
        title: "Are you sure?",
        description: `You want to delete this category`,
      })
    );
  }, [dispatch]);

  const handleExportRows = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("Agreement Decision168 Super-Admin.pdf");
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const data = useMemo(
    () =>
      allDecisionMakerAgreement &&
      allDecisionMakerAgreement.map((agreement, ind) => ({
        sr_no: ind + 1,
        title: agreement?.title,
        description: agreement?.description,
        created_on: `${agreement?.date}`.slice(0, 10),
        status: agreement?.status,
        action: "",
        agree_id: agreement?.agree_id,
      })),
    [allDecisionMakerAgreement]
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
        accessorKey: "title",
        header: "Title",
        size: 70,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 250,
        enableEditing: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box sx={{ lineHeight: "32px" }}>{row.original.description}</Box>
        ),
      },
      {
        accessorKey: "created_on",
        header: "Created On",
        size: 80,
        enableEditing: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Chip
            label={row.original.created_on}
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
              background: "#556ee62e",
              color: "#556ee6",
            }}
          />
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 80,
        enableColumnFilter: false,
        enableEditing: false,
        Cell: ({ row }) => (
          <StatusSwitch status={row?.original?.status === 1 ? true : false} />
        ),
      },
      {
        accessorKey: "Action",
        header: "Action",
        size: 90,
        enableColumnFilter: false,
        Cell: () => (
          <>
            <IconButton color="error" onClick={handleDelete}>
              <Delete />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => dispatch(openModal("editModal"))}
            >
              <Edit />
            </IconButton>
          </>
        ),
      },
    ],
    [dispatch, handleDelete]
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
        verticalAlign: "baseline",
      },
    },
    columnFilterDisplayMode: "popover",

    renderTopToolbarCustomActions: ({ table }) => (
      <Stack direction={"column"} spacing={1}>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "16px",
            textAlign: "left",
          }}
        >
          Agreement
        </Typography>
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
      </Stack>
    ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <ConfirmationDialog value={"deleteModal"} />
      <ReduxDialog
        value={"editModal"}
        modalTitle={"Edit Category"}
        showModalButton={false}
        modalSize={"md"}
      >
        <AddEditAgreementForm editMode={true} />
      </ReduxDialog>
    </>
  );
};

export default memo(AgreementTable);
