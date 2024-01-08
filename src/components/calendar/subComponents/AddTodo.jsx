import React, { useState, memo } from "react";
import { Checkbox, FormControlLabel, Grid, DialogContent, DialogActions } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import CustomMultilineTextField from "../../common/CustomMultilineTextField";
import SelectOption from "../../common/SelectOption";
import SecondaryButton from "../../common/SecondaryButton";
import PrimaryButton from "../../common/PrimaryButton";
import ReduxDialog from "../../common/ReduxDialog";
import { priorities, reminderOptions, timeOptions } from "../data";
import CustomDatePicker from "../../common/CustomDatePicker";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../../redux/action/modalSlice";

const AddTodo = () => {
  const [createAnother, setCreateAnother] = useState(false);
  const [formValues, setFormValues] = useState({});
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleCheckbox = (event) => {
    setCreateAnother(event.target.checked);
  };

  const handleCancel = () => {
    dispatch(closeModal("add-todo"));
  };

  const handleSave = () => {
    if (createAnother) {
      dispatch(openModal("add-todo"));
    } else {
      dispatch(closeModal("add-todo"));
    }
  };

  return (
    <ReduxDialog value="add-todo" modalTitle="Create New Todo" showModalButton={false} redirectPath="" modalSize="sm">
      <DialogContent dividers>
        <Grid container spacing={1}>
          {/* Title */}
          <Grid item xs={12}>
            <CustomLabelTextField label="" required={false} placeholder="Enter Title*" name="title" />
          </Grid>

          {/* Note */}
          <Grid item xs={12}>
            <CustomMultilineTextField label="" name="note" required={false} placeholder="Add Note" />
          </Grid>

          {/* Priority */}
          <Grid item xs={12} sm={6}>
            <SelectOption
              label="Priority"
              hideLabel={true}
              required={false}
              field="Priority"
              idKey="value"
              getOptionLabel={(option) => option.label}
              staticOptions={priorities?.map((priority) => ({ label: priority, value: priority }))}
              formValues={formValues}
              setFormValues={setFormValues}
              isDisabled={false}
            />
          </Grid>

          {/* Reminder */}
          <Grid item xs={12} sm={6}>
            <SelectOption
              label="Reminder"
              hideLabel={true}
              required={false}
              field="reminder"
              idKey="value"
              getOptionLabel={(option) => option.label}
              staticOptions={reminderOptions?.map((reminder) => ({ label: reminder, value: reminder }))}
              formValues={formValues}
              setFormValues={setFormValues}
              isDisabled={false}
            />
          </Grid>

          {/* Date */}
          <Grid item xs={12} sm={6}>
            <CustomDatePicker value={new Date()} />
          </Grid>

          {/* Time */}
          <Grid item xs={12} sm={6}>
            <SelectOption
              label="Time*"
              hideLabel={true}
              required={false}
              field="time"
              idKey="value"
              getOptionLabel={(option) => option.label}
              staticOptions={timeOptions?.map((time) => ({ label: time, value: time }))}
              formValues={formValues}
              setFormValues={setFormValues}
              isDisabled={false}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <FormControlLabel control={<Checkbox checked={createAnother} onChange={handleCheckbox} />} label="Create another todo" sx={{ color: theme.palette.secondary.main }} />
        <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
        <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
      </DialogActions>
    </ReduxDialog>
  );
};

export default memo(AddTodo);
