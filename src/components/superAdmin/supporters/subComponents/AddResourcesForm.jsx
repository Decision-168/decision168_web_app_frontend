import { Box, Button, Grid } from "@mui/material";
import CustomSelect from "../../common/CustomSelect";
import { useState } from "react";
import EmailInput from "./EmailInput";
import { closeModal } from "../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";

const items = [
  { value: "shahanawaz pathan", text: "Shahanawaz Pathan", selected: false },
  { value: "test", text: "Test", selected: false },
];

const AddResourcesForm = () => {
  const [value, setValue] = useState("");
  const [emails, setEmails] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleAddEmail = () => {
    setShow(true);
    setEmails([...emails, ""]);
  };

  const handleRemoveEmail = (index) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <Box component="form" py={2} borderTop="1px solid #dadada">
        <Grid item xs={12} px={2} pb={2} display={"flex"} flexDirection={"column"} gap={2} alignItems={"flex-start"}>
          <Grid item display="flex" justifyContent="space-between" gap={2} alignItems="center" textAlign="left">
            <Grid item xs={6} sx={{ minWidth: "230px" }}>
              <CustomSelect items={items} label="" labelColor="" required={false} handleChange={handleChange} value={value} />
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" size="small" onClick={handleAddEmail}>
                Invite through Email Id
              </Button>
            </Grid>
          </Grid>
          <EmailInput
            show={show}
            emails={emails}
            handleAddEmail={handleAddEmail}
            handleRemoveEmail={handleRemoveEmail}
            handleEmailChange={handleEmailChange}
          />
        </Grid>

        <Box pt={2} pr={2} textAlign="right" borderTop="1px solid #dadada">
          <Button
            size="small"
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => dispatch(closeModal())}
            sx={{ mr: 1, color: "#fff" }}>
            Close
          </Button>
          <Button type="submit" variant="contained" size="small">
            Invite
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddResourcesForm;
