import React from "react";
import HorizontalLinearStepper from "./subComponents/Stepper";
import ReduxDialog from "../../common/ReduxDialog";

const CreateGoal = () => {
  return (
    <ReduxDialog
      value="create-goals-kpis"
      modalTitle="Create Goal and KPIs"
      showModalButton={false}
      modalSize="md"
    >
      <HorizontalLinearStepper />
    </ReduxDialog>
  );
};

export default CreateGoal;
