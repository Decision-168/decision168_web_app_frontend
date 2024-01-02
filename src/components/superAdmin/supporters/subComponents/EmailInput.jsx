/* eslint-disable react/prop-types */
import { Add, Remove } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";

const EmailInput = ({ show, emails, handleAddEmail, handleRemoveEmail, handleEmailChange }) => {
  return (
    show && (
      <>
        {emails.map((email, index) => (
          <Grid item xs={12} key={index} display="flex" gap={2} alignItems="center">
            <TextField
              type="email"
              placeholder="Enter Email ID..."
              variant="outlined"
              value={email}
              sx={{ minWidth: "230px" }}
              onChange={(e) => handleEmailChange(index, e.target.value)}
            />
            <Grid>
              <Button
                variant="contained"
                onClick={handleAddEmail}
                sx={{ marginInline: 1, minWidth: "35px", minHeight: "33px", borderRadius: "20px", p: 0 }}>
                <Add />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ color: "#fff", minWidth: "35px", minHeight: "35px", borderRadius: "20px", p: 0 }}
                onClick={() => handleRemoveEmail(index)}>
                <Remove />
              </Button>
            </Grid>
          </Grid>
        ))}
      </>
    )
  );
};

export default EmailInput;
