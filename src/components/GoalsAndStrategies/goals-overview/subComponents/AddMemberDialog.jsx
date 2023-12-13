import React, { memo, useEffect, useState } from "react";
import CustomAutocomplete from "../../../common/CustomAutocomplete";
import { useForm } from "react-hook-form";
import {
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
  getAccepted_PortTM_GoalList,
} from "../../../../api/modules/goalkpiModule";

const AddMemberDialog = ({ id, type }) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [assignee, setAssignee] = useState([]);

  if (type === "goal") {
    useEffect(() => {
      const fetchAllHistoryData = async () => {
        try {
          const response = await getAccepted_PortTM_GoalList("2",id); //portfolio_id
          if (response) {
            setAssignee(response);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchAllHistoryData();
    }, []);
  }

  // const assignee = [
  //   { label: "Afrin Syed", member_reg_id: 1, sent_to: "abc" },
  //   { label: "Amin Syed" , member_reg_id: 2, sent_to: "pqr" },
  //   { label: "Don Mehmood", member_reg_id: 3, sent_to: "xyz" },
  // ];

console.log(assignee);

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
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(inputFields));
  };
  return (
    <>
      <DialogContent dividers>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <CustomAutocomplete
                label="Invite More Member"
                placeholder={"Add Team Member"}
                options={assignee}
              />
            </Grid>

            <Grid item xs={4} alignSelf={"end"}>
              <Button onClick={handleAddClick} size="small" variant="contained">
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
        <Button variant="contained" size="small">
          Add
        </Button>
      </DialogActions>
    </>
  );
};

export default memo(AddMemberDialog);
