import React, { memo, useEffect, useState } from "react";
import CustomAutocomplete from "../../../common/CustomAutocomplete";
import { useForm } from "react-hook-form";
import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { RemoveCircleOutlineRounded } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { closeModal } from "../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import {
  AddGoalMember,
  getAccepted_PortTM_GoalList,
} from "../../../../api/modules/goalkpiModule";
import { toast } from "react-toastify";

const AddMemberDialog = ({ id, type, refreshData }) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [memberData, setmemberData] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [memberInputValue, setMemberInputValue] = useState("");
  const [availableMembers, setAvailableMembers] = useState([]);

  const [formValues, setFormValues] = useState({
    gid: id,
    gcreated_by: "1", //user_id
    team_member: [],
    imemail: [],
  });

  if (type === "goal") {
    useEffect(() => {
      const fetchAllHistoryData = async () => {
        try {
          const response = await getAccepted_PortTM_GoalList("2", id); //portfolio_id
          if (response) {
            setmemberData(response);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchAllHistoryData();
    }, []);
  }

  useEffect(() => {
    setAvailableMembers(memberData);
  }, [memberData]);

  const [inputFields, setInputFields] = useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleInputChange = (event, index) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleAddClick = () => {
    setInputFields([...inputFields, { email: "" }]);
  };

  const handleRemoveClick = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formValues.team_member.length > 0 || inputFields.length > 0) {
      const resultArray = inputFields.map((item) => item.email);
      const data = { ...formValues, imemail: resultArray };
      setLoading(true);
      try {
        const response = await AddGoalMember(data);
        refreshData();
        toast.success(`${response.message}`);
        dispatch(closeModal("add-team-members"));
      } catch (error) {
        // Handling error
        toast.error(`${error.response?.error}`);
        console.error("Error updating:", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Cannot send empty data");
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Autocomplete
                  multiple
                  required
                  value={selectedMembers}
                  fullWidth
                  options={availableMembers}
                  getOptionLabel={(option) => option.name}
                  getOptionSelected={(option, value) => option.id === value.id}
                  onChange={(event, newMembers) => {
                    setSelectedMembers(newMembers);
                    const members = newMembers?.map((member) => member.id);
                    setAvailableMembers(
                      memberData.filter(
                        (member) => !newMembers.includes(member)
                      )
                    );
                    setFormValues({
                      ...formValues,
                      team_member: members,
                    });
                  }}
                  inputValue={memberInputValue}
                  onInputChange={(event, newMemberInputValue) => {
                    setMemberInputValue(newMemberInputValue);
                  }}
                  renderInput={(params) => {
                    return <TextField {...params} />;
                  }}
                />
              </Grid>

              <Grid item xs={4} alignSelf={"end"}>
                <Button
                  onClick={handleAddClick}
                  size="small"
                  variant="contained"
                >
                  Invite More Member
                </Button>
              </Grid>

              <Grid item xs={12}>
                {inputFields.map((inputField, index) => (
                  <Grid container key={index} spacing={2}>
                    <Grid item xs={8}>
                      <TextField
                        fullWidth
                        name="email"
                        onChange={(event) => handleInputChange(event, index)}
                        placeholder="Enter email to invite portfolio member..."
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton onClick={() => handleRemoveClick(index)}>
                          <RemoveCircleOutlineRounded />
                        </IconButton>
                      </Stack>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            onClick={() => dispatch(closeModal())}
            sx={{
              mr: 1,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.light,
              "&:hover": { backgroundColor: theme.palette.secondary.dark },
            }}
          >
            Close
          </Button>
          <Button type="submit" variant="contained" size="small">
            Add
          </Button>
        </DialogActions>
      </Box>
    </>
  );
};

export default memo(AddMemberDialog);
