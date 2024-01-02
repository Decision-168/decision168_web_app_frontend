/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useMemo, memo, useCallback, useState, useEffect } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import ReduxDialog from "../../../common/ReduxDialog";
import { openModal } from "../../../../redux/action/modalSlice";
import AddQuoteForm from "../AddQuoteForm";
import { getAllQuotes } from "./../../../../api/modules/quotesModule";

const QuotesTable = () => {
  const dispatch = useDispatch();

  // get quotes list
  const [quotesList, setQuotesList] = useState([]);

  const fetchAllQuotes = async () => {
    try {
      const response = await getAllQuotes();
      setQuotesList(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllQuotes();
  }, []);

  const handleDelete = useCallback(
    (srno) => {
      console.log(srno);
      dispatch(
        openCnfModal({
          modalName: "deleteTask",
          title: "Are you sure?",
          description: `You want to Delete the quote ${srno}`,
        })
      );
    },
    [dispatch]
  );

  const data = useMemo(
    () =>
      quotesList.map((quote, ind) => ({
        sr_no: ind + 1,
        created_by: quote.qcreated_by,
        status: quote.status,
        author: quote.writer,
        quote: quote.quote,
        request: "",
        edit: "",
        delete: "",
      })),
    [quotesList]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "sr_no",
        header: "Sr. No",
        size: 70,
        enableColumnFilter: false,
      },
      {
        accessorKey: "created_by",
        header: "Created By",
        size: 100,
        enableEditing: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 90,
        enableEditing: false,
      },
      {
        accessorKey: "author",
        header: "Author",
        size: 100,
        enableEditing: false,
      },
      {
        accessorKey: "quote",
        header: "Quotes",
        size: 450,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "request",
        header: "Request",
        size: 90,
        enableColumnFilter: false,
      },
      {
        accessorKey: "edit",
        header: "Edit",
        size: 90,
        enableColumnFilter: false,
        Cell: () => (
          <Box
            sx={{
              display: "flex",
            }}>
            <Button
              sx={{ mr: 1, minWidth: "36px", padding: "2px 5px", fontSize: "12px" }}
              size="small"
              variant="contained"
              onClick={() => dispatch(openModal("editQuote"))}>
              Edit
            </Button>
          </Box>
        ),
      },
      {
        accessorKey: "delete",
        header: "Delete",
        size: 90,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}>
            <Button
              sx={{ mr: 1, color: "white", minWidth: "36px", padding: "2px 5px", fontSize: "12px" }}
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(row.original.sr_no)}>
              Delete
            </Button>
          </Box>
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
      },
    },
    columnFilterDisplayMode: "popover",
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <ConfirmationDialog value={"deleteTask"} />
      <ReduxDialog value={"editQuote"} modalTitle={"Edit a Quote"} showModalButton={false} modalSize={"xs"}>
        <AddQuoteForm editMode={true} />
      </ReduxDialog>
    </>
  );
};

export default memo(QuotesTable);
