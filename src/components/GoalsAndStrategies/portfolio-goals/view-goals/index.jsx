import {
  Box,
  Grid,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { memo, useState, useCallback, useEffect } from "react";
import { FormatListBulleted, GridView, Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import BasicBreadcrumbs from "../../../common/BasicBreadcrumbs";
import ListSection from "./subComponents/ListSection";
import CustomDialog from "../../../common/CustomDialog";
import ViewGoalsPopup from "../../subComponents/ViewGoalsPopup";
import GridSection from "./subComponents/GridSection";
import CustomFilter from "../../../common/CustomFilter";
import ReduxDialog from "../../../common/ReduxDialog";
import CreateGoal from "../create-goals";
import { openModal } from "../../../../redux/action/modalSlice";
import CustomSearchField from "../../../common/CustomSearchField";
import PendingPopup from "../../subComponents/PendingPopup";
import { getAllGoalList } from "../../../../api/modules/goalkpiModule";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../redux/action/userSlice";
import { SearchWithFuse } from "../../../../helpers/SearchWithFuse";

const ViewGoalsIndex = () => {
  //get user id
  const user = useSelector(selectUserDetails);
  const user_id = user?.reg_id;
  //get user id

  const storedPorfolioId = JSON.parse(localStorage.getItem("portfolioId"));

  //get goal lists
  const [AllGoalData, setAllGoalData] = useState([]);
  const fetchAllPortfolioGoalData = async () => {
    try {
      if (storedPorfolioId) {
        const response = await getAllGoalList(user_id, storedPorfolioId);
        setAllGoalData(response);
      } else {
        setAllGoalData([]);
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllPortfolioGoalData();
  }, [user_id, storedPorfolioId]);
  //get goal lists

  const [goalID, setGoalID] = useState("");
  const [goalName, setGoalName] = useState("");

  const dispatch = useDispatch();
  const [openGoal, setOpenGoal] = useState(false);
  const [openPendingGoal, setOpenPendingGoal] = useState(false);
  const [alignment, setAlignment] = useState("list");
  const [value, setValue] = useState("all");
  const handleChangeSwitch = useCallback((event, newAlignment) => {
    setAlignment(newAlignment);
  }, []);
  const handleChangeRadio = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  const handleGoalClose = () => {
    setOpenGoal(false);
  };
  const handleGoalOpen = (gid, gname) => {
    setGoalID(gid);
    setGoalName(gname);
    setOpenGoal(true);
  };
  const handlePendingGoalClose = () => {
    setOpenPendingGoal(false);
  };
  const handlePendingGoalOpen = (gid, gname) => {
    setGoalID(gid);
    setGoalName(gname);
    setOpenPendingGoal(true);
  };
  const filterOption = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "created-goals",
      label: "Created Goals",
    },
    {
      value: "accepted-goals",
      label: "Accepted Goals",
    },
    {
      value: "pending-requests",
      label: "Pending Requests",
    },
    {
      value: "more-info-requests",
      label: "More Info Requests",
    },
  ];
  const align = alignment === "list";
  const [query, setQuery] = useState("");

  const cardData = {
    all: [
      ...(AllGoalData?.createData || []),
      ...(AllGoalData?.acceptedData || []),
      ...(AllGoalData?.pendingRequest || []),
      ...(AllGoalData?.moreInfoRequest || []),
    ],
    "created-goals": [...(AllGoalData?.createData || [])],
    "accepted-goals": [...(AllGoalData?.acceptedData || [])],
    "pending-requests": [...(AllGoalData?.pendingRequest || [])],
    "more-info-requests": [...(AllGoalData?.moreInfoRequest || [])],
  };
  const cardsToRender = cardData[value] || [];
  const newResults = SearchWithFuse(["gname"], query, cardsToRender || []);

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={8} sm={4} md={4} lg={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "row",
            }}
          >
            <BasicBreadcrumbs currentPage="GOALS" />
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChangeSwitch}
              aria-label="Platform"
              sx={{ mx: 1 }}
            >
              <ToggleButton value="list">
                <FormatListBulleted sx={{ fontSize: 14 }} />
              </ToggleButton>
              <ToggleButton value="grid">
                <GridView sx={{ fontSize: 14 }} />
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="contained"
              startIcon={<Add fontSize="small" />}
              size="small"
              sx={{ fontSize: 12 }}
              onClick={() => dispatch(openModal("create-goals-kpis"))}
            >
              Create New
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sm={align ? 8 : 5}
          md={align ? 8 : 5}
          lg={align ? 8 : 5}
          alignSelf={"center"}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              flexDirection: "row",
            }}
          >
            <CustomFilter
              value={value}
              handleChange={handleChangeRadio}
              filterOption={filterOption}
            />
          </Box>
        </Grid>
        {!align && (
          <Grid item xs={8} sm={3} md={3} lg={3} alignSelf={"center"}>
            <CustomSearchField query={query} setQuery={setQuery} />
          </Grid>
        )}

        <Grid item xs={12}>
          {align ? (
            <ListSection
              handleGoalOpen={handleGoalOpen}
              handlePendingGoalOpen={handlePendingGoalOpen}
              value={value}
              AllGoalData={AllGoalData}
            />
          ) : (
            <GridSection
              handleGoalOpen={handleGoalOpen}
              handlePendingGoalOpen={handlePendingGoalOpen}
              filterData={newResults}
            />
          )}
        </Grid>
      </Grid>

      <ReduxDialog
        value="create-goals-kpis"
        modalTitle="Create Goal and KPIs"
        showModalButton={false}
        modalSize="md"
      >
        <CreateGoal fetchAllData={fetchAllPortfolioGoalData} />
      </ReduxDialog>

      <CustomDialog
        handleClose={handleGoalClose}
        open={openGoal}
        modalTitle={goalName}
        redirectPath={`/goal-overview/${goalID}`}
        showModalButton={true}
        modalSize="md"
      >
        <ViewGoalsPopup goalID={goalID} id={user_id} />
      </CustomDialog>
      <CustomDialog
        handleClose={handlePendingGoalClose}
        open={openPendingGoal}
        modalTitle={goalName}
        redirectPath={`/goal-overview-request/${goalID}`}
        showModalButton={true}
        modalSize="md"
      >
        <PendingPopup
          handleClose={handlePendingGoalClose}
          fetchAllData={fetchAllPortfolioGoalData}
          goalID={goalID}
          id={user_id}
        />
      </CustomDialog>
    </Box>
  );
};

export default memo(ViewGoalsIndex);
