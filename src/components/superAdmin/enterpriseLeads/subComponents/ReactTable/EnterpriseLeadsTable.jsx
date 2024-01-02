/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useMemo, memo, useCallback, useEffect, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { openCnfModal } from "../../../../redux/action/confirmationModalSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";
import { openModal } from "../../../../redux/action/modalSlice";
import ReduxDialog from "../../../common/ReduxDialog";
import CreateEditCustomPackageForm from "../CreateEditCustomPackageForm";
import CompanyPackageDetail from "../CompanyPackageDetail";
import { getContactedCompanyAndItsPackageDetail, getContactedSalesList } from "./../../../../api/modules/eterpriseLeadsModule";
import { FileCopyOutlined } from "@mui/icons-material";
import ChangeLabelsForm from "../../../menuPricing/subComponents/ChangeLabelsForm";

const RegisteredUsersTable = () => {
  const dispatch = useDispatch();

  // get contacted sales list
  const [allContactedSales, setAllContactedSales] = useState([]);
  const [contactedCompanyDetail, setContactedCompanyDetail] = useState({});

  const fetchAllContactedSales = async () => {
    try {
      const response = await getContactedSalesList();
      setAllContactedSales(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllContactedSales();
  }, []);

  const fetchContactedCompnyDetail = async (id) => {
    try {
      const response = await getContactedCompanyAndItsPackageDetail(id);
      setContactedCompanyDetail(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = useCallback(
    (id) => {
      dispatch(openModal("viewDetailModal"));

      fetchContactedCompnyDetail(id);
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (id) => {
      dispatch(openModal("editPackageModal"));

      // edit logic here
      console.log(id);
    },
    [dispatch]
  );

  const handleChangeLabels = useCallback(
    (id) => {
      dispatch(openModal("changeLabels"));

      // change logic here
      console.log(id);
    },
    [dispatch]
  );

  const handledelete = useCallback(
    (id) => {
      dispatch(
        openCnfModal({
          modalName: "deleteTask",
          title: "Are you sure?",
          description: `You want to delete the contacted company ${id}`,
        })
      );
    },
    [dispatch]
  );

  const handleActive = useCallback(() => {
    dispatch(
      openCnfModal({
        modalName: "activeModal",
        title: "Are you sure?",
        description: `You want to Inactive the package`,
      })
    );
  }, [dispatch]);

  const data = useMemo(
    () =>
      allContactedSales.map((contactedCompany, ind) => ({
        sr_no: ind + 1,
        name: contactedCompany.fname,
        company_username: "",
        email: contactedCompany.email,
        phone: contactedCompany.phone,
        users: contactedCompany.total_users,
        status: contactedCompany.response_status,
        contacted_date: `${contactedCompany.contacted_date}`.slice(0, 10),
        action: "",
        cid: contactedCompany.cid,
      })),
    [allContactedSales]
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
        size: 100,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "company_username",
        header: "Company Username",
        size: 100,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 100,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 80,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "users",
        header: "Users",
        size: 70,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 70,
        enableEditing: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "contacted_date",
        header: "Contacted Date",
        size: 80,
        enableColumnFilter: false,
        enableEditing: false,
      },
      {
        accessorKey: "action",
        header: "Action",
        minSize: 180,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
            }}>
            {row?.original?.status === "pending" ? (
              <Stack direction={"column"} spacing={1}>
                <Button
                  sx={{ minWidth: "36px", padding: "2px 5px", fontSize: "12px" }}
                  size="small"
                  variant="contained"
                  onClick={() => dispatch(openModal("createPackageModal"))}>
                  Create custom package
                </Button>
                <Button
                  sx={{ maxWidth: "30px", padding: "2px 5px", fontSize: "12px", color: "white" }}
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => handledelete(row?.original?.cid)}>
                  Delete
                </Button>
              </Stack>
            ) : (
              <Stack direction={"row"} spacing={1}>
                <Button
                  sx={{ minWidth: "36px", padding: "2px 5px", fontSize: "12px" }}
                  size="small"
                  variant="contained"
                  onClick={() => handleView(row?.original?.cid)}>
                  View
                </Button>
                <Button
                  sx={{ minWidth: "36px", padding: "2px 5px", fontSize: "12px" }}
                  size="small"
                  variant="contained"
                  onClick={() => handleEdit(row?.original?.cid)}>
                  Edit
                </Button>
                <Button
                  sx={{ minWidth: "36px", padding: "2px 5px", fontSize: "12px" }}
                  size="small"
                  variant="contained"
                  onClick={() => handleActive(row?.original?.cid)}>
                  Active
                </Button>
              </Stack>
            )}
          </Box>
        ),
      },
    ],
    [dispatch, handleActive, handleEdit, handleView, handledelete]
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
      <ReduxDialog value={"createPackageModal"} modalTitle={"Add Package"} showModalButton={false} modalSize={"sm"}>
        <CreateEditCustomPackageForm editMode={false} />
      </ReduxDialog>
      <ReduxDialog
        value={"editPackageModal"}
        modalTitle={"Edit Package"}
        showModalButton={true}
        handleClick={handleChangeLabels}
        buttonIcon={<FileCopyOutlined fontSize="14px" sx={{ mr: "4px" }} />}
        buttonText="Change Labels"
        modalSize={"sm"}>
        <CreateEditCustomPackageForm editMode={true} />
      </ReduxDialog>
      <ReduxDialog value={"changeLabels"} modalTitle={"Change Labels"} showModalButton={false} modalSize={"sm"}>
        <ChangeLabelsForm />
      </ReduxDialog>
      <ReduxDialog value={"viewDetailModal"} modalTitle={"Company & it's Package"} showModalButton={false} modalSize={"xs"}>
        <CompanyPackageDetail contactedCompanyDetail={contactedCompanyDetail} />
      </ReduxDialog>
      <ConfirmationDialog value={"deleteTask"} />
      <ConfirmationDialog value={"activeModal"} />
    </>
  );
};

export default memo(RegisteredUsersTable);
