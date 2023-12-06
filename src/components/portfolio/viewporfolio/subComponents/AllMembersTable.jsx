import { useMemo, memo, useEffect, useState } from "react";
import { useMaterialReactTable, MaterialReactTable } from "material-react-table";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import { openCnfModal, closeCnfModal } from "../../../../redux/action/confirmationModalSlice";
import {
  getPortfolioTeamMemberName,
  updatePortfolioMemberStatus,
} from "../../../../api/modules/porfolioModule";
import { toast } from "react-toastify";
import CustomDialog from "../../../common/CustomDialog";
import AssignToSomeoneDailogContent from "./AssignToSomeoneDailogContent";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import {
  getPortfolioTeamMembersAsync,
  selectPorfolioTeamMembers,
} from "../../../../redux/action/portfolioSlice";

const AllMembersTable = ({ data }) => {
  const dispatch = useDispatch({ data });
  const storedPorfolioId = JSON.parse(localStorage.getItem("portfolioId"));
  const [memberName, setMemberName] = useState("");
  const [memberRegId, setMemberRegId] = useState(null);
  const [pimId, setPimId] = useState(null);
  const [workingStatus, setWorkingStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState({});
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const fetchTeamMembers = async () => {
  //   try {
  //     dispatch(getPortfolioTeamMembersAsync(storedPorfolioId));
  //   } catch (fetchError) {
  //     console.error("Error fetching portfolio team members:", fetchError);
  //   }
  // };

  // useEffect(() => {
  //   fetchTeamMembers();
  // }, [storedPorfolioId]);

  console.log(data);

  const handleReopen = (member, regId, primaryId, status) => {
    setMemberName(member);
    setPimId(primaryId);
    setWorkingStatus(status);
    setMemberRegId(regId);

    dispatch(
      openCnfModal({
        modalName: "changeStatus",
        title: "Are you sure?",
        description: `You want to ${status === "active" ? "inactive" : "active"} ${member}`,
      })
    );
  };

  const handleYes = async () => {
    const primaryId = pimId;
    const portfolioId = storedPorfolioId;
    const status = workingStatus === "active" ? "inactive" : "active";
    try {
      const response = await updatePortfolioMemberStatus(primaryId, portfolioId, status);
      if (response.statusChanged === false) {
        if (response.result) {
          // open dialog
          handleClickOpen();
          setResult(response.result);
        }
      } else {
        dispatch(getPortfolioTeamMembersAsync(storedPorfolioId));
        toast.success(`${response.message}`);
        dispatch(closeCnfModal({ modalName: "changeStatus" }));
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.error}`);
      console.error("Error in updating portfolio member status:", error);
    }
  };

  console.log("result", result);

  const columns = useMemo(
    () => [
      {
        accessorKey: "member_name",
        header: "Team Members",
        size: 400,
        enableEditing: false,
      },

      {
        accessorKey: "working_status",
        header: "Status",
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}>
            <Button
              sx={{
                mr: 1,
                color: row.original.working_status === "active" ? "black" : "white",
                backgroundColor:
                  row.original.working_status === "active"
                    ? theme.palette.primary.main // Use your active color code here
                    : theme.palette.secondary.main, // Use your inactive color code here
                "&:hover": {
                  backgroundColor:
                    row.original.working_status === "active"
                      ? theme.palette.primary.dark // Use your active color code for hover here
                      : theme.palette.secondary.dark, // Use your inactive color code for hover here
                },
              }}
              size="small"
              variant="contained"
              onClick={() =>
                handleReopen(
                  row.original.member_name,
                  row.original.reg_id,
                  row.original.pim_id,
                  row.original.working_status
                )
              }>
              {row.original.working_status}
            </Button>
          </Box>
        ),
      },
    ],
    []
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
      },
    },
  });
  return (
    <>
      <MaterialReactTable table={table} />
      <ConfirmationDialog value={"changeStatus"} handleYes={handleYes} />
      <CustomDialog
        handleClose={handleClose}
        open={open}
        modalTitle={`Inactive ${memberName}`}
        showModalButton={false}
        modalSize="sm">
        <AssignToSomeoneDailogContent
          result={result}
          memberName={memberName}
          memberRegId={memberRegId}
          pimId={pimId}
          portfolioId={storedPorfolioId}
          data={data}
          handleClose={handleClose}
        />
      </CustomDialog>
    </>
  );
};

export default memo(AllMembersTable);
