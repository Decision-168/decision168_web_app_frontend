import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Grid, InputLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function FilterSelectedOptionsGoal({
  label,
  labelColor,
  required,
  placeholder,
  items,
  onChange
}) {
  const theme = useTheme();

  const memberData = [
    { id: 1, name: "Afrin Syed" },
    { id: 2, name: "Amin Syed" },
    { id: 3, name: "Don Mehmood" },
  ];

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [memberInputValue, setMemberInputValue] = useState("");
  const [availableMembers, setAvailableMembers] = useState(memberData);
  const members = selectedMembers?.map((member) => member.id);

  console.log(members);


  return (
    <Grid item xs={12}>
      <Stack spacing={4.5} direction="row" alignItems="center" >
         <InputLabel sx={{ fontSize: "14px" }}>
            Select Members
         </InputLabel>
         <Autocomplete
              multiple
              value={selectedMembers}
              fullWidth
              options={availableMembers}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, value) => option.id === value.id}
              onChange={(event, newMembers) => {
                setSelectedMembers(newMembers);
                setAvailableMembers(memberData.filter((member) => !newMembers.includes(member)));
              }}
              inputValue={memberInputValue}
              onInputChange={(event, newMemberInputValue) => {
                setMemberInputValue(newMemberInputValue);
              }}
              renderInput={(params) => {
                return <TextField  {...params} />;
              }}
          />
      </Stack>
   </Grid>
  );
}
