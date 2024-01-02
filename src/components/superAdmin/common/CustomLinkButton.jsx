/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function CustomLinkButton({ path, handleClick, icon, text }) {
  return (
    <Link to={path}>
      <Button variant="contained" size="small" onClick={handleClick}>
        {icon}
        {text}
      </Button>
    </Link>
  );
}
