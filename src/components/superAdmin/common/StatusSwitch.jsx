/* eslint-disable react/prop-types */
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { useState } from "react";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 70,
  height: 40,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      transform: "translateX(30px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#34c38f",
      },
    },
    "&:not(.Mui-checked)": {
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#f46a6a ",
      },
    },
  },
  "& .MuiSwitch-track": {
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.success.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 15,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.success.main)
      )}" d="M19,13H5V11H19V13ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" /></svg>')`,
      right: 15,
    },
  },
  "& .MuiSwitch-thumb": {
    color: "#fff",
    borderRadius: "5px",
    marginTop: "1px",
  },
}));

export default function StatusSwitch({ status }) {
  const [checked, setChecked] = useState(status);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  return <MaterialUISwitch checked={checked} onChange={handleChange} sx={{ ml: "-6px" }} />;
}
