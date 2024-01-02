/* eslint-disable react/prop-types */
import { Box, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomLabelTextField from "../../common/CustomLabelTextField";
import { closeModal } from "../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import { globalValidations } from "../../../../utils/GlobalValidation";

export default function ChangeLabelsForm() {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      px={2}
      borderTop="1px solid #dadada"
    >
      <Grid item xs={12} pt={2} display="flex" gap={3} alignItems="center">
        <CustomLabelTextField
          label="Portfolio Label"
          labelColor=""
          name="PortfolioLabel"
          value="portfolio"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
        <CustomLabelTextField
          label="Goals Label"
          labelColor=""
          name="GoalsLabel"
          value="goals"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
      </Grid>
      <Grid item xs={12} pt={1} display="flex" gap={3}>
        <CustomLabelTextField
          label="KPI Label"
          labelColor=""
          name="KPILabel"
          value="strategies per goal"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
        <CustomLabelTextField
          label="KPI Projects Label"
          labelColor=""
          name="KPIProjectsLabel"
          value="projects per strategy"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
      </Grid>

      <Grid item xs={12} pt="12px" display="flex" gap={3}>
        <CustomLabelTextField
          label="Project Label"
          labelColor=""
          name="ProjectLabel"
          value="active projects"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
        <CustomLabelTextField
          label="Team Member Label"
          labelColor=""
          name="TeamMemberLabel"
          value="team members"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
      </Grid>
      <Grid item xs={12} pt="12px" display="flex" gap={3}>
        <CustomLabelTextField
          label="Task Label"
          labelColor=""
          name="TaskLabel"
          value="task"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
        <CustomLabelTextField
          label="Storage Label"
          labelColor=""
          name="StorageLabel"
          value="storage"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
      </Grid>
      <Grid item xs={12} pt="12px" display="flex" gap={3}>
        <CustomLabelTextField
          label="Accountability Tracking Label"
          labelColor=""
          name="AccountabilityTrackingLabel"
          value="accountability tracking"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
        <CustomLabelTextField
          label="Document Collaboration Label"
          labelColor=""
          name="DocumentCollaborationLabel"
          value="document collaboration"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
      </Grid>
      <Grid item xs={12} pt="12px" display="flex" gap={3}>
        <CustomLabelTextField
          label="Kanban Boards Label"
          labelColor=""
          name="KanbanBoardsLabel"
          value="kanban boards"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
        <CustomLabelTextField
          label="Motivator Label"
          labelColor=""
          name="MotivatorLabel"
          value="motivator"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
      </Grid>
      <Grid item xs={12} pt="12px" display="flex" gap={3}>
        <CustomLabelTextField
          label="Internal Chat Label"
          labelColor=""
          name="InternalChatLabel"
          value="internal chat"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
        <CustomLabelTextField
          label="Content Planner Label"
          labelColor=""
          name="ContentPlannerLabel"
          value="posts / mo. content planner"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
      </Grid>
      <Grid item xs={12} pt="12px" display="flex" gap={3}>
        <CustomLabelTextField
          label="Data Recovery Label"
          labelColor=""
          name="DataRecoveryLabel"
          value="data recovery"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
        <CustomLabelTextField
          label="Support Label"
          labelColor=""
          name="SupportLabel"
          value="24/7 email support"
          required={true}
          register={register}
          errors={errors}
          validation={globalValidations.labelName}
        />
      </Grid>

      <Box textAlign="right" padding="16px 0 20px 0">
        <Button
          size="small"
          type="button"
          variant="contained"
          color="secondary"
          onClick={() => dispatch(closeModal())}
          sx={{ mr: 1, color: "#fff" }}
        >
          Close
        </Button>
        <Button size="small" type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
}
