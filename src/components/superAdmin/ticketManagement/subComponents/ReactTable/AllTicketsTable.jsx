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
import { openCnfModal } from "../../../../../redux/action/confirmationModalSlice";
import { AttachFile, Chat, Delete, Visibility } from "@mui/icons-material";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import ReduxDialog from "../../../common/ReduxDialog";
import { closeModal, openModal } from "../../../../../redux/action/modalSlice";
import TicketDetail from "../TicketDetail";
import AttachedFileContent from "../AttachedFileContent";
import {
  getAllSupporter,
  getTicketDetail,
} from "../../../../../api/super-admin-modules/ticketManagementModule";
import SelectBox from "../SelectBox";
import Assignee from "../Assignee";
import ChatSection from "../chatSection/ChatSection";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const AllTicketsTable = ({ title, data }) => {
  const [allSupporter, setAllSupporter] = useState([]);
  const [ticketDetail, setTicketDetail] = useState({});
  const dispatch = useDispatch();

  // get supporter list
  const fetchAllSupporter = async () => {
    try {
      const response = await getAllSupporter();
      setAllSupporter(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllSupporter();
  }, []);

  const items = allSupporter?.map((supporter) => {
    const { reg_id, first_name, last_name } = supporter;
    const data = { value: reg_id, text: first_name + " " + last_name };
    return data;
  });

  // get ticket detail
  const fetchTicketDetail = async (id) => {
    try {
      const response = await getTicketDetail(id);
      setTicketDetail(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDetail = useCallback(
    (id) => {
      fetchTicketDetail(id);
      dispatch(openModal("ticketDetailModal"));
    },
    [dispatch]
  );

  const handleLink = useCallback(
    (id) => {
      fetchTicketDetail(id);
      dispatch(openModal("linkModal"));
    },
    [dispatch]
  );

  const handleChat = useCallback(
    (id) => {
      fetchTicketDetail(id);
      dispatch(openModal("chatModal"));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id) => {
      dispatch(
        openCnfModal({
          modalName: "deleteModal",
          title: "Are you sure?",
          description: `You want to delete ticket ${id}`,
        })
      );
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

    doc.save("All Tickets Decision168 Super-Admin.pdf");
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "ticket_id",
        header: "Ticket ID",
        size: 120,
        enableColumnFilter: false,
        enableEditing: true,
        Cell: ({ row }) => (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>T-{row?.original?.unique_id}</Typography>
            <IconButton
              color="secondary"
              onClick={() => handleDetail(row?.original?.ticket_id)}
            >
              <Visibility sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
        ),
      },
      {
        accessorKey: "subject",
        header: "Subject",
        size: 130,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "priority",
        header: "Priority",
        size: 70,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "opened_date",
        header: "Opened On",
        size: 80,
        enableEditing: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Chip
            label={`${row?.original?.opened_date}`.slice(0, 10)}
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
        accessorKey: "closed_date",
        header: "End Date",
        size: 70,
        enableColumnFilter: false,
        enableEditing: false,
        Cell: ({ row }) =>
          row?.original?.closed_date === null ? (
            ""
          ) : (
            <Chip
              label={`${row?.original?.closed_date}`.slice(0, 10)}
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
        accessorKey: "assignee",
        header: "Assigned to",
        size: 80,
        enableColumnFilter: false,
        enableEditing: false,
        Cell: ({ row }) =>
          row.original.status === "closed" ||
          row.original.status === "cancelled" ||
          row.original.status === "resolved" ? (
            <Assignee assignee={row.original.assignee} />
          ) : (
            <SelectBox
              TicketId={row?.original?.ticket_id}
              items={items}
              assignee={row?.original?.assignee}
            />
          ),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 80,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 140,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box>
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDelete(row?.original?.ticket_id)}
            >
              <Delete sx={{ fontSize: "20px" }} />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleLink(row?.original?.ticket_id)}
            >
              <AttachFile sx={{ fontSize: "20px" }} />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleChat(row?.original?.ticket_id)}
            >
              <Chat sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
        ),
      },
    ],
    [handleChat, handleDelete, handleDetail, handleLink, items]
  );

  const table = useMaterialReactTable({
    columns,
    data: data ? data : [],
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
          {title} Tickets
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
        value={"ticketDetailModal"}
        modalTitle={ticketDetail && `T-${ticketDetail?.unique_id}`}
        showModalButton={true}
        handleClick={() => dispatch(closeModal("ticketDetailModal"))}
        redirectPath={`/super-admin/ticket-overview/${ticketDetail.ticket_id}`}
        modalSize={"sm"}
      >
        <TicketDetail
          ticketDetail={ticketDetail && ticketDetail}
          items={items}
        />
      </ReduxDialog>
      <ReduxDialog
        value={"linkModal"}
        modalTitle={"Ticket ID"}
        showModalButton={false}
        modalSize={"sm"}
      >
        <AttachedFileContent ticketDetail={ticketDetail} />
      </ReduxDialog>
      <ReduxDialog
        value={"chatModal"}
        modalTitle={ticketDetail && `T-${ticketDetail?.unique_id}`}
        showModalButton={false}
        modalSize={"xs"}
      >
        <ChatSection ticket_id={ticketDetail.ticket_id} />
      </ReduxDialog>
    </>
  );
};

export default memo(AllTicketsTable);
